import React, { useState, useEffect, useCallback } from 'react';
import useCountDown from 'react-countdown-hook';
import ApplicationCountForm from '../Components/ApplicationCountForm.js';
import ky from 'ky';

const App = () => {
const millisecondsToTime = (milliseconds) => {
  const totalSeconds = Math.floor(milliseconds / 1000);
  const totalMinutes = Math.floor(totalSeconds / 60);
  const hours = Math.floor(totalMinutes / 60);
  const minutes = totalMinutes % 60;
  return `${hours}:${minutes.toString().padStart(2, '0')}`;
};
  const [lastClicked, setLastClicked] = useState(null);
  const [hours, setHours] = useState(0);
  const [minutes, setMinutes] = useState(0);
  const [timeInMilliseconds, setTimeInMilliseconds] = useState(0);

  const [
    remainingTime,
    { start: startCountDown, pause: pauseCountDown, reset: resetCountDown },
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
    const formattedTimeAllocated = millisecondsToTime(timeAllocated);

    localStorage.setItem('totalApplicationCount', applicationCount + localStorage.getItem('totalApplicationCount'))

    const data = {
      Date: new Date().toLocaleString(),
      'Time Allocated': formattedTimeAllocated ,
      'Actual Time': actualTime,
      'Time Completed': timeCompleted,
      'Session Applications': sessionApplications,
      'Total Applications': totalApplications + applicationCount
    };

    try {
      const response = await ky.post('/api/googleSheetAPI', {json: data}).json();
      console.log(response);
    } catch (error) {
      console.error(error);
    }
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
    setLastClicked('start');
  };

  const onPause = () => {
    pauseCountDown();
    setLastClicked('pause');
  };

  const onStop = () => {
    pauseCountDown();
    setShowApplicationCountForm(true);
    setLastClicked('stop');
  };

  const onReset = () => {
    resetCountDown();
    setLastClicked(null); // Reset all buttons to default color
  };

  return (
    <div>
    <h1>Stickler</h1>
    <input type="number" value={hours} onChange={handleHoursChange} placeholder="Hours" />
    <input type="number" value={minutes} onChange={handleMinutesChange} placeholder="Minutes" />
    <div>
    <h2>Time Remaining: {formatTime(remainingTime)}</h2>
    </div>
    <button onClick={onStart} className={lastClicked === 'start' ? 'start' : ''}>Start</button>
    <button onClick={onPause} className={lastClicked === 'pause' ? 'pause' : ''}>Pause</button>
    <button onClick={onStop} className={lastClicked === 'stop' ? 'stop' : ''} >Stop</button>
    <button onClick={onReset}>Reset</button>
    {showApplicationCountForm && (
      <ApplicationCountForm onSubmit={handleApplicationCountSubmit} />
    )}
    </div>
  );
};

export default App;
