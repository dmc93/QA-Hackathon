import React from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const SpendingChart = ({ transactions }) => {
  const categoryColors = {
    Groceries: 'rgba(75, 192, 192, 0.6)',
    Entertainment: 'rgba(255, 99, 132, 0.6)',
    Utilities: 'rgba(54, 162, 235, 0.6)',
    Housing: 'rgba(153, 102, 255, 0.6)',
    // Add more categories and their colors as needed
  };

  const monthlyData = {};

  // Populate monthlyData with categories and amounts from transactions
  transactions.forEach(transaction => {
    const month = new Date(transaction.date).toLocaleString('default', { month: 'long' });
    const category = transaction.category;

    if (!monthlyData[month]) {
      monthlyData[month] = { income: 0, expenses: {} };
    }

    // Add amounts based on category
    if (category === 'Income') {
      monthlyData[month].income += transaction.amount;
    } else {
      if (!monthlyData[month].expenses[category]) {
        monthlyData[month].expenses[category] = 0;
      }
      monthlyData[month].expenses[category] -= transaction.amount; // Store expenses as negative
    }
  });

  // Dynamically load categories from transactions
  const categories = Object.keys(monthlyData).reduce((acc, month) => {
    Object.keys(monthlyData[month].expenses).forEach(category => {
      if (!acc.includes(category)) {
        acc.push(category);
      }
    });
    return acc;
  }, []);

  // Prepare data for chart
  const chartData = {
    labels: Object.keys(monthlyData),
    datasets: categories.map(category => ({
      label: category,
      data: Object.keys(monthlyData).map(month => monthlyData[month].expenses[category] || 0),
      backgroundColor: categoryColors[category] || 'rgba(200, 200, 200, 0.6)', // Default color if not found
      stack: 'expenses', // Stack expenses together
    })).concat([{
      label: 'Income',
      data: Object.keys(monthlyData).map(month => monthlyData[month].income || 0),
      backgroundColor: 'rgba(75, 192, 192, 0.2)',
      stack: 'income', // Separate stack for income
    }]),
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
        min: Math.min(0, ...Object.keys(monthlyData).map(month => monthlyData[month].income + Math.min(...Object.values(monthlyData[month].expenses)))), // Minimum value to accommodate negatives
      },
    },
  };

  return (
    <div>
      <Bar data={chartData} options={chartOptions} />
    </div>
  );
};

export default SpendingChart;
