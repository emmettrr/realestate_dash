import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Grid, Card, CardContent, Typography, CardMedia, Button, IconButton, Select, MenuItem, FormControl, InputLabel, TextField } from '@mui/material';
import { Edit, Delete, Done } from '@mui/icons-material';

const Homes = () => {
  const [homes, setHomes] = useState([]);
  const [agents] = useState(['Raoul', 'WC', 'Matt']); // The agents
  const [isAdmin, setIsAdmin] = useState(true); // Simulate admin check
  const [editing, setEditing] = useState({}); // Tracks the edit state for each home
  const [updatedData, setUpdatedData] = useState({}); // Tracks the updated data for each home being edited

  useEffect(() => {
    const fetchHomes = async () => {
      try {
        const res = await axios.get('http://localhost:5001/api/homes');
        setHomes(res.data);
      } catch (error) {
        console.error('Error fetching homes:', error);
      }
    };

    fetchHomes();
  }, []);

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5001/api/homes/${id}`);
      setHomes(homes.filter((home) => home.id !== id));
    } catch (error) {
      console.error('Error deleting home:', error);
    }
  };

  const handleAgentAssign = async (homeId, agent) => {
    try {
      await axios.put(`http://localhost:5001/api/homes/${homeId}/assign-agent`, { agent });
      setHomes(homes.map((home) => (home.id === homeId ? { ...home, agent } : home))); // Update the home in the frontend
      setEditing((prevState) => ({ ...prevState, [homeId]: false })); // Disable editing after assignment
    } catch (error) {
      console.error('Error assigning agent:', error);
    }
  };

  const handleInputChange = (homeId, field, value) => {
    setUpdatedData((prevState) => ({
      ...prevState,
      [homeId]: {
        ...prevState[homeId],
        [field]: value,
      },
    }));
  };

  const handleEditSubmit = async (homeId) => {
    try {
      const data = updatedData[homeId];
      await axios.put(`http://localhost:5001/api/homes/${homeId}/update`, data);
      setHomes(homes.map((home) => (home.id === homeId ? { ...home, ...data } : home))); // Update the home in the frontend
      setEditing((prevState) => ({ ...prevState, [homeId]: false })); // Disable edit mode after successful submission
    } catch (error) {
      console.error('Error updating home:', error);
    }
  };

  const handleFileChange = (homeId, e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onloadend = () => {
      handleInputChange(homeId, 'image', reader.result);
    };
    reader.readAsDataURL(file);
  };

  const toggleEdit = (homeId) => {
    setEditing((prevState) => ({ ...prevState, [homeId]: !prevState[homeId] }));
    setUpdatedData((prevState) => ({
      ...prevState,
      [homeId]: homes.find((home) => home.id === homeId),
    }));
  };

  return (
    <div style={{ padding: '20px' }}>
      <Typography variant="h4" gutterBottom>
        Homes for Sale
      </Typography>
      <Grid container spacing={4}>
        {homes.map((home) => (
          <Grid item xs={12} sm={6} md={4} lg={3} key={home.id}>
            <Card sx={{ maxWidth: 300, backgroundColor: '#1e1e2f', color: '#ffffff' }}>
              <CardMedia
                component="img"
                height="150"
                image={editing[home.id] ? updatedData[home.id]?.image : home.image} // Show updated image in edit mode
                alt={home.name}
                sx={{ borderRadius: '4px', transition: '0.3s ease-in-out', '&:hover': { transform: 'scale(1.05)' } }}
              />
              <CardContent>
                {editing[home.id] ? (
                  <>
                    <TextField
                      label="Name"
                      value={updatedData[home.id]?.name || ''}
                      onChange={(e) => handleInputChange(home.id, 'name', e.target.value)}
                      fullWidth
                      margin="dense"
                      sx={{ input: { color: '#ffffff' }, marginBottom: 2 }}
                    />
                    <TextField
                      label="Price"
                      value={updatedData[home.id]?.price || ''}
                      onChange={(e) => handleInputChange(home.id, 'price', e.target.value)}
                      fullWidth
                      margin="dense"
                      sx={{ input: { color: '#ffffff' }, marginBottom: 2 }}
                    />
                    <TextField
                      label="Address"
                      value={updatedData[home.id]?.address || ''}
                      onChange={(e) => handleInputChange(home.id, 'address', e.target.value)}
                      fullWidth
                      margin="dense"
                      sx={{ input: { color: '#ffffff' }, marginBottom: 2 }}
                    />
                    <TextField
                      label="MLS #"
                      value={updatedData[home.id]?.mls || ''}
                      onChange={(e) => handleInputChange(home.id, 'mls', e.target.value)}
                      fullWidth
                      margin="dense"
                      sx={{ input: { color: '#ffffff' }, marginBottom: 2 }}
                    />
                    <Button
                      variant="contained"
                      component="label"
                      sx={{ marginBottom: 2 }}
                    >
                      Upload Image
                      <input
                        type="file"
                        hidden
                        onChange={(e) => handleFileChange(home.id, e)}
                      />
                    </Button>
                  </>
                ) : (
                  <>
                    <Typography gutterBottom variant="subtitle1" component="div">
                      {home.name}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Price: ${home.price.toLocaleString()}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Address: {home.address}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      MLS #: {home.mls}
                    </Typography>
                  </>
                )}

                {/* Agent Dropdown */}
                {isAdmin && editing[home.id] ? (
                  <FormControl fullWidth sx={{ marginTop: 1 }}>
                    <InputLabel id={`agent-select-label-${home.id}`} sx={{ color: '#ffffff', fontSize: '0.875rem' }}>
                      Assign Agent
                    </InputLabel>
                    <Select
                      labelId={`agent-select-label-${home.id}`}
                      value={updatedData[home.id]?.agent || ''}
                      onChange={(e) => handleInputChange(home.id, 'agent', e.target.value)}
                      sx={{ fontSize: '0.875rem', height: '40px' }}
                    >
                      {agents.map((agent, index) => (
                        <MenuItem key={index} value={agent}>
                          {agent}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                ) : (
                  <Typography variant="body2" color="text.secondary" sx={{ marginTop: 2 }}>
                    Agent: {home.agent || 'Not Assigned'}
                  </Typography>
                )}

                <div style={{ marginTop: '10px', display: 'flex', justifyContent: 'space-between' }}>
                  {editing[home.id] ? (
                    <Button
                      variant="outlined"
                      color="success"
                      startIcon={<Done />}
                      size="small"
                      onClick={() => handleEditSubmit(home.id)} // Save the updated listing and exit edit mode
                      sx={{ fontSize: '0.75rem' }}
                    >
                      Done
                    </Button>
                  ) : (
                    <Button
                      variant="outlined"
                      color="primary"
                      startIcon={<Edit />}
                      size="small"
                      onClick={() => toggleEdit(home.id)} // Enable edit mode
                      sx={{ fontSize: '0.75rem' }}
                    >
                      Edit
                    </Button>
                  )}

                  <IconButton
                    color="error"
                    onClick={() => handleDelete(home.id)}
                    size="small"
                  >
                    <Delete />
                  </IconButton>
                </div>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </div>
  );
};

export default Homes;