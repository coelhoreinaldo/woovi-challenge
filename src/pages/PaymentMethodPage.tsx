import { paymentOptions, user } from '../database/mockData';
import { PixPayment } from '../components/PixPayment';
import { FinancedPaymentOption } from '../components/FinancedPaymentOption';
import {
  FinancedPaymentOption as FinancedPaymentOptionI,
  PaymentOption,
} from '../types';
import { Button, Stack } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { useSnapshot } from 'valtio';
import { paymentMethodStore } from '../store/paymentMethod';
import useLocalStorage from '../hooks/useLocalStorage';

function PaymentMethodPage() {
  const { selectedPaymentMethod, selectedOption } =
    useSnapshot(paymentMethodStore);
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [, setStoredOption] = useLocalStorage<PaymentOption | null>(
    `${user}-payment-option`,
    null
  );

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    paymentMethodStore.selectedPaymentMethod = Number(event.target.value);
    paymentMethodStore.selectedOption =
      paymentOptions[Number(event.target.value) - 1];
  };
  const handleNavigation = () => {
    setStoredOption(selectedOption);

    if (selectedPaymentMethod === 1) {
      return navigate('/pix');
    }

    return navigate('/pix_credit_card');
  };

  return (
    <Stack>
      <h2>{t('screens.paymentMethod.greeting', { user })}</h2>
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
