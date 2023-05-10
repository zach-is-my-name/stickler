import React, { useState, useEffect } from 'react';
import TimeInputGroup from './TimeInputGroup.js' 
import ButtonGroup from './ButtonGroup.js'
import ApplicationsInputGroup from './ApplicationsInputGroup.js'
import ApplicationsDisplayGroup from './ApplicationsDisplayGroup';
import { handleButtonClick, startTimer, pauseTimer, resetTimer, useTimerState, formatTime} from '../timer';

const App = () => {
  const [timerState, setTimerState] = useTimerState()
  const [countdown, setCountdown] = useState(null);
  const [pausedTime, setPausedTime] = useState(0);
  const [hours, setHours] = useState(0);
  const [minutes, setMinutes] = useState(0);
  const [totalApplications, setTotalApplications] = useState(
    parseInt(localStorage.getItem('totalApplications'), 10) || 0
  );

  useEffect(() => {
    (function updateTotalApplications(total) {
      localStorage.setItem('totalApplications', total);
    })(totalApplications);
  }, [totalApplications]);

  return (
    <>
    <h1>Stickler</h1>
    <TimeInputGroup 
      setHours={setHours} 
      setMinutes={setMinutes} 
      minutes={minutes} 
      hours={hours}/> 

    <ApplicationsInputGroup 
      setTotalApplications={setTotalApplications} 
      totalApplications={totalApplications} />  

    <ButtonGroup
      timerState={timerState}
      setTimerState={setTimerState}
      handleButtonClick={(timerState, setTimerState) => {
        handleButtonClick(timerState, setTimerState, countdown, setCountdown, hours, minutes);
      }}
    />
    <div id="timer">{formatTime(countdown)}</div>
    <ApplicationsDisplayGroup totalApplications={totalApplications} /> 
    </>
  );
};

export default App;
