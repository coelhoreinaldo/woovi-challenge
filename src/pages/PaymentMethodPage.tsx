import { paymentOptions } from '../database/mockData';
import { PixPayment } from '../components/PixPayment';
import { FinancedPaymentOption } from '../components/FinancedPaymentOption';
import { FinancedPaymentOption as FinancedPaymentOptionI } from '../types';
import { useState } from 'react';
import { Button, Stack } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';

function PaymentMethodPage() {
  const [paymentMethod, setPaymentMethod] = useState<number | null>(null);
  const { t } = useTranslation();
  const navigate = useNavigate();

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) =>
    setPaymentMethod(Number(event.target.value));

  const handleNavigation = () =>
    paymentMethod === 1 ? navigate('/pix') : navigate('/pix+credit_card');

  return (
    <Stack>
      <h2>{t('screens.paymentMethod.greeting', { user: 'João' })}</h2>
      <PixPayment
        pixPayment={paymentOptions[0]}
        paymentMethod={paymentMethod}
        handleChange={handleChange}
      />
      {paymentOptions
        .filter((_p, i) => i !== 0)
        .map((financedPaymentOption, i) => (
          <FinancedPaymentOption
            key={`${financedPaymentOption.total}-${i}`}
            financedPaymentOption={
              financedPaymentOption as FinancedPaymentOptionI
            }
            index={i}
            paymentMethod={paymentMethod}
            handleChange={handleChange}
          />
        ))}
      <Button
        sx={{ marginTop: '2em' }}
        variant="contained"
        fullWidth
        color="primary"
        onClick={handleNavigation}
        disabled={!paymentMethod}
      >
        {t('screens.paymentMethod.continueButton')}
      </Button>
    </Stack>
  );
}

export default PaymentMethodPage;
