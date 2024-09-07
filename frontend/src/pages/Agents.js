import React, { useState, useEffect } from 'react';
import { Container, Grid, Card, Typography, Button, TextField } from '@mui/material';
import axios from '../axios';

const Agents = () => {
  const [agents, setAgents] = useState([]);
  const [newAgent, setNewAgent] = useState({ name: '', email: '', password: '' });

  useEffect(() => {
    const fetchAgents = async () => {
      try {
        const res = await axios.get('http://localhost:5001/api/agents', {
          headers: { 'x-auth-token': localStorage.getItem('token') },
        });
        setAgents(res.data);
      } catch (err) {
        console.error('Error fetching agents:', err);
      }
    };

    fetchAgents();
  }, []);

  const handleAddAgent = async () => {
    try {
      await axios.post('http://localhost:5001/api/agents/add', newAgent, {
        headers: { 'x-auth-token': localStorage.getItem('token') },
      });
      setAgents([...agents, newAgent]);
      setNewAgent({ name: '', email: '', password: '' });
    } catch (err) {
      console.error('Error adding agent:', err);
    }
  };

  const handleRemoveAgent = async (id) => {
    try {
      await axios.delete(`http://localhost:5001/api/agents/${id}`, {
        headers: { 'x-auth-token': localStorage.getItem('token') },
      });
      setAgents(agents.filter((agent) => agent._id !== id));
    } catch (err) {
      console.error('Error removing agent:', err);
    }
  };

  return (
    <Container>
      <Typography variant="h4">Agents</Typography>
      <Grid container spacing={3}>
        {agents.map((agent) => (
          <Grid item xs={12} sm={6} md={4} key={agent._id}>
            <Card>
              <Typography variant="h5">{agent.name}</Typography>
              <Typography variant="body1">{agent.email}</Typography>
              <Button onClick={() => handleRemoveAgent(agent._id)} color="secondary">Remove</Button>
            </Card>
          </Grid>
        ))}
      </Grid>
      <Typography variant="h6">Add New Agent</Typography>
      <TextField
        label="Name"
        value={newAgent.name}
        onChange={(e) => setNewAgent({ ...newAgent, name: e.target.value })}
      />
      <TextField
        label="Email"
        value={newAgent.email}
        onChange={(e) => setNewAgent({ ...newAgent, email: e.target.value })}
      />
      <TextField
        label="Password"
        type="password"
        value={newAgent.password}
        onChange={(e) => setNewAgent({ ...newAgent, password: e.target.value })}
      />
      <Button onClick={handleAddAgent} color="primary">Add Agent</Button>
    </Container>
  );
};

export default Agents;