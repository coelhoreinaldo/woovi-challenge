import { CircularProgress, Stack } from '@mui/material';
import { FC } from 'react';

export const Loading: FC = () => {
  return (
    <Stack sx={{ height: '50vh' }} alignItems="center" justifyContent="center">
      <CircularProgress color="success" />
    </Stack>
  );
};
