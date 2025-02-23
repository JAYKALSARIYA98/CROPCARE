import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import AppBar from './components/Appbar';
import Home from './pages/Home';
import UploadPic from './pages/Uploadpic';
import Chatbot from './pages/Chatbot';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';

const theme = createTheme({
  palette: {
    primary: {
      main: '#1976d2',
    },
    secondary: {
      main: '#dc004e',
    },
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <AppBar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/upload" element={<UploadPic />} />
          <Route path="/chatbot" element={<Chatbot />} />
        </Routes>
      </Router>
    </ThemeProvider>
  );
}

export default App;
