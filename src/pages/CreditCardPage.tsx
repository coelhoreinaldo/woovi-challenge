import { Box, Button, FormControl, Stack, TextField } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { user } from '../database/mockData';
import { useSnapshot } from 'valtio';
import { paymentMethodStore } from '../store/paymentMethod';
import { FinancedPaymentOption } from '../types';
import React, { useEffect, useState } from 'react';
import useLocalStorage from '../hooks/useLocalStorage';

function CreditCardPage() {
  const { t } = useTranslation();
  const selectedOption = useSnapshot(paymentMethodStore)
    .selectedOption as FinancedPaymentOption;
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
    installments: 0,
  });

  const updateField =
    (field: string) => (event: React.ChangeEvent<HTMLInputElement>) =>
      setUserData((prevState) => ({
        ...prevState,
        [field]: event.target.value,
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
      <FormControl fullWidth>
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
        </Box>
        <Button variant="contained" fullWidth sx={{ margin: '2em 0 0' }}>
          Pagar
        </Button>
      </FormControl>
    </Stack>
  );
}

export default CreditCardPage;
