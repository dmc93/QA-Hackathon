// src/pages/BillSplitting.js
import React from 'react';
import BillSplittingForm from '../components/BillSplittingForm'; // Import Bill Splitting Form Component

const BillSplitting = () => {
  return (
    <div className="container">
      <h2>Bill Splitting</h2>
      <BillSplittingForm />
    </div>
  );
};

export default BillSplitting;
