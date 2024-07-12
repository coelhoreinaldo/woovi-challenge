import { Stack } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { user } from '../database/mockData';
import { useSnapshot } from 'valtio';
import { paymentMethodStore } from '../store/paymentMethod';
import { FinancedPaymentOption, PaymentOption } from '../types';
import { useEffect, useState } from 'react';
import useLocalStorage from '../hooks/useLocalStorage';

function CreditCardPage() {
  const { t } = useTranslation();
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

  console.log(selectedOption);

  return (
    <Stack alignItems="center">
      <h2>
        {t('screens.creditCard.title', {
          user,
          installments: selectedOption.installments - 1,
        })}
      </h2>
    </Stack>
  );
}

export default CreditCardPage;
