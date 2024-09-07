import React, { useEffect, useState } from 'react';
import { Outlet } from 'react-router-dom'; // Used to render nested routes
import Sidebar from './Sidebar'; // Sidebar component
import ProfileDropdown from './ProfileDropdown'; // Profile Dropdown component
import { Box } from '@mui/material';

const Layout = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userRole, setUserRole] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem('token'); // Check for authentication token
    const roleFromLocalStorage = localStorage.getItem('role'); // Get role from localStorage
    
    if (token) {
      setIsAuthenticated(true);
    }
    
    if (roleFromLocalStorage) {
      setUserRole(roleFromLocalStorage);
    }
  }, []);

  return (
    <Box sx={{ display: 'flex', position: 'relative' }}>
      {/* Sidebar */}
      <Sidebar isAuthenticated={isAuthenticated} userRole={userRole} />

      {/* Main content area */}
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        {/* ProfileDropdown visible on all pages */}
        {isAuthenticated && (
          <Box
            sx={{
              position: 'fixed', // fixed to stay in place
              top: 20,
              right: 20,
              zIndex: 1300, // Ensure it's above other elements
            }}
          >
            <ProfileDropdown />
          </Box>
        )}

        {/* Main content (renders the current route's content) */}
        <Outlet />
      </Box>
    </Box>
  );
};

export default Layout;