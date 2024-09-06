import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Container, Typography, TextField, Button, Table, TableHead, TableBody, TableRow, TableCell, Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material';

const Homes = () => {
  const [homes, setHomes] = useState([]);
  const [selectedHome, setSelectedHome] = useState(null); // Home to edit
  const [editDialogOpen, setEditDialogOpen] = useState(false);

  useEffect(() => {
    const fetchHomes = async () => {
      const res = await axios.get('http://localhost:5000/api/homes', {
        headers: {
          'x-auth-token': localStorage.getItem('token'),
        },
      });
      setHomes(res.data);
    };

    fetchHomes();
  }, []);

  // Handle opening the edit dialog
  const handleEditClick = (home) => {
    setSelectedHome(home);
    setEditDialogOpen(true);
  };

  // Handle closing the dialog
  const handleCloseDialog = () => {
    setSelectedHome(null);
    setEditDialogOpen(false);
  };

  // Handle the change in the form inputs
  const handleInputChange = (e) => {
    setSelectedHome({ ...selectedHome, [e.target.name]: e.target.value });
  };

  // Submit the edited home details
  const handleUpdateHome = async () => {
    try {
      await axios.put(`http://localhost:5000/api/homes/${selectedHome._id}`, selectedHome, {
        headers: {
          'x-auth-token': localStorage.getItem('token'),
        },
      });
      setHomes(homes.map(home => (home._id === selectedHome._id ? selectedHome : home)));
      handleCloseDialog();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <Container>
      <Typography variant="h4" align="center" style={{ margin: '20px 0' }}>
        Homes for Sale
      </Typography>

      {/* Table to Display Homes */}
      <Table style={{ marginTop: '20px' }}>
        <TableHead>
          <TableRow>
            <TableCell>Address</TableCell>
            <TableCell>Price</TableCell>
            <TableCell>Status</TableCell>
            <TableCell>Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {homes.map((home) => (
            <TableRow key={home._id}>
              <TableCell>{home.address}</TableCell>
              <TableCell>${home.price}</TableCell>
              <TableCell>{home.status}</TableCell>
              <TableCell>
                <Button variant="outlined" onClick={() => handleEditClick(home)}>
                  Edit
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      {/* Edit Home Dialog */}
      {selectedHome && (
        <Dialog open={editDialogOpen} onClose={handleCloseDialog}>
          <DialogTitle>Edit Home</DialogTitle>
          <DialogContent>
            <TextField
              label="Address"
              name="address"
              value={selectedHome.address}
              onChange={handleInputChange}
              fullWidth
              margin="normal"
            />
            <TextField
              label="Price"
              name="price"
              value={selectedHome.price}
              onChange={handleInputChange}
              fullWidth
              margin="normal"
            />
            <TextField
              label="Status"
              name="status"
              value={selectedHome.status}
              onChange={handleInputChange}
              fullWidth
              margin="normal"
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCloseDialog}>Cancel</Button>
            <Button onClick={handleUpdateHome} variant="contained" color="primary">
              Update
            </Button>
          </DialogActions>
        </Dialog>
      )}
    </Container>
  );
};

export default Homes;