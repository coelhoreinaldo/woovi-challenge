import { Box, Button, Stack, Typography } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { user } from '../database/mockData';
import { useSnapshot } from 'valtio';
import { paymentMethodStore } from '../store/paymentMethod';
import { formatDate, formatMoney } from '../utils/format';
import { FinancedPaymentOption } from '../types';
import FileCopyIcon from '@mui/icons-material/FileCopy';

function PixCreditCardPage() {
  const { t } = useTranslation();
  const selectedOption = useSnapshot(paymentMethodStore)
    .selectedOption as FinancedPaymentOption;

  console.log(selectedOption);

  return (
    <Stack alignItems="center">
      <h2>
        {t('screens.pixCreditCard.title', {
          user,
          total: formatMoney(selectedOption.installmentValue),
        })}
      </h2>
      <Box border="2px solid var(--green)" borderRadius="10px" p="0.7em">
        <img src="src/assets/qrCode.png" width={332} height={332} />
      </Box>
      <Button
        sx={{ marginTop: '2em', fontSize: '18px' }}
        variant="contained"
        color="primary"
        endIcon={<FileCopyIcon />}
      >
        {t('screens.pixCreditCard.copyQrCodeButton')}
      </Button>

      <Box mt={2}>
        <Typography color="var(--dimed)">
          {t('screens.pixCreditCard.expiresIn')}
        </Typography>
        <strong>{formatDate(new Date())}</strong>
      </Box>
    </Stack>
  );
}

export default PixCreditCardPage;
