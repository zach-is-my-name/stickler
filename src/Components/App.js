import React, { useState, useEffect } from 'react';
import TimeInputGroup from './TimeInputGroup.js' 
import ButtonGroup from './ButtonGroup.js'
import ApplicationsInputGroup from './ApplicationsInputGroup.js'
import { handleButtonClick, startTimer, pauseTimer, resetTimer, timerState} from '../timer';

const App = () => {
  const [countdown, setCountdown] = useState(null);
  const [elapsedTime, setElapsedTime] = useState(0);
  const [pausedTime, setPausedTime] = useState(0);
  const [hours, setHours] = useState(0);
  const [minutes, setMinutes] = useState(0);
  const [totalApplications, setTotalApplications] = useState(
    parseInt(localStorage.getItem('totalApplications'), 10) || 0
  );

  useEffect(() => {
    updateTotalApplications(totalApplications);
  }, [totalApplications]);

  const onStart = () => {
    const totalTime = hours * 60 * 60 * 1000 + minutes * 60 * 1000;

    const { countdown: newCountdown, elapsedTime: newElapsedTime } = startTimer(
      pausedTime,
      totalTime
    );
    setCountdown(newCountdown);
    setElapsedTime(newElapsedTime);
    setPausedTime(newElapsedTime);
  };

  const onPause = () => {
    setElapsedTime(pauseTimer(countdown, elapsedTime));
  };

  const onReset = () => {
    setElapsedTime(resetTimer(countdown));
    setPausedTime(0);
  };

  const updateTotalApplications = (total) => {
    localStorage.setItem('totalApplications', total);
  };

  return (
    <>
    <h1>Stickler</h1>
    <TimeInputGroup setHours={setHours} setMinutes={setMinutes} minutes={minutes} hours={hours}/> 

    <ApplicationsInputGroup setTotalApplications={setTotalApplications} totalApplications={totalApplications} />  

    <ButtonGroup timerState={timerState} handleButtonClick={handleButtonClick}/> 

    <div id="timer">{elapsedTime}</div>

    <div id="applications">
    <p>
    Total Applications:{' '}
    <span id="total-applications-display">{totalApplications}</span>
    </p>
    </div>
    </>
  );
};

export default App;
