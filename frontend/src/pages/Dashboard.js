import React, { useEffect, useState } from 'react';
import { Container, Grid, Card, CardContent, Typography, Button, Select, MenuItem } from '@mui/material';
import axios from '../axios';
import Sidebar from '../components/Sidebar';

const Dashboard = () => {
  const [homes, setHomes] = useState([]);
  const [lots, setLots] = useState([]);
  const [interestedClients, setInterestedClients] = useState([]);
  const [agents, setAgents] = useState([]);  // List of available agents
  const [isAdmin, setIsAdmin] = useState(false);  // Assume a way to check if the user is an admin

  useEffect(() => {
    const fetchData = async () => {
      try {
        const homesRes = await axios.get('http://localhost:5001/api/homes');
        const lotsRes = await axios.get('http://localhost:5001/api/lots');
        const clientsRes = await axios.get('http://localhost:5001/api/interested-clients');
        const agentsRes = await axios.get('http://localhost:5001/api/agents');  // Fetch agents

        setHomes(homesRes.data);
        setLots(lotsRes.data);
        setInterestedClients(clientsRes.data);
        setAgents(agentsRes.data);

        // Check if the user is an admin (you can fetch this from API or check from token)
        const token = localStorage.getItem('token');
        if (token) {
          // Assuming you store role in the token or user data
          const userRole = JSON.parse(atob(token.split('.')[1])).role;
          setIsAdmin(userRole === 'admin');
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  // Function to handle assigning an agent to a property
  const handleAssignAgent = async (propertyId, agentId, propertyType) => {
    try {
      await axios.post(`http://localhost:5001/api/properties/assign-agent`, {
        propertyId,
        agentId,
        propertyType
      });
      alert('Agent assigned successfully');
    } catch (error) {
      console.error('Error assigning agent:', error);
      alert('Error assigning agent');
    }
  };

  return (
    <div style={{ display: 'flex' }}>
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content Area */}
      <div style={{ flexGrow: 1, padding: '20px', position: 'relative' }}>

        <Container>
          {/* Properties for Sale Section */}
          <Typography variant="h5" gutterBottom>Properties for Sale (Homes & Lots)</Typography>
          <Grid container spacing={3}>
            {homes.map((home) => (
              <Grid item xs={12} sm={6} md={4} key={home.id}>
                <Card sx={{ backgroundColor: '#1e1e2f', color: '#ffffff' }}>
                  <CardContent>
                    <Typography variant="h6">{home.name}</Typography>
                    <Typography>Price: ${home.price.toLocaleString()}</Typography>
                    <Typography>Address: {home.address}</Typography>

                    {/* Show Assign Agent Option if user is an Admin */}
                    {isAdmin && (
                      <>
                        <Typography variant="body1" sx={{ marginTop: 2 }}>Assign Agent</Typography>
                        <Select
                          defaultValue=""
                          onChange={(e) => handleAssignAgent(home.id, e.target.value, 'home')}
                          displayEmpty
                          fullWidth
                        >
                          <MenuItem value="" disabled>Select Agent</MenuItem>
                          {agents.map((agent) => (
                            <MenuItem key={agent.id} value={agent.id}>
                              {agent.name}
                            </MenuItem>
                          ))}
                        </Select>
                      </>
                    )}
                  </CardContent>
                </Card>
              </Grid>
            ))}
            {lots.map((lot) => (
              <Grid item xs={12} sm={6} md={4} key={lot.id}>
                <Card sx={{ backgroundColor: '#1e1e2f', color: '#ffffff' }}>
                  <CardContent>
                    <Typography variant="h6">{lot.name}</Typography>
                    <Typography>Price: ${lot.price.toLocaleString()}</Typography>
                    <Typography>Location: {lot.location}</Typography>

                    {/* Show Assign Agent Option if user is an Admin */}
                    {isAdmin && (
                      <>
                        <Typography variant="body1" sx={{ marginTop: 2 }}>Assign Agent</Typography>
                        <Select
                          defaultValue=""
                          onChange={(e) => handleAssignAgent(lot.id, e.target.value, 'lot')}
                          displayEmpty
                          fullWidth
                        >
                          <MenuItem value="" disabled>Select Agent</MenuItem>
                          {agents.map((agent) => (
                            <MenuItem key={agent.id} value={agent.id}>
                              {agent.name}
                            </MenuItem>
                          ))}
                        </Select>
                      </>
                    )}
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>

          {/* Interested Clients Section */}
          <Typography variant="h5" sx={{ marginTop: 4 }}>Interested Clients</Typography>
          {interestedClients.length > 0 ? (
            <Grid container spacing={3}>
              {interestedClients.map((client) => (
                <Grid item xs={12} sm={6} md={4} key={client.id}>
                  <Card sx={{ backgroundColor: '#1e1e2f', color: '#ffffff' }}>
                    <CardContent>
                      <Typography variant="h6">{client.name}</Typography>
                      <Typography>Email: {client.email}</Typography>
                      <Typography>Interested in: {client.interestedIn}</Typography>
                    </CardContent>
                  </Card>
                </Grid>
              ))}
            </Grid>
          ) : (
            <Typography>No clients are currently interested in any properties.</Typography>
          )}
        </Container>
      </div>
    </div>
  );
};

export default Dashboard;