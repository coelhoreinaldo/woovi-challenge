import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Button,
  Divider,
  Stack,
  Typography,
} from '@mui/material';
import { useTranslation } from 'react-i18next';
import { user } from '../database/mockData';
import { useSnapshot } from 'valtio';
import { paymentMethodStore } from '../store/paymentMethod';
import { formatDate, formatMoney } from '../utils/format';
import { FinancedPaymentOption, PaymentOption } from '../types';
import { FileCopy, CheckCircleOutline, ExpandMore } from '@mui/icons-material';

import Timeline from '@mui/lab/Timeline';
import TimelineItem, { timelineItemClasses } from '@mui/lab/TimelineItem';
import TimelineSeparator from '@mui/lab/TimelineSeparator';
import TimelineConnector from '@mui/lab/TimelineConnector';
import TimelineContent from '@mui/lab/TimelineContent';
import TimelineDot from '@mui/lab/TimelineDot';
import { useEffect, useState } from 'react';
import useLocalStorage from '../hooks/useLocalStorage';

function PixCreditCardPage() {
  const { t } = useTranslation();
  const [copied, setCopied] = useState(false);
  const selectedOption = useSnapshot(paymentMethodStore)
    .selectedOption as FinancedPaymentOption;
  const [storedOption] = useLocalStorage<PaymentOption | null>(
    `${user}-payment-option`,
    null
  );

  useEffect(() => {
    if (!selectedOption && storedOption) {
      paymentMethodStore.selectedOption = storedOption;
    }
  }, []);

  if (!selectedOption) {
    return null;
  }

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
        endIcon={copied ? <CheckCircleOutline /> : <FileCopy />}
        onClick={() => {
          navigator.clipboard.writeText('pix code');
          setCopied(true);
          setTimeout(() => setCopied(false), 1000);
        }}
      >
        {copied
          ? t('screens.pixCreditCard.copied')
          : t('screens.pixCreditCard.copyQrCodeButton')}
      </Button>

      <Box mt={2}>
        <Typography color="var(--dimed)">
          {t('screens.pixCreditCard.expiresIn')}
        </Typography>
        <strong>{formatDate(new Date())}</strong>
      </Box>

      <Timeline
        sx={{
          width: '100%',
          [`& .${timelineItemClasses.root}:before`]: {
            flex: 0,
            padding: 0,
          },
        }}
      >
        {[...Array(selectedOption.installments).keys()].map((e) => (
          <TimelineItem key={e}>
            <TimelineSeparator>
              <TimelineDot
                color={e === 0 ? 'success' : 'grey'}
                variant="outlined"
              />
              {e + 1 !== selectedOption.installments ? (
                <TimelineConnector />
              ) : null}
            </TimelineSeparator>
            <TimelineContent display="flex" justifyContent="space-between">
              <Typography>
                {e === 0 ? '1ª entrada no pix:' : `${e + 1}ª no cartão:`}
              </Typography>
              <Typography fontWeight={800}>
                {formatMoney(
                  selectedOption.installmentValue / selectedOption.installments
                )}
              </Typography>
            </TimelineContent>
          </TimelineItem>
        ))}
      </Timeline>
      <Divider flexItem />
      <Box display="flex" justifyContent="space-between" width="100%" my={2}>
        <Typography>CET: 0.5%</Typography>
        <Typography>Total: {formatMoney(selectedOption.total)}</Typography>
      </Box>
      <Divider flexItem />
      <Accordion
        elevation={0}
        sx={{
          '&:before': {
            display: 'none',
          },
        }}
      >
        <AccordionSummary
          expandIcon={<ExpandMore />}
          aria-controls="panel1-content"
          id="panel1-header"
        >
          <strong>{t('screens.pixCreditCard.how_it_works')}</strong>
        </AccordionSummary>
        <AccordionDetails>
          Lorem ipsum, dolor sit amet consectetur adipisicing elit. Placeat quos
          ducimus veritatis provident porro quibusdam sapiente rerum facilis
          iusto molestias, dolore est accusantium, iure necessitatibus fugit
          qui! Molestias, sapiente culpa!
        </AccordionDetails>
      </Accordion>
      <Divider flexItem />
      <Box my={2}>
        <Typography color={'var(--dimed)'}>
          {t('screens.pixCreditCard.identifier')}
        </Typography>
        <Typography>
          <strong>2c1b951f356c4680b13ba1c9fc889c47</strong>
        </Typography>
      </Box>
    </Stack>
  );
}

export default PixCreditCardPage;
