// RemoveBtn.jsx

import React, { useState } from 'react';
import API from '../../api/API';

export default function RemoveBtn({ dateId, foodId, onRemove }) {
  const [confirming, setConfirming] = useState(false);

  const buttonStyle = {
    // Find out how to style a button
  };

  const removeFoodItem = async () => {
    try {
      await API.removeFood(dateId, foodId);
      onRemove(foodId);
      setConfirming(false);
    } catch (error) {
      console.error(`Error removing food item: ${error.message}`);
    }
  };

  return (
    <div>
      {confirming ? (
        <div>
          <p>Confirm deletion?</p>
          <button onClick={removeFoodItem}>Yes</button>
          <button onClick={() => setConfirming(false)}>No</button>
        </div>
      ) : (
        <button onClick={() => setConfirming(true)} style={buttonStyle}>
          delete
        </button>
      )}
    </div>
  );
}
