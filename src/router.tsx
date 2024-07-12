import { createBrowserRouter } from 'react-router-dom';
import { CreditCardPage, PaymentMethodPage, PixCreditCardPage } from './pages';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <PaymentMethodPage />,
  },
  {
    path: '/pix',
    element: <p>Pix</p>,
  },
  {
    path: '/pix_credit_card',
    element: <PixCreditCardPage />,
  },
  {
    path: '/payment',
    element: <CreditCardPage />,
  },
]);
