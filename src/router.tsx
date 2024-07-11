import { createBrowserRouter } from 'react-router-dom';
import PaymentMethodPage from './pages/PaymentMethodPage';
import PixCreditCardPage from './pages/PixCreditCardPage';

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
]);
