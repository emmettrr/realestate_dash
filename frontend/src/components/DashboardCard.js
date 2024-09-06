import React from 'react';
import { Card, CardContent, Typography } from '@mui/material';

const DashboardCard = ({ title, value, icon, progress, color }) => {
  return (
    <Card sx={{ minWidth: 200, boxShadow: 3, backgroundColor: color }}>
      <CardContent>
        <Typography variant="h5" component="div">
          {title}
        </Typography>
        <Typography variant="h3">{value}</Typography>
        {progress !== undefined && (
          <Typography sx={{ mt: 1 }} variant="body2">
            {progress}% complete
          </Typography>
        )}
      </CardContent>
    </Card>
  );
};

export default DashboardCard;
