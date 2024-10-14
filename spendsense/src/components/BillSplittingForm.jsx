// src/components/BillSplittingForm.js
import React, { useState } from 'react';

const BillSplittingForm = () => {
  const [billAmount, setBillAmount] = useState('');
  const [friends, setFriends] = useState('');
  const [category, setCategory] = useState('');
  const [splitResult, setSplitResult] = useState(null); // New state to store the split result

  const handleSubmit = (e) => {
    e.preventDefault();
    const friendList = friends.split(',').map((friend) => friend.trim());

    // Simulate the bill splitting calculation
    const splitAmount = (billAmount / friendList.length).toFixed(2);

    // Store the result in the state to display it on the page
    setSplitResult({
      category,
      billAmount,
      friends: friendList,
      splitAmount,
    });
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Bill Amount</label>
          <input
            type="number"
            value={billAmount}
            onChange={(e) => setBillAmount(e.target.value)}
            className="form-control"
          />
        </div>
        <div className="form-group">
          <label>Friends (comma-separated)</label>
          <input
            type="text"
            value={friends}
            onChange={(e) => setFriends(e.target.value)}
            className="form-control"
          />
        </div>
        <div className="form-group">
          <label>Category</label>
          <input
            type="text"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="form-control"
            placeholder="e.g., Utilities, Food, Rent"
          />
        </div>
        <button type="submit" className="btn btn-primary">Submit</button>
      </form>

      {/* Display the split result below the form */}
      {splitResult && (
        <div className="mt-4">
          <h4>Bill Split Results:</h4>
          <p><strong>Category:</strong> {splitResult.category}</p>
          <p><strong>Total Bill Amount:</strong> £{splitResult.billAmount}</p>
          <p><strong>Friends:</strong> {splitResult.friends.join(', ')}</p>
          <p><strong>Each Friend Owes:</strong> £{splitResult.splitAmount}</p>
        </div>
      )}
    </div>
  );
};

export default BillSplittingForm;
