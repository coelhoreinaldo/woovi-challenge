import { PaymentOption, } from "../types";

export const user = 'João'

export const ORIGINAL_PRICE = 30500

export const paymentOptions: PaymentOption[] = [
  { installments: 1, total: ORIGINAL_PRICE, cashback: 0.03 },
  { installments: 2, installmentValue: 15300, total: 30600 },
  { installments: 3, installmentValue: 10196.66, total: 30620 },
  { installments: 4, installmentValue: 7725, total: 30900, message: '-3% de juros: Melhor opção de parcelamento' },
  { installments: 5, installmentValue: 6300, total: 31500 },
  { installments: 6, installmentValue: 5283.33, total: 31699.98 },
  { installments: 7, installmentValue: 4542.85, total: 31799.95 },
];