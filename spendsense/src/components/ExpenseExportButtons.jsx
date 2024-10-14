// src/components/ExpenseExportButtons.js
import React from 'react';
import axios from 'axios';

const ExpenseExportButtons = () => {
  const exportCSV = () => {
    axios.get('/api/export/csv', { responseType: 'blob' }).then((response) => {
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', 'expenses.csv');
      document.body.appendChild(link);
      link.click();
    });
  };

  const exportPDF = () => {
    axios.get('/api/export/pdf', { responseType: 'blob' }).then((response) => {
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', 'expenses.pdf');
      document.body.appendChild(link);
      link.click();
    });
  };

  return (
    <div>
      <button onClick={exportCSV} className="btn btn-success">Export CSV</button>
      <button onClick={exportPDF} className="btn btn-info">Export PDF</button>
    </div>
  );
};

export default ExpenseExportButtons;
