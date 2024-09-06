import React from 'react';
import { Drawer, List, ListItem, ListItemIcon, ListItemText } from '@mui/material';
import { Dashboard, Home, People, MonetizationOn } from '@mui/icons-material';
import { Link } from 'react-router-dom';

const Sidebar = () => {
  return (
    <Drawer variant="permanent">
      <List>
        <ListItem button component={Link} to="/dashboard">
          <ListItemIcon><Dashboard /></ListItemIcon>
          <ListItemText primary="Dashboard" />
        </ListItem>
        <ListItem button component={Link} to="/homes">
          <ListItemIcon><Home /></ListItemIcon>
          <ListItemText primary="Homes" />
        </ListItem>
        <ListItem button component={Link} to="/clients">
          <ListItemIcon><People /></ListItemIcon>
          <ListItemText primary="Clients" />
        </ListItem>
        <ListItem button component={Link} to="/sales">
          <ListItemIcon><MonetizationOn /></ListItemIcon>
          <ListItemText primary="Sales" />
        </ListItem>
      </List>
    </Drawer>
  );
};

export default Sidebar;