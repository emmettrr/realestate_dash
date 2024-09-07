import React, { useEffect, useState } from 'react';
import { Route, Routes, Navigate } from 'react-router-dom'; // No need for BrowserRouter here
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { CssBaseline } from '@mui/material';
import PrivateRoute from './components/PrivateRoute';
import Layout from './components/Layout';
import ProfileDropdown from './components/ProfileDropdown';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import Homes from './pages/Homes';
import Clients from './pages/Clients';
import Sales from './pages/Sales';
import PasswordReset from './pages/PasswordReset';

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [darkMode, setDarkMode] = useState(localStorage.getItem('darkMode') === 'true');

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      setIsAuthenticated(true);
    } else {
      setIsAuthenticated(false);
    }

    const storedDarkMode = localStorage.getItem('darkMode');
    if (storedDarkMode !== null) {
      setDarkMode(storedDarkMode === 'true');
    }
  }, []);

  const theme = createTheme({
    palette: {
      mode: darkMode ? 'dark' : 'light',
      primary: { main: '#007bff' },
      background: {
        default: darkMode ? '#1d1e2c' : '#f0f0f0',
        paper: darkMode ? '#1e1e2f' : '#ffffff',
      },
      text: {
        primary: darkMode ? '#ffffff' : '#000000',
        secondary: darkMode ? '#a0a0b0' : '#606060',
      },
    },
  });

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
        <Routes>
          {/* Public Route for Login */}
          <Route path="/login" element={<Login />} />

          {/* Protected Routes with Layout */}
          <Route path="/" element={isAuthenticated ? <Layout /> : <Navigate to="/login" />}>
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="homes" element={<Homes />} />
            <Route path="clients" element={<Clients />} />
            <Route path="sales" element={<Sales />} />
            <Route path="reset-password" element={<PasswordReset />} />
          </Route>
        </Routes>
    </ThemeProvider>
  );
};

export default App;