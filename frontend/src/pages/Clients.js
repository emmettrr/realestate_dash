import React, { useEffect, useState } from 'react';
import { Container, Grid, Card, CardContent, Typography } from '@mui/material';
import axios from 'axios';

const Clients = () => {
  const [clients, setClients] = useState([]);

  useEffect(() => {
    const fetchClients = async () => {
      try {
        const res = await axios.get('http://localhost:5001/api/clients');
        setClients(res.data);
      } catch (error) {
        console.error('Error fetching clients:', error);
      }
    };

    fetchClients();
  }, []);

  return (
    <Container sx={{ marginTop: 4 }}>
      <Typography variant="h5" gutterBottom>Clients</Typography>
      <Grid container spacing={3}>
        {clients.length > 0 ? (
          clients.map((client) => (
            <Grid item xs={12} sm={6} md={4} key={client.id}>
              <Card sx={{ backgroundColor: '#1e1e2f', color: '#ffffff' }}>
                <CardContent>
                  <Typography variant="h6">{client.name}</Typography>
                  <Typography>Email: {client.email}</Typography>
                  <Typography>Status: {client.searchStatus}</Typography>
                </CardContent>
              </Card>
            </Grid>
          ))
        ) : (
          <Typography>No clients found.</Typography>
        )}
      </Grid>
    </Container>
  );
};

export default Clients;