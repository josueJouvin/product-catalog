import CssBaseline from '@mui/material/CssBaseline';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Header } from './components/Header';
import { ProductDetail } from './pages/ProductDetail';
import { ProductList } from './pages/ProductList';

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#00ff88',
    },
    secondary: {
      main: '#ff3366',
    },
    background: {
      default: '#0a0a0a',
      paper: '#1a1a1a',
    },
    text: {
      primary: '#e8e8e8',
      secondary: '#a0a0a0',
    },
  },
  typography: {
    fontFamily: 'Archivo, sans-serif',
  },
});

function App() {
  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/" element={<ProductList />} />
          <Route path="/product/:id" element={<ProductDetail />} />
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
