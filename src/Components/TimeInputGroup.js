import react from 'react'

import React from 'react';

export default function TimeInputGroup({ setHours, setMinutes, minutes, hours }) {
  return (
    <div className="input-container">
      <div className="input-group">
        <label htmlFor="hours">Hours:</label>
        <input
          id="hours"
          type="number"
          min="0"
          step="1"
          value={hours === 0 ? '' : hours}
          onChange={(e) => setHours(parseInt(e.target.value, 10) || 0)}
        />
      </div>

      <div className="input-group">
        <label htmlFor="minutes">Minutes:</label>
        <input
          id="minutes"
          type="number"
          min="0"
          max="59"
          step="1"
          value={minutes === 0 ? '' : minutes}
          onChange={(e) => setMinutes(parseInt(e.target.value, 10) || 0)}
        />
      </div>
    </div>
  );
}
