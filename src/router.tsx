import { createBrowserRouter } from 'react-router-dom';
import { PaymentPage, PaymentMethodPage, PixCreditCardPage } from './pages';
import App from './App';

export const router = createBrowserRouter([
  {
    path: '/woovi-challenge/',
    element: <App />,
    // errorElement: <ErrorPage />,
    children: [
      {
        path: '',
        element: <PaymentMethodPage />,
      },
      {
        path: 'pix_credit_card',
        element: <PixCreditCardPage />,
      },
      {
        path: 'payment',
        element: <PaymentPage />,
      },
    ],
  },
]);
