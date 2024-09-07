import React, { useState, useEffect } from 'react';
import { Avatar, Switch, Typography, Container } from '@mui/material';

const Profile = () => {
  const [darkMode, setDarkMode] = useState(localStorage.getItem('darkMode') === 'true');
  const [name, setName] = useState('');

  useEffect(() => {
    const userName = localStorage.getItem('name');
    if (userName) {
      setName(userName);
    }
  }, []);

  const handleDarkModeToggle = () => {
    setDarkMode(!darkMode);
    localStorage.setItem('darkMode', !darkMode);
    window.location.reload(); // Reload the page to apply the theme
  };

  return (
    <Container sx={{ textAlign: 'center', marginTop: 4 }}>
      <Avatar sx={{ width: 100, height: 100, margin: '0 auto', backgroundColor: '#007bff' }} />
      <Typography variant="h5" gutterBottom>{name}</Typography>

      {/* Dark Mode Toggle */}
      <div style={{ marginTop: 20 }}>
        <Typography variant="h6">Dark Mode</Typography>
        <Switch
          checked={darkMode}
          onChange={handleDarkModeToggle}
          color="primary"
        />
      </div>
    </Container>
  );
};

export default Profile;