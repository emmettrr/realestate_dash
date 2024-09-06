import React from 'react';
import { AppBar, Toolbar, Typography, IconButton, Avatar } from '@mui/material';
import { AccountCircle } from '@mui/icons-material';

const Header = () => {
  return (
    <AppBar position="fixed" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}>
      <Toolbar>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          Real Estate Dashboard
        </Typography>
        <IconButton color="inherit">
          <Avatar alt="User Profile" />
        </IconButton>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
