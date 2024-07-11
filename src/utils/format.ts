export const formatPercentage = (decimal: number): string => `${(decimal * 100).toFixed(2)}%`;

export const calculateCashback = (total: number, cashback: number): number => total * cashback;

export const formatMoney = (value: number): string => value.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });