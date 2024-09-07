import React from 'react';
import { Line, Bar } from 'react-chartjs-2';
import { Chart, CategoryScale, LinearScale, PointElement, LineElement, BarElement, Title, Tooltip, Legend } from 'chart.js';
import { Card, CardContent, Typography } from '@mui/material';

// Register the components for Chart.js
Chart.register(
  CategoryScale,  // The "category" scale is needed for the x-axis
  LinearScale,    // Linear scale for y-axis
  PointElement,   // For points on line charts
  LineElement,    // For the line itself
  BarElement,     // For bar charts
  Title,          // For chart title
  Tooltip,        // For tooltips
  Legend          // For legend display
);

// Sample data for line chart
const performanceData = {
  labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
  datasets: [
    {
      label: 'Performance',
      data: [90, 80, 100, 70, 120, 110, 130, 90, 100, 110, 120, 100],
      fill: false,
      borderColor: '#4ac0c0',
      tension: 0.4,
    },
  ],
};

// Sample data for bar chart
const salesData = {
  labels: ['USA', 'GER', 'AUS', 'UK', 'FRA'],
  datasets: [
    {
      label: 'Daily Sales',
      data: [50, 80, 40, 70, 60],
      backgroundColor: '#a29bfe',
    },
  ],
};

const Charts = () => {
  return (
    <div>
      {/* Line Chart */}
      <Card sx={{ backgroundColor: '#1e1e2f', color: '#ffffff', marginBottom: 3 }}>
        <CardContent>
          <Typography variant="h5">Performance</Typography>
          <Line data={performanceData} />
        </CardContent>
      </Card>

      {/* Bar Chart */}
      <Card sx={{ backgroundColor: '#1e1e2f', color: '#ffffff' }}>
        <CardContent>
          <Typography variant="h5">Daily Sales</Typography>
          <Bar data={salesData} />
        </CardContent>
      </Card>
    </div>
  );
};

export default Charts;