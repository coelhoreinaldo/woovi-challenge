import { Check, ExpandMore } from '@mui/icons-material';
import {
  Timeline,
  timelineItemClasses,
  TimelineItem,
  TimelineSeparator,
  TimelineDot,
  TimelineConnector,
  TimelineContent,
} from '@mui/lab';
import {
  Box,
  Typography,
  Divider,
  Accordion,
  AccordionSummary,
  AccordionDetails,
} from '@mui/material';
import { t } from 'i18next';
import { FC } from 'react';
import { formatDate, formatMoney } from '../utils/format';
import { PaymentOption } from '../types';
import { getPaymentDescription } from '../utils/paymentMethod';
import { useLocation } from 'react-router-dom';
import { useSnapshot } from 'valtio';
import { paymentMethodStore } from '../store/paymentMethod';

interface PaymentInfoComponentProps {
  selectedOption: PaymentOption;
  pixPaid?: boolean;
}
export const PaymentInfo: FC<PaymentInfoComponentProps> = ({
  selectedOption,
  pixPaid,
}) => {
  const { totalPaid } = useSnapshot(paymentMethodStore);
  const location = useLocation();

  return (
    <>
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
        {[...Array(selectedOption.installments).keys()].map((e, _, arr) => (
          <TimelineItem key={e}>
            <TimelineSeparator>
              <TimelineDot
                color="success"
                variant={
                  e === 0 && (location.pathname.includes('payment') || pixPaid)
                    ? 'filled'
                    : 'outlined'
                }
                sx={{
                  width: 4,
                  height: 4,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                {e === 0 &&
                (location.pathname.includes('payment') || pixPaid) ? (
                  <Check
                    fontSize="small"
                    sx={{ color: 'white', fontSize: 13 }}
                  />
                ) : null}
              </TimelineDot>
              {e + 1 !== selectedOption.installments ? (
                <TimelineConnector />
              ) : null}
            </TimelineSeparator>
            <TimelineContent display="flex" justifyContent="space-between">
              <Typography>{getPaymentDescription(arr, e)}</Typography>
              <Typography fontWeight={800}>
                {e === 0 && totalPaid
                  ? formatMoney(totalPaid)
                  : 'installmentValue' in selectedOption
                  ? formatMoney(selectedOption.installmentValue)
                  : formatMoney(selectedOption.total)}
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
          sx={{ padding: 0 }}
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
    </>
  );
};
