export interface PixPayment {
    total: number;
    cashback?: number;
    message?: string;
    installments: number;
}

export interface FinancedPaymentOption extends PixPayment {
    installmentValue: number;
    total: number;
    interest?: number;
}

export type PaymentOption = PixPayment | FinancedPaymentOption;

