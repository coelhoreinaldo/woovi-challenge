import { CircularProgress } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Suspense } from 'react';

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
      <Suspense fallback={<CircularProgress />} />
    </ThemeProvider>
  );
}

export default App;
