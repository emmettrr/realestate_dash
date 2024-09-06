import React, { useEffect, useState } from 'react';
import { Container, Grid, Card, CardContent, Typography, CircularProgress, CardMedia, Button, IconButton } from '@mui/material';
import { Edit, Delete } from '@mui/icons-material';
import axios from 'axios';
import { Link } from 'react-router-dom';

const Dashboard = () => {
  const [homes, setHomes] = useState([]);
  const [prospectiveHomes, setProspectiveHomes] = useState([]);
  const [prospectiveClients, setProspectiveClients] = useState([]);
  const [stats, setStats] = useState(null);
  const [isAdmin, setIsAdmin] = useState(true);  // Assuming admin access for now
  const [loading, setLoading] = useState(true);  // Add loading state
  const [error, setError] = useState('');        // Add error state

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [homesRes, prospectiveHomesRes, prospectiveClientsRes, statsRes] = await Promise.all([
          axios.get('http://localhost:5001/api/homes'),
          axios.get('http://localhost:5001/api/prospective-homes'),
          axios.get('http://localhost:5001/api/prospective-clients'),
          axios.get('http://localhost:5001/api/stats')
        ]);

        setHomes(homesRes.data);
        setProspectiveHomes(prospectiveHomesRes.data);
        setProspectiveClients(prospectiveClientsRes.data);
        setStats(statsRes.data);
        setLoading(false);  // Stop loading once data is fetched
      } catch (err) {
        console.error(err);
        setError('Failed to load data. Please try again later.');
        setLoading(false);  // Stop loading even if there's an error
      }
    };

    fetchData();
  }, []);

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5001/api/homes/${id}`);
      setHomes(homes.filter(home => home.id !== id));
    } catch (err) {
      console.error(err);
    }
  };

  if (loading) {
    return <CircularProgress />;  // Show loading spinner while data is being fetched
  }

  if (error) {
    return <Typography variant="h6" color="error">{error}</Typography>;  // Show error message if there's an error
  }

  return (
    <Container>
      <Grid container spacing={3}>
        {/* Metrics Section */}
        {stats && (
          <>
            <Grid item xs={12} sm={4}>
              <Card>
                <CardContent>
                  <Typography variant="h5">Total Properties</Typography>
                  <Typography variant="h4">{stats.totalProperties}</Typography>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={12} sm={4}>
              <Card>
                <CardContent>
                  <Typography variant="h5">Total Clients</Typography>
                  <Typography variant="h4">{stats.totalClients}</Typography>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={12} sm={4}>
              <Card>
                <CardContent>
                  <Typography variant="h5">Deals Closed</Typography>
                  <Typography variant="h4">{stats.dealsClosed}</Typography>
                </CardContent>
              </Card>
            </Grid>
          </>
        )}

        {/* Homes/Lots for Sale */}
        <Grid item xs={12}>
          <Typography variant="h5" gutterBottom>Homes/Lots for Sale</Typography>
          <Grid container spacing={3}>
            {homes.map((home) => (
              <Grid item xs={12} sm={6} md={4} key={home.id}>
                <Card>
                  <CardMedia
                    component="img"
                    height="140"
                    image={home.image}
                    alt={home.name}
                  />
                  <CardContent>
                    <Typography variant="h6">{home.name}</Typography>
                    <Typography>Price: ${home.price.toLocaleString()}</Typography>
                    <Typography>Address: {home.address}</Typography>
                    <Typography>Agent: {home.agent.name}</Typography>

                    {isAdmin && (
                      <>
                        <Button
                          component={Link}
                          to={`/edit-home/${home.id}`}
                          variant="contained"
                          color="primary"
                          startIcon={<Edit />}
                          sx={{ marginTop: 1 }}
                        >
                          Edit
                        </Button>
                        <IconButton
                          color="error"
                          onClick={() => handleDelete(home.id)}
                          sx={{ marginLeft: 2 }}
                        >
                          <Delete />
                        </IconButton>
                      </>
                    )}
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Grid>

        {/* Prospective Homes/Lots */}
        <Grid item xs={12} sx={{ marginTop: 4 }}>
          <Typography variant="h5" gutterBottom>Prospective Homes/Lots</Typography>
          <Grid container spacing={3}>
            {prospectiveHomes.map((home) => (
              <Grid item xs={12} sm={6} md={4} key={home.id}>
                <Card>
                  <CardContent>
                    <Typography variant="h6">{home.name}</Typography>
                    <Typography>Estimated Price: ${home.estimatedPrice.toLocaleString()}</Typography>
                    <Typography>Location: {home.location}</Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Grid>

        {/* Prospective Clients */}
        <Grid item xs={12} sx={{ marginTop: 4 }}>
          <Typography variant="h5" gutterBottom>Prospective Clients</Typography>
          <Grid container spacing={3}>
            {prospectiveClients.map((client) => (
              <Grid item xs={12} sm={6} md={4} key={client.id}>
                <Card>
                  <CardContent>
                    <Typography variant="h6">{client.name}</Typography>
                    <Typography>Email: {client.email}</Typography>
                    <Typography>Interested In: {client.interestedIn}</Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Grid>
      </Grid>
    </Container>
  );
};

export default Dashboard;