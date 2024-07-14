import { proxy } from 'valtio';
import { PaymentOption } from '../types';

export const paymentMethodStore = proxy({
  selectedOption: null as PaymentOption | null,
  totalPaid: 0,
});
