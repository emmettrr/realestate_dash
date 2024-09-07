import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { TextField, Button, Container, CircularProgress, MenuItem } from '@mui/material';
import axios from '../axios';

const EditHome = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [home, setHome] = useState(null);
  const [agents, setAgents] = useState([]);

  useEffect(() => {
    const fetchHome = async () => {
      const res = await axios.get(`http://localhost:5001/api/homes/${id}`);
      setHome(res.data);
    };

    const fetchAgents = async () => {
      const res = await axios.get('http://localhost:5001/api/agents');
      setAgents(res.data);
    };

    fetchHome();
    fetchAgents();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`http://localhost:5001/api/homes/${id}`, home);
      navigate('/');
    } catch (err) {
      console.error(err);
    }
  };

  const handleChange = (e) => {
    setHome({ ...home, [e.target.name]: e.target.value });
  };

  if (!home || !agents.length) {
    return <CircularProgress />;
  }

  return (
    <Container>
      <form onSubmit={handleSubmit}>
        <TextField
          label="Name"
          name="name"
          value={home.name}
          onChange={handleChange}
          fullWidth
          margin="normal"
        />
        <TextField
          label="Price"
          name="price"
          value={home.price}
          onChange={handleChange}
          fullWidth
          margin="normal"
          type="number"
        />
        <TextField
          label="Address"
          name="address"
          value={home.address}
          onChange={handleChange}
          fullWidth
          margin="normal"
        />
        <TextField
          select
          label="Assign Agent"
          name="agentId"
          value={home.agentId}
          onChange={handleChange}
          fullWidth
          margin="normal"
        >
          {agents.map((agent) => (
            <MenuItem key={agent.id} value={agent.id}>
              {agent.name}
            </MenuItem>
          ))}
        </TextField>
        <Button type="submit" variant="contained" color="primary" fullWidth sx={{ marginTop: 2 }}>
          Save Changes
        </Button>
      </form>
    </Container>
  );
};

export default EditHome;