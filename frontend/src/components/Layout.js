import React from 'react';
import { Outlet } from 'react-router-dom'; // Used to render nested routes
import Sidebar from './Sidebar'; // Sidebar component
import { Box } from '@mui/material';

const Layout = () => {
  return (
    <Box sx={{ display: 'flex' }}>
      {/* Sidebar is rendered here */}
      <Sidebar />
      
      {/* Main content area */}
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <Outlet />  {/* Renders the current route's content */}
      </Box>
    </Box>
  );
};

export default Layout;