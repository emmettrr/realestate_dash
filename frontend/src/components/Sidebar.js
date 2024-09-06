import React, { useState } from 'react';
import { Drawer, List, ListItem, ListItemIcon, ListItemText, IconButton, Divider } from '@mui/material';
import { Home, Group, Business, Menu } from '@mui/icons-material';
import { Link } from 'react-router-dom';

const Sidebar = () => {
  const [open, setOpen] = useState(true);

  const toggleDrawer = () => {
    setOpen(!open);
  };

  return (
    <>
      <IconButton
        edge="start"
        color="inherit"
        aria-label="menu"
        onClick={toggleDrawer}
        sx={{ marginLeft: 2, marginTop: 1 }}
      >
        <Menu />
      </IconButton>
      <Drawer variant="persistent" open={open} sx={{ width: open ? 240 : 60 }}>
        <List>
          <ListItem button component={Link} to="/">
            <ListItemIcon>
              <Home />
            </ListItemIcon>
            <ListItemText primary="Dashboard" />
          </ListItem>
          <ListItem button component={Link} to="/homes">
            <ListItemIcon>
              <Business />
            </ListItemIcon>
            <ListItemText primary="Homes" />
          </ListItem>
          <ListItem button component={Link} to="/clients">
            <ListItemIcon>
              <Group />
            </ListItemIcon>
            <ListItemText primary="Clients" />
          </ListItem>
        </List>
        <Divider />
      </Drawer>
    </>
  );
};

export default Sidebar;