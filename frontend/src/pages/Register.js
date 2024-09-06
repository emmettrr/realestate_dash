import React, { useState } from 'react';
import axios from 'axios';
import { Container, TextField, Button, Typography, Select, MenuItem } from '@mui/material';

const Register = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    role: '',
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:5001/api/auth/register', formData, {
        headers: {
          'x-auth-token': localStorage.getItem('token'), // Admin authentication
        },
      });
      setSuccess('Account created successfully');
      setFormData({ name: '', email: '', password: '', role: '' });
      setError('');
    } catch (err) {
      if (err.response && err.response.status === 400) {
        setError(err.response.data.message); // Show the exact error message from the backend
      } else {
        setError('Failed to create account. Please try again.');
      }
      setSuccess('');
    }
  };

  return (
    <Container maxWidth="sm" style={{ marginTop: '100px' }}>
      <Typography variant="h4" align="center">Register New User</Typography>
      {error && <Typography color="error">{error}</Typography>}
      {success && <Typography color="primary">{success}</Typography>}
      <form onSubmit={handleRegister}>
        <TextField
          label="Name"
          name="name"
          value={formData.name}
          onChange={handleInputChange}
          fullWidth
          margin="normal"
        />
        <TextField
          label="Email"
          name="email"
          value={formData.email}
          onChange={handleInputChange}
          fullWidth
          margin="normal"
        />
        <TextField
          label="Password"
          name="password"
          type="password"
          value={formData.password}
          onChange={handleInputChange}
          fullWidth
          margin="normal"
        />
        <Select
          name="role"
          value={formData.role}
          onChange={handleInputChange}
          displayEmpty
          fullWidth
          margin="normal"
        >
          <MenuItem value="">Select Role</MenuItem>
          <MenuItem value="admin">Admin</MenuItem>
          <MenuItem value="agent">Agent</MenuItem>
        </Select>
        <Button type="submit" variant="contained" color="primary" fullWidth style={{ marginTop: '20px' }}>
          Register
        </Button>
      </form>
    </Container>
  );
};

export default Register;