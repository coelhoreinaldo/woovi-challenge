import { proxy } from 'valtio';
import { PaymentOption } from '../types';

export const paymentMethodStore = proxy({
  selectedPaymentMethod: null as number | null,
  selectedOption: null as PaymentOption | null,
  totalPaid: 0,
});
