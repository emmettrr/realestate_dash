import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Clients = () => {
  const [clients, setClients] = useState([]);

  const fetchClients = async () => {
    try {
      const res = await axios.get('http://localhost:5001/api/clients');
      setClients(res.data);
    } catch (error) {
      console.error('Error fetching clients:', error);
    }
  };

  useEffect(() => {
    fetchClients();
  }, []);

  return (
    <div>
      <h2>Clients</h2>
      {clients.map((client) => (
        <div key={client.id}>
          <h3>{client.name}</h3>
          <p>Email: {client.email}</p>
          <p>Interested in: {client.interestedIn}</p>
          <p>Tour Status: {client.tourStatus}</p>
        </div>
      ))}
    </div>
  );
};

export default Clients;