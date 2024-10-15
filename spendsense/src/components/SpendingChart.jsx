// src/components/SpendingChart.js
import React from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const SpendingChart = () => {
  // Example data for categories and income across different months
  const chartData = {
    labels: ['January', 'February', 'March', 'April', 'May'],
    datasets: [
      {
        label: 'Groceries',
        data: [200, 225, 200, 175, 200],
        backgroundColor: 'rgba(75, 192, 192, 0.6)',
        stack: 'expenses', // Stack expenses together
      },
      {
        label: 'Entertainment',
        data: [70, 50, 60, 60, 65],
        backgroundColor: 'rgba(255, 99, 132, 0.6)',
        stack: 'expenses', // Stack expenses together
      },
      {
        label: 'Utilities',
        data: [150, 155, 150, 150, 155],
        backgroundColor: 'rgba(54, 162, 235, 0.6)',
        stack: 'expenses', // Stack expenses together
      },
      {
        label: 'Housing',
        data: [800, 800, 800, 800, 800], // Example housing data
        backgroundColor: 'rgba(153, 102, 255, 0.6)',
        stack: 'expenses', // Stack with other expenses
      },
      {
        label: 'Income',
        data: [1250, 1200, 1225, 1200, 1225], // Income data for each month
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
        stack: 'income', // Separate stack for income (not stacked with expenses)
      },
    ],
  };

  const chartOptions = {
    plugins: {
      title: {
        display: true,
        text: 'Monthly Spending and Income',
      },
      tooltip: {
        mode: 'index',
        intersect: false,
      },
      legend: {
        position: 'top',
      },
    },
    scales: {
      x: {
        stacked: true, // Stack the bars on the x-axis
      },
      y: {
        beginAtZero: true,
        stacked: true, // Stacking enabled on y-axis
      },
    },
  };

  return (
    <div>
      <h4>Spending and Income Trends</h4>
      <Bar data={chartData} options={chartOptions} />
    </div>
  );
};

export default SpendingChart;
