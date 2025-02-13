import { CircularProgress } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Suspense } from 'react';
import { Outlet } from 'react-router-dom';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import translationPT from './assets/locales/pt-Br.json';

i18n.use(initReactI18next).init({
  resources: {
    pt: {
      translation: translationPT,
    },
  },
  lng: 'pt',
  fallbackLng: 'pt',
});

const theme = createTheme({
  palette: {
    mode: 'light',
    success: {
      main: '#03D69D',
    },
    primary: {
      main: '#133A6F',
    },
  },
  typography: {
    fontFamily: 'Nunito, Arial, sans-serif',
    button: {
      textTransform: 'none',
    },
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <Suspense fallback={<CircularProgress />}>
        <Header />
        <Outlet />
        <Footer />
      </Suspense>
    </ThemeProvider>
  );
}

export default App;
