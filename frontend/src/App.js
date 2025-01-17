import React, { useEffect, useState } from 'react';
import { Route, Routes, Navigate, useNavigate } from 'react-router-dom';
import { createTheme, ThemeProvider as MuiThemeProvider } from '@mui/material/styles';
import { CssBaseline } from '@mui/material';
import Layout from './components/Layout';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import Agents from './pages/Agents';
import Homes from './pages/Homes';
import Clients from './pages/Clients';
import Sales from './pages/Sales';
import PasswordReset from './pages/PasswordReset';
import { ThemeContext } from './ThemeContext'; // Assuming you have a ThemeContext

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true); // Add a loading state to handle auth check
  const [darkMode, setDarkMode] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    // Check for token in localStorage to persist login
    const token = localStorage.getItem('token');
    if (token) {
      setIsAuthenticated(true);
    } else {
      setIsAuthenticated(false);
      navigate('/login'); // Redirect to login if no token is found
    }
    setLoading(false); // End loading once token is checked

    // Load dark mode preference from localStorage
    const storedDarkMode = localStorage.getItem('darkMode') === 'true';
    setDarkMode(storedDarkMode);
  }, [navigate]);

  const toggleDarkMode = () => {
    const newDarkMode = !darkMode;
    setDarkMode(newDarkMode);
    localStorage.setItem('darkMode', newDarkMode);
  };

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

  const handleLogout = () => {
    localStorage.removeItem('token'); // Remove token from localStorage
    setIsAuthenticated(false);
    navigate('/login'); // Redirect to login page
  };

  if (loading) {
    // Show a loading screen while checking authentication state
    return <div>Loading...</div>;
  }

  return (
    <ThemeContext.Provider value={{ darkMode, toggleDarkMode }}>
      <MuiThemeProvider theme={theme}>
        <CssBaseline />
        <Routes>
          {/* Public Route for Login */}
          <Route
            path="/login"
            element={isAuthenticated ? <Navigate to="/dashboard" /> : <Login setIsAuthenticated={setIsAuthenticated} />}
          />

          {/* Protected Routes */}
          <Route
            path="/"
            element={isAuthenticated ? <Layout handleLogout={handleLogout} /> : <Navigate to="/login" />}
          >
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="homes" element={<Homes />} />
            <Route path="clients" element={<Clients />} />
            <Route path="agents" element={<Agents />} />
            <Route path="sales" element={<Sales />} />
            <Route path="reset-password" element={<PasswordReset />} />
          </Route>
        </Routes>
      </MuiThemeProvider>
    </ThemeContext.Provider>
  );
};

export default App;