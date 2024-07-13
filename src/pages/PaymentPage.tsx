import {
  Box,
  Button,
  MenuItem,
  Select,
  SelectChangeEvent,
  Stack,
  TextField,
} from '@mui/material';
import { useTranslation } from 'react-i18next';
import { paymentOptions, user } from '../database/mockData';
import { useSnapshot } from 'valtio';
import { paymentMethodStore } from '../store/paymentMethod';
import { FinancedPaymentOption } from '../types';
import React, { useEffect, useState } from 'react';
import useLocalStorage from '../hooks/useLocalStorage';
import { formatMoney } from '../utils/format';
import { useNavigate } from 'react-router-dom';

function PaymentPage() {
  const { t } = useTranslation();
  const selectedOption = useSnapshot(paymentMethodStore).selectedOption;
  const [storedOption] = useLocalStorage<FinancedPaymentOption | null>(
    `${user}-payment-option`,
    null
  );
  const [userData, setUserData] = useState({
    fullName: '',
    cpf: '',
    cardNumber: '',
    expirationDate: '',
    cvv: '',
    installments: storedOption?.installments ? storedOption.installments : 1,
  });
  const navigate = useNavigate();

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    navigate('/pix_credit_card');
  };

  const updateField =
    (field: string) => (event: React.ChangeEvent<HTMLInputElement>) =>
      setUserData((prevState) => ({
        ...prevState,
        [field]: event.target.value,
      }));

  const updateSelectField = (event: SelectChangeEvent) =>
    setUserData((prevState) => ({
      ...prevState,
      installments: Number(event.target.value),
    }));

  useEffect(() => {
    if (!selectedOption && storedOption) {
      paymentMethodStore.selectedOption = storedOption;
      setUserData((prevState) => ({
        ...prevState,
        installments: storedOption.installments - 1,
      }));
    }
  }, []);

  if (!selectedOption) {
    return null;
  }

  return (
    <Stack alignItems="center">
      <h2>
        {t('screens.creditCard.title', {
          user,
          installments: selectedOption.installments - 1,
        })}
      </h2>
      <form
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
          <TextField
            label="CPF"
            required
            type="number"
            value={userData.cpf}
            onChange={updateField('cpf')}
          />
          <TextField
            label="Número do cartão"
            required
            type="number"
            value={userData.cardNumber}
            onChange={updateField('cardNumber')}
          />
          <Box display="flex" gap={3}>
            <TextField
              label="Vencimento"
              required
              type="date"
              value={userData.expirationDate}
              onChange={updateField('expirationDate')}
            />
            <TextField
              label="CVV"
              required
              type="number"
              value={userData.cvv}
              onChange={updateField('cvv')}
            />
          </Box>
          <Select
            onChange={updateSelectField}
            defaultValue={String(userData.installments)}
            required
            value={String(userData.installments)}
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
    </Stack>
  );
}

export default PaymentPage;
