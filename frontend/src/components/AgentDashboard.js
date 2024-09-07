import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Container, Grid, Card, Typography, Button } from '@mui/material';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';

const columnsFromBackend = {
  "forSale": {
    name: "For Sale",
    items: []
  },
  "underContract": {
    name: "Under Contract",
    items: []
  },
  "sold": {
    name: "Sold",
    items: []
  }
};

const AgentDashboard = () => {
  const [columns, setColumns] = useState(columnsFromBackend);
  const [isAdmin, setIsAdmin] = useState(false); // Assume agent initially

  useEffect(() => {
    const fetchHomes = async () => {
      try {
        const res = await axios.get('http://localhost:5001/api/homes', {
          headers: { 'x-auth-token': localStorage.getItem('token') },
        });
        // Populate columns with data
        const forSale = res.data.filter((home) => home.status === 'for sale');
        const underContract = res.data.filter((home) => home.status === 'under contract');
        const sold = res.data.filter((home) => home.status === 'sold');

        setColumns({
          "forSale": { ...columns["forSale"], items: forSale },
          "underContract": { ...columns["underContract"], items: underContract },
          "sold": { ...columns["sold"], items: sold },
        });

        // Check if admin
        setIsAdmin(res.data.role === 'admin');
      } catch (error) {
        console.error('Error fetching homes:', error);
      }
    };
    fetchHomes();
  }, []);

  // Handle Drag and Drop functionality
  const onDragEnd = async (result, columns, setColumns) => {
    const { source, destination } = result;
    if (!destination) return;

    const sourceColumn = columns[source.droppableId];
    const destColumn = columns[destination.droppableId];
    const sourceItems = [...sourceColumn.items];
    const [removed] = sourceItems.splice(source.index, 1);
    const destItems = [...destColumn.items];
    destItems.splice(destination.index, 0, removed);

    setColumns({
      ...columns,
      [source.droppableId]: {
        ...sourceColumn,
        items: sourceItems
      },
      [destination.droppableId]: {
        ...destColumn,
        items: destItems
      }
    });

    // Update the status of the home in the backend
    try {
      await axios.put(`http://localhost:5001/api/homes/${removed._id}/update-status`, {
        status: destination.droppableId
      }, {
        headers: { 'x-auth-token': localStorage.getItem('token') },
      });
    } catch (err) {
      console.error('Error updating home status:', err);
    }
  };

  return (
    <Container>
      <DragDropContext onDragEnd={(result) => onDragEnd(result, columns, setColumns)}>
        <Grid container spacing={3}>
          {Object.entries(columns).map(([columnId, column]) => (
            <Grid item xs={12} sm={4} key={columnId}>
              <Typography variant="h5" gutterBottom>{column.name}</Typography>
              <Droppable droppableId={columnId} key={columnId}>
                {(provided) => (
                  <div {...provided.droppableProps} ref={provided.innerRef} style={{ padding: 16 }}>
                    {column.items.map((home, index) => (
                      <Draggable key={home._id} draggableId={home._id} index={index}>
                        {(provided) => (
                          <Card
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                            ref={provided.innerRef}
                            sx={{ marginBottom: 2, padding: 2 }}
                          >
                            <Typography>{home.name}</Typography>
                            <Typography>{home.address}</Typography>
                            <Typography>${home.price}</Typography>
                            <Button variant="contained">View Details</Button>
                          </Card>
                        )}
                      </Draggable>
                    ))}
                    {provided.placeholder}
                  </div>
                )}
              </Droppable>
            </Grid>
          ))}
        </Grid>
      </DragDropContext>
    </Container>
  );
};

export default AgentDashboard;