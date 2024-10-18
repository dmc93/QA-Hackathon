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
    const month = new Date(transaction.date).toLocaleString('default', { month: 'long', year: 'numeric' }); // Include year for proper grouping
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
    labels: Object.keys(monthlyData).reverse(), // Reverse to show older months on the left
    datasets: categories.map(category => ({
      label: category,
      data: Object.keys(monthlyData).reverse().map(month => monthlyData[month].expenses[category] || 0),
      backgroundColor: categoryColors[category] || 'rgba(200, 200, 200, 0.6)', // Default color if not found
      stack: 'expenses', // Stack expenses together
    })).concat([{
      label: 'Income',
      data: Object.keys(monthlyData).reverse().map(month => monthlyData[month].income || 0),
      backgroundColor: 'rgba(75, 192, 192, 0.2)',
      stack: 'income', // Separate stack for income
    }]),
  };

  // Get the maximum expense/income value for the y-axis buffer
  const maxExpense = Math.max(
    ...Object.keys(monthlyData).map(month =>
      Math.max(...Object.values(monthlyData[month].expenses))
    )
  );
  const maxIncome = Math.max(...Object.keys(monthlyData).map(month => monthlyData[month].income));
  const yAxisMax = Math.max(maxExpense, maxIncome) + 500; // Add buffer of 100 to the maximum

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
        min: 0, // Ensure minimum is 0
        max: yAxisMax, // Set the maximum value with buffer
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
