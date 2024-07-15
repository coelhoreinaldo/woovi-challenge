import { Stack, Typography } from '@mui/material';
import { Link } from 'react-router-dom';

function ErrorPage() {
  return (
    <Stack spacing="1em" mt="2em">
      <Typography variant="h5" align="left">
        Error 404 - Página não encontrada.
      </Typography>
      <Typography variant="h6" align="left">
        Envie um feedback para{' '}
        <Link to="https://github.com/coelhoreinaldo" target="_blank">
          @coelhoreinaldo
        </Link>{' '}
        compartilhando como você chegou até aqui.
      </Typography>
    </Stack>
  );
}

export default ErrorPage;
