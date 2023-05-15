import React, { useState } from 'react';

const ApplicationCountForm = ({ onSubmit }) => {
  const [applicationCount, setApplicationCount] = useState('');

  const handleChange = (e) => {
    setApplicationCount(e.target.value);
  };

  const handleSubmit = () => {
    onSubmit(applicationCount);
    setApplicationCount('');
  };

  return (
    <div>
      <label htmlFor="applicationCount">Application Count: </label>
      <input
        type="text"
        id="applicationCount"
        value={applicationCount}
        onChange={handleChange}
      />
      <button onClick={handleSubmit}>Submit</button>
    </div>
  );
};

export default ApplicationCountForm;

