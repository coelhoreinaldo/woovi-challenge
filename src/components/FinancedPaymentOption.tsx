import { FC } from 'react';
import { FinancedPaymentOption as FinancedPaymentOptionI } from '../types';
import { Box, Card, CardContent, Radio, Typography } from '@mui/material';
import { formatMoney } from '../utils/format';

interface FinancedPaymentOptionComponentProps {
  financedPaymentOption: FinancedPaymentOptionI;
  index: number;
  paymentMethod: number | null;
  handleChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

export const FinancedPaymentOption: FC<FinancedPaymentOptionComponentProps> = ({
  financedPaymentOption,
  index,
  paymentMethod,
  handleChange,
}) => {
  const isTheFirstItem = index === 0;

  return (
    <Box
      position="relative"
      display="inline-block"
      width="100%"
      sx={{ margin: !isTheFirstItem ? '0' : '2em 0 0 0' }}
    >
      {isTheFirstItem && (
        <Box
          borderRadius={'100px'}
          width={157}
          height={27}
          sx={{
            position: 'absolute',
            top: -14,
            left: 100,
            transform: 'translateX(-50%)',
            backgroundColor: '#E5E5E5',
          }}
        >
          <Typography variant="h6" fontSize={16}>
            <strong>Pix Parcelado</strong>
          </Typography>
        </Box>
      )}
      <Card
        sx={{
          borderTopLeftRadius: isTheFirstItem ? 10 : 0,
          borderTopRightRadius: isTheFirstItem ? 10 : 0,
        }}
      >
        <CardContent>
          <Box display="flex" flexDirection="column">
            <Box
              display="flex"
              alignItems="center"
              justifyContent="space-between"
              width="100%"
            >
              <Typography variant="h5">
                <strong>1x</strong>{' '}
                {formatMoney(financedPaymentOption.installmentValue)}
              </Typography>
              <Radio
                checked={paymentMethod === financedPaymentOption.installments}
                onChange={handleChange}
                value={financedPaymentOption.installments}
                name="payment-method"
              />
            </Box>
            <Typography color="#AFAFAF" textAlign="left" variant="subtitle1">
              {`Total: ${formatMoney(financedPaymentOption.total)}`}
            </Typography>
            {financedPaymentOption.message && (
              <Box
                bgcolor="#133A6F"
                minHeight={33}
                display="flex"
                alignItems="center"
                pl="0.4em"
                pr="1.1em"
                borderRadius={1}
                sx={{
                  clipPath: 'polygon(0 0, 100% 0, 95% 50%, 100% 100%, 0 100%)',
                }}
              >
                <Typography color="white">
                  {financedPaymentOption.message}
                </Typography>
              </Box>
            )}
          </Box>
        </CardContent>
      </Card>
    </Box>
  );
};
