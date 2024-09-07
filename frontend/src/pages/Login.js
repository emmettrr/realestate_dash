import React, { useState } from 'react';
import axios from '../axios';
import { useNavigate } from 'react-router-dom';
import { Button, TextField, Typography, Box, Container } from '@mui/material';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:5001/api/auth/login', {
        email,
        password,
      });
  
      // Store token and name in localStorage
      localStorage.setItem('token', res.data.token);
      localStorage.setItem('name', res.data.name);
      localStorage.setItem('role', res.data.role);
  
      // Navigate to dashboard
      navigate('/dashboard');
    } catch (err) {
      if (err.response && err.response.data) {
        setError(err.response.data.message); // Show error message from server
      } else {
        setError('Something went wrong. Please try again.');
      }
      console.error('Login error:', err);
    }
  };

  return (
    <Container
      maxWidth="sm"
      sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100vh' }}
    >
      <Box sx={{ width: '100%', textAlign: 'center', marginBottom: 4 }}>
        <Typography variant="h4" component="h1" sx={{ color: 'text.primary' }}>  {/* Use text color from theme */}
          Login
        </Typography>
      </Box>
      <Box component="form" onSubmit={handleLogin} sx={{ width: '100%' }}>
        <TextField
          label="Email"
          variant="outlined"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          fullWidth
          margin="normal"
          sx={{
            input: { color: 'text.primary' },  // Adapt input color
            label: { color: 'text.secondary' },  // Adapt label color
            backgroundColor: 'background.paper',  // Adapt background
            borderRadius: 1,
          }}
        />
        <TextField
          label="Password"
          variant="outlined"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          fullWidth
          margin="normal"
          sx={{
            input: { color: 'text.primary' },
            label: { color: 'text.secondary' },
            backgroundColor: 'background.paper',
            borderRadius: 1,
          }}
        />
        <Button
          type="submit"
          variant="contained"
          fullWidth
          sx={{
            marginTop: 2,
            padding: '10px',
            backgroundColor: 'primary.main',
            '&:hover': {
              backgroundColor: 'primary.dark',
            },
          }}
        >
          Login
        </Button>
        {error && <Typography color="error" sx={{ marginTop: 2 }}>{error}</Typography>}
      </Box>
    </Container>
  );
};

export default Login;