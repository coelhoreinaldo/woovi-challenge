import { Box, Typography } from '@mui/material';
import { FC } from 'react';
import { useTranslation } from 'react-i18next';

export const Footer: FC = () => {
  const { t } = useTranslation();
  return (
    <Box
      display="flex"
      gap={0.5}
      justifyContent="center"
      alignItems="center"
      color="var(--dimed)"
      mt={2}
    >
      <img src="src/assets/shieldIcon.svg" />
      <Typography>{t('footer')}</Typography>
      <img
        src="src/assets/wooviLogoSmall.svg"
        style={{ marginBottom: '3px' }}
      />
    </Box>
  );
};
