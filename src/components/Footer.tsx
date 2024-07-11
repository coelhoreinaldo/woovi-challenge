import { Box, Typography } from '@mui/material';
import { FC } from 'react';

export const Footer: FC = () => {
  return (
    <Box
      display="flex"
      gap={0.5}
      justifyContent="center"
      alignItems="center"
      color="#B2B2B2"
      mt={2}
    >
      <img src="src/assets/shieldIcon.svg" />
      <Typography>Pagamento 100% seguro via:</Typography>
      <img
        src="src/assets/wooviLogoSmall.svg"
        style={{ marginBottom: '3px' }}
      />
    </Box>
  );
};
