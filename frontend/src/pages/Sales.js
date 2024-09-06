import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Container, Typography, Table, TableHead, TableBody, TableRow, TableCell } from '@mui/material';

const Sales = () => {
  const [sales, setSales] = useState([]);

  useEffect(() => {
    const fetchSales = async () => {
      try {
        const res = await axios.get('http://localhost:5001/api/sales', {
          headers: {
            'x-auth-token': localStorage.getItem('token'),
          },
        });
        setSales(res.data);
      } catch (err) {
        console.error(err);
      }
    };

    fetchSales();
  }, []);

  return (
    <Container>
      <Typography variant="h4" align="center" style={{ margin: '20px 0' }}>
        Sales History
      </Typography>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Property</TableCell>
            <TableCell>Client</TableCell>
            <TableCell>Agent</TableCell>
            <TableCell>Sale Price</TableCell>
            <TableCell>Sale Date</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {sales.map((sale) => (
            <TableRow key={sale._id}>
              <TableCell>{sale.home.address}</TableCell>
              <TableCell>{sale.client.name}</TableCell>
              <TableCell>{sale.agent.name}</TableCell>
              <TableCell>${sale.salePrice}</TableCell>
              <TableCell>{new Date(sale.saleDate).toLocaleDateString()}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Container>
  );
};

export default Sales;