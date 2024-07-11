import { FC } from "react";
import { PixPayment as PixPaymentI } from "../types";
import { Box, Card, CardContent, Radio, Typography } from "@mui/material";
import { calculateCashback, formatMoney, formatPercentage } from "../utils/format";

interface PaymentOptionComponentProps {
  pixPayment: PixPaymentI;
}

export const PixPayment: FC<PaymentOptionComponentProps> = ({ pixPayment: pixPayment }) => {

  return (
    <Box position="relative" display="inline-block" width="100%">
      <Box
        borderRadius="100px"
        width={67}
        height={27}
        sx={{
          position: 'absolute',
          top: -14,
          left: 56,
          transform: 'translateX(-50%)',
          backgroundColor: '#E5E5E5',
        }}>
        <Typography
          variant="h6"
          fontSize={16}
        >
          <strong>Pix</strong>
        </Typography>
      </Box>
      <Card sx={{ borderRadius: 2 }}>
        <CardContent>
          <Box display="flex" flexDirection="column">
            <Box display="flex" alignItems="center" justifyContent="space-between" width="100%">
              <Typography variant="h5">
                <strong>1x</strong> {formatMoney(pixPayment.total)}
              </Typography>
              <Radio value={1} />
            </Box>
            <Typography variant="h6" textAlign="left" color="#03D69D">
              Ganhe <strong>{formatPercentage(pixPayment.cashback!)}</strong> de cashback
            </Typography>
            <Box
              bgcolor="#133A6F"
              minHeight={33}
              display="flex"
              alignItems="center"
              pl="0.4em"
              pr="1.1em"
              borderRadius={1}
              sx={{
                clipPath: 'polygon(0 0, 100% 0, 95% 50%, 100% 100%, 0 100%)'
              }}
            >
              <Typography color="white">
                {`🤑 Ganhe ${calculateCashback(pixPayment.total, pixPayment.cashback!)} de volta no seu Pix na hora`}
              </Typography>
            </Box>
          </Box>
        </CardContent>
      </Card>
    </Box >
  );
};

