import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Container, Typography, TextField, Button, Table, TableHead, TableBody, TableRow, TableCell, Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material';

const Clients = () => {
  const [clients, setClients] = useState([]);
  const [selectedClient, setSelectedClient] = useState(null); // Client to edit
  const [editDialogOpen, setEditDialogOpen] = useState(false);

  useEffect(() => {
    const fetchClients = async () => {
      const res = await axios.get('http://localhost:5001/api/clients', {
        headers: {
          'x-auth-token': localStorage.getItem('token'),
        },
      });
      setClients(res.data);
    };

    fetchClients();
  }, []);

  // Handle opening the edit dialog
  const handleEditClick = (client) => {
    setSelectedClient(client);
    setEditDialogOpen(true);
  };

  // Handle closing the dialog
  const handleCloseDialog = () => {
    setSelectedClient(null);
    setEditDialogOpen(false);
  };

  // Handle the change in the form inputs
  const handleInputChange = (e) => {
    setSelectedClient({ ...selectedClient, [e.target.name]: e.target.value });
  };

  // Submit the edited client details
  const handleUpdateClient = async () => {
    try {
      await axios.put(`http://localhost:5001/api/clients/${selectedClient._id}`, selectedClient, {
        headers: {
          'x-auth-token': localStorage.getItem('token'),
        },
      });
      setClients(clients.map(client => (client._id === selectedClient._id ? selectedClient : client)));
      handleCloseDialog();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <Container>
      <Typography variant="h4" align="center" style={{ margin: '20px 0' }}>
        Interested Clients
      </Typography>

      {/* Table to Display Clients */}
      <Table style={{ marginTop: '20px' }}>
        <TableHead>
          <TableRow>
            <TableCell>Name</TableCell>
            <TableCell>Email</TableCell>
            <TableCell>Phone</TableCell>
            <TableCell>Status</TableCell>
            <TableCell>Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {clients.map((client) => (
            <TableRow key={client._id}>
              <TableCell>{client.name}</TableCell>
              <TableCell>{client.email}</TableCell>
              <TableCell>{client.phone}</TableCell>
              <TableCell>{client.status}</TableCell>
              <TableCell>
                <Button variant="outlined" onClick={() => handleEditClick(client)}>
                  Edit
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      {/* Edit Client Dialog */}
      {selectedClient && (
        <Dialog open={editDialogOpen} onClose={handleCloseDialog}>
          <DialogTitle>Edit Client</DialogTitle>
          <DialogContent>
            <TextField
              label="Name"
              name="name"
              value={selectedClient.name}
              onChange={handleInputChange}
              fullWidth
              margin="normal"
            />
            <TextField
              label="Email"
              name="email"
              value={selectedClient.email}
              onChange={handleInputChange}
              fullWidth
              margin="normal"
            />
            <TextField
              label="Phone"
              name="phone"
              value={selectedClient.phone}
              onChange={handleInputChange}
              fullWidth
              margin="normal"
            />
            <TextField
              label="Status"
              name="status"
              value={selectedClient.status}
              onChange={handleInputChange}
              fullWidth
              margin="normal"
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCloseDialog}>Cancel</Button>
            <Button onClick={handleUpdateClient} variant="contained" color="primary">
              Update
            </Button>
          </DialogActions>
        </Dialog>
      )}
    </Container>
  );
};

export default Clients;