import { Box, Button, CircularProgress, Stack, useTheme } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { user } from '../database/mockData';
import { useSnapshot } from 'valtio';
import { paymentMethodStore } from '../store/paymentMethod';
import { formatMoney } from '../utils/format';
import { PaymentOption } from '../types';
import { FileCopy, CheckCircleOutline } from '@mui/icons-material';

import { useEffect, useState } from 'react';
import useLocalStorage from '../hooks/useLocalStorage';
import { PaymentInfo } from '../components/PaymentInfo';
import { useNavigate } from 'react-router-dom';

function PixCreditCardPage() {
  const theme = useTheme();
  const { t } = useTranslation();
  const [copied, setCopied] = useState(false);
  const selectedOption = useSnapshot(paymentMethodStore)
    .selectedOption as PaymentOption;
  const [pixPaid, setPixPaid] = useState(false);
  const navigate = useNavigate();

  const [storedOption] = useLocalStorage<PaymentOption | null>(
    `${user}-payment-option`,
    null
  );
  const [, setStoredTotalPaid, removeStoredTotalPaid] = useLocalStorage<
    number | null
  >(`${user}-total-paid`, null);

  useEffect(() => {
    if (!selectedOption && storedOption)
      paymentMethodStore.selectedOption = storedOption;
  }, []);

  if (!selectedOption) {
    return null;
  }

  const handleCopy = () => {
    navigator.clipboard.writeText('pix code');
    setCopied(true);
    const totalPaid =
      'installmentValue' in selectedOption
        ? selectedOption.installmentValue
        : selectedOption.total;
    paymentMethodStore.totalPaid = totalPaid;
    setStoredTotalPaid(totalPaid);
    setTimeout(() => setCopied(false), 1000);
    setTimeout(() => setPixPaid(true), 5000);

    if (selectedOption.installments === 1) {
      removeStoredTotalPaid();
      paymentMethodStore.totalPaid = 0;
    }
    if (selectedOption.installments > 1) {
      setTimeout(async () => {
        await navigate('/payment');
      }, 10000); // Simulate pix payment
    }
  };

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
        {t('screens.pixCreditCard.title', {
          user,
          total: formatMoney(
            'installmentValue' in selectedOption
              ? selectedOption.installmentValue
              : selectedOption.total
          ),
        })}
      </h2>
      <Box border="2px solid var(--green)" borderRadius="10px" p="0.7em">
        <img src="src/assets/qrCode.png" width={332} height={332} />
      </Box>
      {!pixPaid ? (
        <Button
          sx={{ marginTop: '2em', fontSize: '18px' }}
          variant="contained"
          color="primary"
          endIcon={copied ? <CheckCircleOutline /> : <FileCopy />}
          onClick={handleCopy}
        >
          {copied
            ? t('screens.pixCreditCard.copied')
            : t('screens.pixCreditCard.copyQrCodeButton')}
        </Button>
      ) : (
        <Box>
          <h2>{t('screens.pixCreditCard.paid')}</h2>
          {selectedOption.installments === 1 ? (
            <Button variant="contained" fullWidth onClick={() => navigate('/')}>
              {t('screens.creditCard.backToHome')}
            </Button>
          ) : (
            <CircularProgress color="success" />
          )}
        </Box>
      )}
      <PaymentInfo selectedOption={selectedOption} pixPaid={pixPaid} />
    </Stack>
  );
}

export default PixCreditCardPage;
