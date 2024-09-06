import React from 'react';
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend);

const TrafficSourceChart = () => {
  const data = {
    labels: ['Desktop', 'Tablet', 'Phone'],
    datasets: [
      {
        label: '# of Visits',
        data: [63, 15, 22],
        backgroundColor: ['#4CAF50', '#FF9800', '#2196F3'],
        hoverOffset: 4,
      },
    ],
  };

  return <Pie data={data} />;
};

export default TrafficSourceChart;
