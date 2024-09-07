import React, { useState, useEffect } from 'react';
import { Container, Grid, Card, CardContent, Typography, Button, Select, MenuItem, IconButton, TextField } from '@mui/material';
import { Edit, Save, Cancel } from '@mui/icons-material';
import axios from 'axios';

const agents = ['Raoul', 'WC', 'Matt'];

const Lots = () => {
  const [lots, setLots] = useState([]);
  const [editMode, setEditMode] = useState(null); // Tracks the lot being edited
  const [editedLot, setEditedLot] = useState({});
  const [selectedImage, setSelectedImage] = useState(null);

  useEffect(() => {
    // Fetch lots from the API
    const fetchLots = async () => {
      try {
        const res = await axios.get('http://localhost:5001/api/lots');
        setLots(res.data);  // Make sure lots data is fetched
      } catch (err) {
        console.error('Error fetching lots:', err);
      }
    };

    fetchLots();
  }, []);

  const handleEdit = (lot) => {
    setEditMode(lot._id);  // Enter edit mode for the specific lot
    setEditedLot({ ...lot });  // Clone the lot data to be edited
    setSelectedImage(null); // Reset the selected image on each edit
  };

  const handleSave = async (id) => {
    try {
      if (selectedImage) {
        // Upload the selected image
        const formData = new FormData();
        formData.append('image', selectedImage);
        const uploadRes = await axios.post('http://localhost:5001/api/lots/upload', formData, {
          headers: { 'Content-Type': 'multipart/form-data' }
        });
        editedLot.image = uploadRes.data.filePath; // Set the image URL in the lot data
      }

      // Send the updated lot details to the backend
      await axios.put(`http://localhost:5001/api/lots/${id}/update`, editedLot);

      // Update the lots state with the new changes
      const updatedLots = lots.map((lot) => 
        lot._id === id ? { ...editedLot } : lot
      );
      setLots(updatedLots);

      // Exit edit mode
      setEditMode(null);  
    } catch (err) {
      console.error('Error saving lot:', err);
    }
  };

  const handleImageChange = (e) => {
    setSelectedImage(e.target.files[0]); // Store the selected image
  };

  const handleAgentAssign = (event) => {
    const { value } = event.target;
    setEditedLot((prev) => ({
      ...prev,
      agent: value,
    }));
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditedLot((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleCancel = () => {
    setEditMode(null);  // Exit edit mode
    setEditedLot({});   // Clear the edited data
  };

  return (
    <Container>
      <Grid container spacing={3}>
        {lots.length === 0 ? (
          <Typography variant="h6">No lots available.</Typography>
        ) : (
          lots.map((lot) => (
            <Grid item xs={12} sm={6} md={4} key={lot._id}>
              <Card>
                <CardContent>
                  {editMode === lot._id ? (
                    <>
                      <TextField
                        label="Lot Name"
                        value={editedLot.name}
                        name="name"
                        onChange={handleInputChange}
                        fullWidth
                        margin="normal"
                      />
                      <TextField
                        label="Price"
                        value={editedLot.price}
                        name="price"
                        onChange={handleInputChange}
                        fullWidth
                        margin="normal"
                      />
                      <TextField
                        label="Location"
                        value={editedLot.location}
                        name="location"
                        onChange={handleInputChange}
                        fullWidth
                        margin="normal"
                      />
                      <Select
                        label="Agent"
                        value={editedLot.agent || ''}
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
                      <IconButton onClick={() => handleSave(lot._id)} color="primary">
                        <Save />
                      </IconButton>
                      <IconButton onClick={handleCancel} color="secondary">
                        <Cancel />
                      </IconButton>
                    </>
                  ) : (
                    <>
                      <Typography variant="h5">{lot.name}</Typography>
                      <Typography variant="body1">Price: ${lot.price}</Typography>
                      <Typography variant="body1">Location: {lot.location}</Typography>
                      <Typography variant="body1">Agent: {lot.agent || 'Unassigned'}</Typography>
                      {lot.image && <img src={lot.image} alt={lot.name} style={{ width: '100%', height: 'auto' }} />}
                      <IconButton onClick={() => handleEdit(lot)} color="primary">
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

export default Lots;