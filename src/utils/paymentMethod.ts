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
