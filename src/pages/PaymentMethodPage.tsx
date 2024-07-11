import { paymentOptions } from '../database/mockData';
import { PixPayment } from '../components/PixPayment';
import { FinancedPaymentOption } from '../components/FinancedPaymentOption';
import { FinancedPaymentOption as FinancedPaymentOptionI } from '../types';
import { Button, Stack } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { useSnapshot } from 'valtio';
import { paymentMethodStore } from '../store/paymentMethod';

function PaymentMethodPage() {
  const { selectedPaymentMethod } = useSnapshot(paymentMethodStore);
  const { t } = useTranslation();
  const navigate = useNavigate();

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) =>
    (paymentMethodStore.selectedPaymentMethod = Number(event.target.value));

  const handleNavigation = () => {
    if (selectedPaymentMethod === 1) {
      paymentMethodStore.selectedOption = paymentOptions[0];
      return navigate('/pix');
    }
    paymentMethodStore.selectedOption =
      paymentOptions[selectedPaymentMethod! - 1];
    return navigate('/pix_credit_card');
  };

  return (
    <Stack>
      <h2>{t('screens.paymentMethod.greeting', { user: 'João' })}</h2>
      <PixPayment
        pixPayment={paymentOptions[0]}
        paymentMethod={selectedPaymentMethod}
        handleChange={handleChange}
      />
      {paymentOptions
        .filter((_p, i) => i !== 0)
        .map((financedPaymentOption, i, arr) => (
          <FinancedPaymentOption
            paymentOptionsData={arr}
            key={`${financedPaymentOption.total}-${i}`}
            financedPaymentOption={
              financedPaymentOption as FinancedPaymentOptionI
            }
            index={i}
            paymentMethod={selectedPaymentMethod}
            handleChange={handleChange}
          />
        ))}
      <Button
        sx={{ marginTop: '2em' }}
        variant="contained"
        fullWidth
        color="primary"
        onClick={handleNavigation}
        disabled={!selectedPaymentMethod}
      >
        {t('screens.paymentMethod.continueButton')}
      </Button>
    </Stack>
  );
}

export default PaymentMethodPage;
