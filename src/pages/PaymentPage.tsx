import {
  Box,
  Button,
  MenuItem,
  Select,
  SelectChangeEvent,
  Stack,
  TextField,
  useTheme,
} from '@mui/material';
import { useTranslation } from 'react-i18next';
import { paymentOptions, user } from '../database/mockData';
import { useSnapshot } from 'valtio';
import { paymentMethodStore } from '../store/paymentMethod';
import { FinancedPaymentOption, PaymentOption, UserData } from '../types';
import React, { useEffect, useState } from 'react';
import useLocalStorage from '../hooks/useLocalStorage';
import { formatMoney } from '../utils/format';
import { useNavigate } from 'react-router-dom';
import { PaymentInfo } from '../components/PaymentInfo';
import {
  getFinancedInstallments,
  validateFields,
} from '../utils/paymentMethod';
import InputMask from '@mona-health/react-input-mask';
import { Loading } from '../components/Loading';

function PaymentPage() {
  const theme = useTheme();
  const { t } = useTranslation();
  const [loading, setLoading] = useState(false);
  const [paymentCompleted, setPaymentCompleted] = useState(false);

  const selectedOption = useSnapshot(paymentMethodStore, {
    sync: true,
  }).selectedOption;
  const [storedOption] = useLocalStorage<FinancedPaymentOption | null>(
    `${user}-payment-option`,
    null
  );
  const [storedUserData, setStoredUserData] = useLocalStorage<UserData | null>(
    `${user}-data`,
    null
  );

  const [submitted, setSubmitted] = useState(false);
  const [userData, setUserData] = useState<UserData>(
    storedUserData ?? {
      fullName: '',
      cpf: '',
      cardNumber: '',
      expirationDate: '',
      cvv: '',
      totalInstallments: storedOption?.installments
        ? storedOption.installments
        : 1,
    }
  );
  const navigate = useNavigate();
  const [validationState, setValidationState] = useState({
    fullName: true,
    cpf: true,
    cardNumber: true,
    expirationDate: true,
    cvv: true,
  });

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const isValid = validateFields(userData);
    setValidationState(isValid);
    setSubmitted(true);

    if (Object.values(isValid).every(Boolean)) {
      setLoading(true);

      setTimeout(async () => {
        setPaymentCompleted(true);
        setLoading(false);
      }, 2000);
    }
  };
  const updateField =
    (field: string) => (event: React.ChangeEvent<HTMLInputElement>) =>
      setUserData((prevState) => ({
        ...prevState,
        [field]: event.target.value,
      }));

  const updateSelectField = (event: SelectChangeEvent) => {
    setUserData((prevState) => ({
      ...prevState,
      totalInstallments: Number(event.target.value),
    }));
    paymentMethodStore.selectedOption = paymentOptions.find(
      (e) => e.installments === Number(event.target.value)
    ) as PaymentOption;
  };

  useEffect(() => {
    if (!selectedOption && storedOption) {
      paymentMethodStore.selectedOption = storedOption;
      setUserData((prevState) => ({
        ...prevState,
        totalInstallments: storedOption.installments,
      }));
    }
  }, []);

  useEffect(() => {
    if (selectedOption) {
      setStoredUserData(userData);
    }
  }, [userData]);

  if (paymentCompleted) {
    return (
      <Stack
        alignItems="center"
        m="auto"
        sx={{
          [theme.breakpoints.up('md')]: {
            maxWidth: '600px',
          },
        }}
      >
        <h2>{t('screens.creditCard.success')}</h2>
        <Button
          variant="contained"
          fullWidth
          sx={{ margin: '2em 0 0' }}
          onClick={() => navigate('/')}
        >
          {t('screens.creditCard.backToHome')}
        </Button>
      </Stack>
    );
  }

  if (!selectedOption) {
    return null;
  }

  if (loading) {
    return <Loading />;
  }

  return (
    <Stack
      alignItems="center"
      m="auto"
      sx={{
        [theme.breakpoints.up('md')]: {
          maxWidth: '600px',
        },
      }}
    >
      <h2>
        {getFinancedInstallments(selectedOption.installments) === 0
          ? t('screens.creditCard.pix_title', {
              user,
              total: formatMoney(selectedOption.total),
            })
          : t('screens.creditCard.financed_pix_title', {
              user,
              installments: getFinancedInstallments(
                selectedOption.installments
              ),
            })}
      </h2>
      <form
        style={{ width: '100%' }}
        onSubmit={(e) => {
          e.preventDefault();
          handleSubmit(e);
        }}
      >
        <Box display="flex" flexDirection="column" gap={3}>
          <TextField
            label="Nome Completo"
            required
            value={userData.fullName}
            onChange={updateField('fullName')}
          />
          <InputMask
            mask="999.999.999-99"
            value={userData.cpf}
            onChange={updateField('cpf')}
            maskPlaceholder={null}
          >
            <TextField
              label="CPF"
              required
              type="text"
              error={submitted && !validationState.cpf}
              placeholder="405.503.503-15"
            />
          </InputMask>
          <InputMask
            mask="9999 9999 9999 9999"
            value={userData.cardNumber}
            onChange={updateField('cardNumber')}
            maskPlaceholder={null}
          >
            <TextField
              label="Número do cartão"
              required
              type="text"
              error={submitted && !validationState.cardNumber}
              placeholder="4055 5035 0315 4055"
            />
          </InputMask>
          <Box display="flex" gap={3} justifyContent="space-between">
            <InputMask
              mask="99/99"
              value={userData.expirationDate}
              onChange={updateField('expirationDate')}
              maskPlaceholder={null}
            >
              <TextField
                label="Vencimento"
                required
                type="text"
                error={submitted && !validationState.expirationDate}
                placeholder="MM/AA"
                fullWidth
              />
            </InputMask>
            <InputMask
              mask="999"
              value={userData.cvv}
              onChange={updateField('cvv')}
              maskPlaceholder={null}
            >
              <TextField
                label="CVV"
                required
                type="text"
                error={submitted && !validationState.cvv}
                fullWidth
              />
            </InputMask>
          </Box>
          <Select
            onChange={updateSelectField}
            defaultValue={String(userData.totalInstallments)}
            required
            value={String(userData.totalInstallments)}
            sx={{ textAlign: 'left' }}
          >
            {paymentOptions.map((e) => (
              <MenuItem value={e.installments} key={e.installments}>
                {e.installments}x de{' '}
                {formatMoney(
                  'installmentValue' in e ? e.installmentValue : e.total
                )}
              </MenuItem>
            ))}
          </Select>
        </Box>
        <Button
          variant="contained"
          fullWidth
          sx={{ margin: '2em 0 0' }}
          type="submit"
        >
          {t('screens.creditCard.payButton')}
        </Button>
      </form>
      <PaymentInfo selectedOption={selectedOption} />
    </Stack>
  );
}

export default PaymentPage;
