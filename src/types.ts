export interface PixPayment {
    total: number;
    cashback?: number;
    message?: string;
}

export interface FinancedPaymentOption extends PixPayment {
    installments: number;
    installmentValue: number;
    total: number;
    interest?: number;
}

export type PaymentOption = PixPayment | FinancedPaymentOption;

