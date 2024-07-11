import { PaymentOption, } from "../types";

export const user = 'João'

export const ORIGINAL_PRICE = 30500

export const paymentOptions: PaymentOption[] = [
  { total: ORIGINAL_PRICE, cashback: 0.03 },
  { installments: 2, installmentValue: 15300, total: 30600, interest: 0.02 },
  { installments: 3, installmentValue: 10196.66, total: 30620, interest: 0.01 },
  { installments: 4, installmentValue: 7725, total: 30900, interest: -0.03, message: '-3% de juros: Melhor opção de parcelamento' },
  { installments: 5, installmentValue: 6300, total: 31500, interest: -0.05 },
  { installments: 6, installmentValue: 5283.33, total: 31699.98, interest: -0.06 },
  { installments: 7, installmentValue: 5454.85, total: 31800.00, interest: -0.06 },
];