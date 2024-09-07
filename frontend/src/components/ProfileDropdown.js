import React, { useState, useEffect, useContext } from 'react';
import { Menu, MenuItem, IconButton, Avatar, Switch, Typography } from '@mui/material';
import { ThemeContext } from '../ThemeContext';  // Assuming you have a ThemeContext for dark mode
import { useNavigate } from 'react-router-dom';

const ProfileDropdown = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [name, setName] = useState('');
  const { darkMode, toggleDarkMode } = useContext(ThemeContext);  // Assuming ThemeContext manages dark mode
  const navigate = useNavigate();

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

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('name');
    navigate('/login');  // Redirect to login page after logout
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
            onChange={toggleDarkMode}  // Toggle without page reload
            color="primary"
          />
        </MenuItem>

        {/* Logout Option */}
        <MenuItem onClick={handleLogout}>
          <Typography variant="body1">Logout</Typography>
        </MenuItem>
      </Menu>
    </div>
  );
};

export default ProfileDropdown;