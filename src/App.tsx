import { paymentOptions } from './database/mockData';
import { PixPayment } from './components/PixPayment';
import { FinancedPaymentOption } from './components/FinancedPaymentOption';
import { FinancedPaymentOption as FinancedPaymentOptionI } from './types';
import { useState } from 'react';

function App() {
  const [paymentMethod, setPaymentMethod] = useState<number | null>(null);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) =>
    setPaymentMethod(Number(event.target.value));

  return (
    <>
      <img src="src/assets/wooviLogo.svg" />
      <h2>João, como você quer pagar?</h2>
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
    </>
  );
}

export default App;
