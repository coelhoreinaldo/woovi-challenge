import { createBrowserRouter } from 'react-router-dom';
import PaymentMethodPage from './pages/PaymentMethodPage';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <PaymentMethodPage />,
  },
]);
