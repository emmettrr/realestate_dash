import React from 'react';
import { List, ListItem, ListItemIcon, ListItemText, Drawer } from '@mui/material';
import { Home, Person, Business, AttachMoney } from '@mui/icons-material';
import { Link, useLocation } from 'react-router-dom';
import { Box } from '@mui/system';

const Sidebar = () => {
  const location = useLocation(); // To get the current path and highlight active link

  const sidebarItems = [
    { text: 'Dashboard', icon: <Home />, path: '/dashboard' },
    { text: 'Homes', icon: <Business />, path: '/homes' },
    { text: 'Clients', icon: <Person />, path: '/clients' },
    { text: 'Sales', icon: <AttachMoney />, path: '/sales' },
  ];

  return (
    <Drawer
      variant="permanent"
      sx={{
        width: 240,
        flexShrink: 0,
        [`& .MuiDrawer-paper`]: { width: 240, boxSizing: 'border-box', backgroundColor: '#1e1e2f' },
      }}
    >
      <Box sx={{ padding: 2, color: '#ffffff' }}> {/* Adjusted box color to white for readability */}
        <List>
          {sidebarItems.map((item, index) => (
            <ListItem
              button
              key={index}
              component={Link}
              to={item.path}
              sx={{
                color: location.pathname === item.path ? '#ffffff' : '#a0a0b0', // White for active, muted for inactive
                backgroundColor: location.pathname === item.path ? '#007bff' : 'inherit', // Blue background for active
                '&:hover': {
                  backgroundColor: '#333', // Darker background on hover for better contrast
                },
                '& .MuiListItemIcon-root': {
                  color: '#ffffff', // Icon color set to white
                },
              }}
            >
              <ListItemIcon>{item.icon}</ListItemIcon>
              <ListItemText primary={item.text} />
            </ListItem>
          ))}
        </List>
      </Box>
    </Drawer>
  );
};

export default Sidebar;