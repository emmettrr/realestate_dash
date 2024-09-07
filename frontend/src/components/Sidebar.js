import React, { useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { List, ListItem, ListItemText, Drawer, Toolbar, Typography, Divider, ListItemIcon } from '@mui/material';
import HomeIcon from '@mui/icons-material/Home';
import BusinessIcon from '@mui/icons-material/Business';
import GroupIcon from '@mui/icons-material/Group';
import MonetizationOnIcon from '@mui/icons-material/MonetizationOn';
import PersonIcon from '@mui/icons-material/Person';

const Sidebar = ({ isAuthenticated, userRole }) => {
  const location = useLocation();

  useEffect(() => {
    // Debugging info to verify role and authentication status
    console.log("isAuthenticated: ", isAuthenticated);
    console.log("userRole: ", userRole);
  }, [isAuthenticated, userRole]);

  const menuItems = [
    { text: 'Dashboard', path: '/dashboard', icon: <HomeIcon /> },
    { text: 'Homes', path: '/homes', icon: <BusinessIcon /> },
    { text: 'Clients', path: '/clients', icon: <GroupIcon /> },
    { text: 'Sales', path: '/sales', icon: <MonetizationOnIcon /> },
  ];

  // Only show Agents for admins
  if (isAuthenticated && userRole === 'admin') {
    menuItems.push({ text: 'Agents', path: '/agents', icon: <PersonIcon /> });
  }

  return (
    <Drawer
      variant="permanent"
      sx={{
        width: 240,
        flexShrink: 0,
        [`& .MuiDrawer-paper`]: { width: 240, boxSizing: 'border-box', backgroundColor: '#1d1e2c', color: '#ffffff' },
      }}
    >
      <Toolbar>
        <Typography variant="h6" noWrap component="div">
          Dashboard
        </Typography>
      </Toolbar>
      <Divider />
      <List>
        {menuItems.map((item) => (
          <ListItem
            button
            key={item.text}
            component={Link}
            to={item.path}
            selected={location.pathname === item.path}
            sx={{
              '&.Mui-selected': {
                backgroundColor: '#007bff',
                '&:hover': {
                  backgroundColor: '#006bb3',
                },
              },
              '&:hover': {
                backgroundColor: '#555a75',
              },
              color: '#ffffff',
            }}
          >
            <ListItemIcon sx={{ color: '#ffffff' }}>
              {item.icon}
            </ListItemIcon>
            <ListItemText primary={item.text} />
          </ListItem>
        ))}
      </List>
    </Drawer>
  );
};

export default Sidebar;