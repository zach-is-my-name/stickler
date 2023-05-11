import React, { useState, useEffect, useCallback } from 'react';
import TimeInputGroup from './TimeInputGroup.js' 
import ButtonGroup from './ButtonGroup.js'
import ApplicationsInputGroup from './ApplicationsInputGroup.js'
import ApplicationsDisplayGroup from './ApplicationsDisplayGroup';
import { useHandleButtonClick, useStartTimer, pauseTimer, resetTimer, formatTime} from '../timer';

const App = () => {
  const [countdown, setCountdown] = useState(0);
  const [pausedTime, setPausedTime] = useState(0);
  const [hours, setHours] = useState(0);
  const [minutes, setMinutes] = useState(0);
  const [intervalId, setIntervalId] = useState();

  const [timerState, setTimerState] = useState({
    seconds: 0,
    isRunning: false,
    reset: false,
    currentButton: 'start',
  });


  const [totalApplications, setTotalApplications] = useState(
    parseInt(localStorage.getItem('totalApplications'), 10) || 0
  );

  useEffect(() => {
    (function updateTotalApplications(total) {
      localStorage.setItem('totalApplications', total);
    })(totalApplications);
  }, [totalApplications]);

  const handleButtonClickResult = useHandleButtonClick(intervalId, setIntervalId, timerState, setTimerState, pausedTime, setPausedTime, hours, minutes, setCountdown);

  return (
    <>
    <h1>Stickler</h1>
    <TimeInputGroup 
    setHours={setHours} 
    setMinutes={setMinutes} 
    minutes={minutes} 
    hours={hours}
    /> 

    <ApplicationsInputGroup 
    setTotalApplications={setTotalApplications} 
    totalApplications={totalApplications} 
    />  

    <div className="buttonGroup">
    {timerState.currentButton === 'start' ? (
      <button onClick={handleButtonClickResult}>
      Start
      </button>
    ) : timerState.currentButton === 'pause' ? (
      <button onClick={handleButtonClickResult}>
      Pause
      </button>
    ) : (
      <button onClick={handleButtonClickResult}>
      Reset
      </button>
    )}
    </div>

    <div id="timer">{formatTime(countdown)}</div>
    <ApplicationsDisplayGroup totalApplications={totalApplications} 
    /> 
    </>
  );
};

export default App;



