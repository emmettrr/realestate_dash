import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Lots = () => {
  const [lots, setLots] = useState([]);

  const fetchLots = async () => {
    try {
      const res = await axios.get('http://localhost:5001/api/lots');
      setLots(res.data);
    } catch (error) {
      console.error('Error fetching lots:', error);
    }
  };

  useEffect(() => {
    fetchLots();
  }, []);

  return (
    <div>
      <h2>Lots for Sale</h2>
      {lots.map((lot) => (
        <div key={lot.id}>
          <h3>{lot.name}</h3>
          <p>Estimated Price: ${lot.estimatedPrice}</p>
          <p>Location: {lot.location}</p>
          <p>Agent: {lot.agent}</p>
        </div>
      ))}
    </div>
  );
};

export default Lots;