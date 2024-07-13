import { UserData } from "../types";

export const getBorderRadius = (index: number, totalItems: number) => {
  if (index === 0)
    return '10px 10px 0 0';

  if (index === totalItems - 1)
    return '0 0 10px 10px';

  return "0"
}
export const getFinancedInstallments = (totalInstallments: number) => totalInstallments - 1

export const getPaymentDescription = (installments: number[], index: number) => {
  if (index === 0 && installments.length === 1)
    return 'Pagamento único no pix:'

  if (index === 0)
    return '1ª entrada no pix:'

  return `${index + 1}ª no cartão:`
}

export const isExpirationDateValid = (expirationDate: string) => {
  if (expirationDate.length < 5) return false;

  const [month, year] = expirationDate.split('/').map(Number);

  if (month < 1 || month > 12) return false;

  const currentYear = new Date().getFullYear() % 100;
  const currentMonth = new Date().getMonth() + 1;

  if (year < currentYear) return false;

  if (year === currentYear && month < currentMonth) return false;

  return true;
};

export const validateFields = (userData: UserData) => ({
  fullName: userData.fullName.length > 0,
  cpf: userData.cpf.length === 14,
  cardNumber: userData.cardNumber.length === 19,
  expirationDate: isExpirationDateValid(userData.expirationDate),
  cvv: userData.cvv.length === 3,
})