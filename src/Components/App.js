import React, { useState, useEffect, useCallback } from 'react';
import useCountDown from 'react-countdown-hook';
import ApplicationCountForm from './ApplicationCountForm';
import { addRowToSheet } from '../googleSheetAPI.js'; 

const App = () => {
  const [hours, setHours] = useState(0);
  const [minutes, setMinutes] = useState(0);
  const [timeInMilliseconds, setTimeInMilliseconds] = useState(0);

  const [
    remainingTime,
    { start: startCountDown, pause: pauseCountDown, stop: stopCountDown, reset: resetCountDown },
  ] = useCountDown(timeInMilliseconds, 1000);

  const [showApplicationCountForm, setShowApplicationCountForm] = useState(false);

  const setNewTime = useCallback(() => {
    const newTimeInMilliseconds = (hours * 60 * 60 + minutes * 60) * 1000;
    setTimeInMilliseconds(newTimeInMilliseconds);
  }, [hours, minutes]);

  useEffect(() => {
    setNewTime();
  }, [hours, minutes, setNewTime]);

  const handleHoursChange = (e) => {
    setHours(e.target.value);
  };

  const handleMinutesChange = (e) => {
    setMinutes(e.target.value);
  };

const handleApplicationCountSubmit = async (applicationCount) => {
  const sessionApplications = Math.abs(localStorage.getItem('totalApplicationCount') - applicationCount) || 0;
  const totalApplications = localStorage.getItem('totalApplicationCount')
  const timeAllocated = (hours * 60 * 60 + minutes * 60) * 1000;
  const actualTime = timeInMilliseconds - remainingTime;
  const timeCompleted = timeAllocated === actualTime;

  localStorage.setItem('totalApplicationCount', applicationCount + localStorage.getItem('totalApplicationCount'))

  const data = {
    Date: new Date().toLocaleString(),
    'Time Allocated': timeAllocated,
    'Actual Time': actualTime,
    'Time Completed': timeCompleted,
    'Session Applications': sessionApplications,
    'Total Applications': totalApplications
  };

  await addRowToSheet(data);
};

  const formatTime = (time) => {
    const seconds = Math.floor((time / 1000) % 60);
    const minutes = Math.floor((time / (1000 * 60)) % 60);
    const hours = Math.floor((time / (1000 * 60 * 60)) % 24);
    return `${hours.toString().padStart(2, '0')}:${minutes
      .toString()
      .padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  };

  const onStart = () => {
    const initialTime = (hours * 60 * 60 + minutes * 60) * 1000;
      startCountDown(initialTime);
  };

  const onPause = () => {
    pauseCountDown();
    setShowApplicationCountForm(true);
  };

  const onStop = () => {
    stopCountDown();
    setShowApplicationCountForm(true);
  };

  const onReset = () => {
    resetCountDown();
  };

  return (
    <div>
      <h1>Stickler</h1>
      <input type="number" value={hours} onChange={handleHoursChange} placeholder="Hours" />
      <input type="number" value={minutes} onChange={handleMinutesChange} placeholder="Minutes" />
      <div>
        <h2>Time Remaining: {formatTime(remainingTime)}</h2>
      </div>
      <button onClick={onStart}>Start</button>
      <button onClick={onPause}>Pause</button>
      <button onClick={onReset}>Stop</button>
      <button onClick={onReset}>Reset</button>
      {showApplicationCountForm && (
        <ApplicationCountForm onSubmit={handleApplicationCountSubmit} />
      )}
    </div>
  );
};

export default App;
