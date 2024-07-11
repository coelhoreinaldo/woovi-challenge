export const getBorderRadius = (index: number, totalItems: number) => {
  if (index === 0)
    return '10px 10px 0 0';

  if (index === totalItems - 1)
    return '0 0 10px 10px';

  return "0"
}