import { Box, Button, Stack } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { user } from '../database/mockData';
import { useSnapshot } from 'valtio';
import { paymentMethodStore } from '../store/paymentMethod';
import { formatMoney } from '../utils/format';
import { FinancedPaymentOption, PaymentOption } from '../types';
import { FileCopy, CheckCircleOutline } from '@mui/icons-material';

import { useEffect, useState } from 'react';
import useLocalStorage from '../hooks/useLocalStorage';
import { PaymentInfo } from '../components/PaymentInfo';

function PixCreditCardPage() {
  const { t } = useTranslation();
  const [copied, setCopied] = useState(false);
  const selectedOption = useSnapshot(paymentMethodStore)
    .selectedOption as FinancedPaymentOption;
  const [storedOption] = useLocalStorage<PaymentOption | null>(
    `${user}-payment-option`,
    null
  );

  useEffect(() => {
    if (!selectedOption && storedOption) {
      paymentMethodStore.selectedOption = storedOption;
    }
  }, []);

  if (!selectedOption) {
    return null;
  }

  return (
    <Stack alignItems="center">
      <h2>
        {t('screens.pixCreditCard.title', {
          user,
          total: formatMoney(selectedOption.installmentValue),
        })}
      </h2>
      <Box border="2px solid var(--green)" borderRadius="10px" p="0.7em">
        <img src="src/assets/qrCode.png" width={332} height={332} />
      </Box>
      <Button
        sx={{ marginTop: '2em', fontSize: '18px' }}
        variant="contained"
        color="primary"
        endIcon={copied ? <CheckCircleOutline /> : <FileCopy />}
        onClick={() => {
          navigator.clipboard.writeText('pix code');
          setCopied(true);
          setTimeout(() => setCopied(false), 1000);
        }}
      >
        {copied
          ? t('screens.pixCreditCard.copied')
          : t('screens.pixCreditCard.copyQrCodeButton')}
      </Button>
      <PaymentInfo selectedOption={selectedOption} />
    </Stack>
  );
}

export default PixCreditCardPage;
