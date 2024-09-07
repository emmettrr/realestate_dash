import React, { useEffect, useState } from 'react';
import axios from 'axios';

const HomeList = () => {
  const [homes, setHomes] = useState([]);

  const fetchHomes = async () => {
    try {
      const res = await axios.get('http://localhost:5001/api/homes');
      setHomes(res.data);
    } catch (error) {
      console.error('Error fetching homes:', error);
    }
  };

  useEffect(() => {
    fetchHomes();
  }, []);

  return (
    <div>
      <h2>Homes for Sale</h2>
      {homes.map((home) => (
        <div key={home.id}>
          <img src={home.image} alt={home.name} />
          <h3>{home.name}</h3>
          <p>Price: ${home.price}</p>
          <p>Address: {home.address}</p>
          <p>Agent: {home.agent}</p>
        </div>
      ))}
    </div>
  );
};

export default HomeList;