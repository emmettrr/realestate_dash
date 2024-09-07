import React, { useState } from 'react';
import { Button, TextField, Typography, Container } from '@mui/material';
import axios from '../axios';

const PasswordReset = () => {
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [message, setMessage] = useState('');

  const handlePasswordReset = async () => {
    const token = localStorage.getItem('token');  // Retrieve the token from localStorage

    try {
      const res = await axios.put(
        'http://localhost:5001/api/auth/change-password', 
        { currentPassword, newPassword },
        {
          headers: { Authorization: `Bearer ${token}` }  // Send token in the Authorization header
        }
      );

      setMessage('Password updated successfully!');
    } catch (err) {
      setMessage('Error updating password: ' + err.response?.data?.message || 'Unknown error');
    }
  };

  return (
    <Container maxWidth="sm" sx={{ textAlign: 'center', marginTop: '100px' }}>
      <Typography variant="h4" gutterBottom>Reset Password</Typography>

      <TextField
        label="Current Password"
        variant="outlined"
        type="password"
        fullWidth
        margin="normal"
        value={currentPassword}
        onChange={(e) => setCurrentPassword(e.target.value)}
      />

      <TextField
        label="New Password"
        variant="outlined"
        type="password"
        fullWidth
        margin="normal"
        value={newPassword}
        onChange={(e) => setNewPassword(e.target.value)}
      />

      <Button
        variant="contained"
        color="primary"
        fullWidth
        sx={{ marginTop: 2 }}
        onClick={handlePasswordReset}
      >
        Reset Password
      </Button>

      {message && <Typography sx={{ marginTop: 2 }}>{message}</Typography>}
    </Container>
  );
};

export default PasswordReset;