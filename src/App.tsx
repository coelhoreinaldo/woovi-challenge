import { CircularProgress } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Suspense } from 'react';
import { RouterProvider } from 'react-router-dom';
import { router } from './router';

const theme = createTheme({
  palette: {
    success: {
      main: '#03D69D',
    },
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <Suspense fallback={<CircularProgress />}>
        <RouterProvider router={router} />
      </Suspense>
    </ThemeProvider>
  );
}

export default App;
