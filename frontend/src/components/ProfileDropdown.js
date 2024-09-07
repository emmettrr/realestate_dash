import React, { useState, useEffect } from 'react';
import { Menu, MenuItem, IconButton, Avatar, Switch, Typography } from '@mui/material';

const ProfileDropdown = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [darkMode, setDarkMode] = useState(localStorage.getItem('darkMode') === 'true');
  const [name, setName] = useState('');

  useEffect(() => {
    const userName = localStorage.getItem('name');
    if (userName) {
      setName(userName);
    }
  }, []);

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleDarkModeToggle = () => {
    const newDarkMode = !darkMode;
    setDarkMode(newDarkMode);
    localStorage.setItem('darkMode', newDarkMode);
    // Apply theme changes by reloading, but do not route to login
    window.location.reload();
  };

  return (
    <div>
      <IconButton onClick={handleMenuOpen}>
        <Avatar
          alt={name}
          src="path_to_profile_image.jpg"  // Optionally add profile image URL
          sx={{ width: 50, height: 50 }}
        />
      </IconButton>

      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleMenuClose}
        sx={{ mt: 1.5 }}
      >
        <MenuItem disabled>
          <Typography variant="h6">{name}</Typography>
        </MenuItem>

        {/* Dark Mode Toggle */}
        <MenuItem>
          <Typography variant="body1">Dark Mode</Typography>
          <Switch
            checked={darkMode}
            onChange={handleDarkModeToggle}
            color="primary"
          />
        </MenuItem>

        {/* Logout Option */}
        <MenuItem>
          <Typography variant="body1">Logout</Typography>
        </MenuItem>
      </Menu>
    </div>
  );
};

export default ProfileDropdown;