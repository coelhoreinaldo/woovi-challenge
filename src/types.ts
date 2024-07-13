export interface PixPayment {
    total: number;
    cashback?: number;
    message?: string;
    installments: number;
}

export interface FinancedPaymentOption extends PixPayment {
    installmentValue: number;
    interest?: number;
}

export type PaymentOption = PixPayment | FinancedPaymentOption;

export interface UserData {
    fullName: string;
    cpf: string;
    cardNumber: string;
    expirationDate: string;
    cvv: string;
    totalInstallments: number;
}