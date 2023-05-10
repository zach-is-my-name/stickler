import React, { useState, useEffect } from 'react';
import TimeInputGroup from './TimeInputGroup.js' 
import ButtonGroup from './ButtonGroup.js'
import ApplicationsInputGroup from './ApplicationsInputGroup.js'
import ApplicationsDisplayGroup from './ApplicationsDisplayGroup';
import { handleButtonClick, startTimer, pauseTimer, resetTimer, useTimerState} from '../timer';

const App = () => {
  const [timerState, setTimerState] = useTimerState()
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
    <ApplicationsDisplayGroup totalApplications={totalApplications} /> 
    </>
  );
};

export default App;
