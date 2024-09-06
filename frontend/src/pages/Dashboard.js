import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Container, Grid, Card, CardMedia, CardContent, Typography } from '@mui/material';

const Dashboard = () => {
  const [homes, setHomes] = useState([]);

  useEffect(() => {
    // Fetch homes data from backend
    const fetchHomes = async () => {
      try {
        const res = await axios.get('http://localhost:5001/api/homes');
        setHomes(res.data);
      } catch (err) {
        console.error(err);
      }
    };

    fetchHomes();
  }, []);

  return (
    <Container>
      <Typography variant="h4" gutterBottom>Homes Dashboard</Typography>
      <Grid container spacing={3}>
        {homes.map((home) => (
          <Grid item xs={12} sm={6} md={4} key={home.id}>
            <Card>
              <CardMedia
                component="img"
                height="140"
                image={home.image}  // Replace with actual image path
                alt={home.name}
              />
              <CardContent>
                <Typography variant="h5">{home.name}</Typography>
                <Typography>Location: {home.location}</Typography>
                <Typography>Price: ${home.price.toLocaleString()}</Typography>
                <Typography>Status: {home.status}</Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default Dashboard;