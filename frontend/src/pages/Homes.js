import React, { useState, useEffect } from 'react';
import { Container, Grid, Card, CardContent, Typography, IconButton, TextField, Select, MenuItem } from '@mui/material';
import { Edit, Save, Cancel } from '@mui/icons-material';
import axios from '../axios';

const agents = ['Raoul', 'WC', 'Matt'];

const Homes = () => {
  const [homes, setHomes] = useState([]);
  const [editMode, setEditMode] = useState(null); // Tracks which home is being edited
  const [editedHome, setEditedHome] = useState({});
  const [selectedImage, setSelectedImage] = useState(null);
  const [errorMessage, setErrorMessage] = useState('');  // Error message for feedback

  useEffect(() => {
    const fetchHomes = async () => {
      try {
        const res = await axios.get('http://localhost:5001/api/homes');
        setHomes(res.data);
      } catch (err) {
        console.error('Error fetching homes:', err);
      }
    };
    fetchHomes();
  }, []);

  const handleEdit = (home) => {
    setEditMode(home._id);  // Enter edit mode for the specific home
    setEditedHome({ ...home });  // Clone the home data for editing
    setSelectedImage(null);  // Reset image selection on edit
  };

  const handleSave = async (id) => {
    try {
      let updatedHome = { ...editedHome };
  
      if (selectedImage) {
        // Upload the selected image
        const formData = new FormData();
        formData.append('image', selectedImage);
        const uploadRes = await axios.post('http://localhost:5001/api/homes/upload', formData, {
          headers: { 
            'Content-Type': 'multipart/form-data',
            'x-auth-token': localStorage.getItem('token') // Include the token
          }
        });
        updatedHome.image = uploadRes.data.filePath;  // Set the image URL in the home data
      }
  
      // Send the updated home details to the backend
      await axios.put(`http://localhost:5001/api/homes/${id}/update`, updatedHome, {
        headers: {
          'x-auth-token': localStorage.getItem('token'),  // Include the token in headers
        }
      });
  
      // Update the homes state with the new changes
      const updatedHomes = homes.map((home) => 
        home._id === id ? { ...updatedHome } : home
      );
      setHomes(updatedHomes);  // Save updated homes to state
      setEditMode(null);  // Exit edit mode
      setEditedHome({});  // Clear edited home state
      setErrorMessage('');  // Clear any previous error message
    } catch (err) {
      console.error('Error saving home:', err);
      setErrorMessage('Failed to save changes. Please try again.');
    }
  };
  

  const handleCancel = () => {
    setEditMode(null);  // Exit edit mode without saving
    setEditedHome({});  // Clear the edited home data
    setErrorMessage('');  // Clear error message
  };

  const handleAgentAssign = (event) => {
    const { value } = event.target;
    setEditedHome((prev) => ({
      ...prev,
      agent: value,
    }));
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditedHome((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleImageChange = (e) => {
    setSelectedImage(e.target.files[0]);  // Store the selected image
  };

  return (
    <Container>
      {errorMessage && (
        <Typography color="error" variant="body1" sx={{ mb: 2 }}>
          {errorMessage}
        </Typography>
      )}
      <Grid container spacing={3}>
        {homes.length === 0 ? (
          <Typography variant="h6">No homes available.</Typography>
        ) : (
          homes.map((home) => (
            <Grid item xs={12} sm={6} md={4} key={home._id}>
              <Card>
                <CardContent>
                  {editMode === home._id ? (
                    <>
                      <TextField
                        label="Home Name"
                        value={editedHome.name || ''}
                        name="name"
                        onChange={handleInputChange}
                        fullWidth
                        margin="normal"
                      />
                      <TextField
                        label="Price"
                        value={editedHome.price || ''}
                        name="price"
                        onChange={handleInputChange}
                        fullWidth
                        margin="normal"
                      />
                      <TextField
                        label="Address"
                        value={editedHome.address || ''}
                        name="address"
                        onChange={handleInputChange}
                        fullWidth
                        margin="normal"
                      />
                      <Select
                        label="Agent"
                        value={editedHome.agent || ''}
                        onChange={handleAgentAssign}
                        fullWidth
                        margin="normal"
                      >
                        <MenuItem value="">Unassigned</MenuItem>
                        {agents.map((agent) => (
                          <MenuItem key={agent} value={agent}>
                            {agent}
                          </MenuItem>
                        ))}
                      </Select>
                      <input type="file" onChange={handleImageChange} accept="image/*" />
                      <IconButton onClick={() => handleSave(home._id)} color="primary">
                        <Save />
                      </IconButton>
                      <IconButton onClick={handleCancel} color="secondary">
                        <Cancel />
                      </IconButton>
                    </>
                  ) : (
                    <>
                      <Typography variant="h5">{home.name}</Typography>
                      <Typography variant="body1">Price: ${home.price}</Typography>
                      <Typography variant="body1">Address: {home.address}</Typography>
                      <Typography variant="body1">Agent: {home.agent || 'Unassigned'}</Typography>
                      {home.image && (
                        <img
                          src={home.image}
                          alt={home.name}
                          style={{ width: '100%', height: 'auto' }}
                        />
                      )}
                      <IconButton onClick={() => handleEdit(home)} color="primary">
                        <Edit />
                      </IconButton>
                    </>
                  )}
                </CardContent>
              </Card>
            </Grid>
          ))
        )}
      </Grid>
    </Container>
  );
};

export default Homes;