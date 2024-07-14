import { createBrowserRouter } from 'react-router-dom';
import { PaymentPage, PaymentMethodPage, PixCreditCardPage } from './pages';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <PaymentMethodPage />,
  },
  {
    path: '/pix_credit_card',
    element: <PixCreditCardPage />,
  },
  {
    path: '/payment',
    element: <PaymentPage />,
  },
]);
