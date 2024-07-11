import { paymentOptions } from './database/mockData';
import { PixPayment } from './components/PixPayment';
import { FinancedPaymentOption } from './components/FinancedPaymentOption';
import { FinancedPaymentOption as FinancedPaymentOptionI } from './types';

function App() {
  return (
    <>
      <img src="src/assets/wooviLogo.svg" />
      <h2>João, como você quer pagar?</h2>
      <PixPayment pixPayment={paymentOptions[0]} />
      {paymentOptions.filter((_p, i) => i !== 0).map((financedPaymentOption, i) => <FinancedPaymentOption key={`${financedPaymentOption.total}-${i}`} financedPaymentOption={financedPaymentOption as FinancedPaymentOptionI} index={i} />)}
    </>
  );
}

export default App;