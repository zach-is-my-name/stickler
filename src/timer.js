import {useState} from 'react'

export function useTimerState() {
 const [timerState, setTimerState] = useState({
    seconds: 0,
    isRunning: false,
    reset: false,
    currentButton: 'start',
  });
 return [timerState, setTimerState]
}

export function startTimer(pausedTime, totalTime) {
  const startTime = Date.now() - pausedTime;
  let elapsedTime = pausedTime;


  const countdown = setInterval(() => {
    elapsedTime = Date.now() - startTime;

    if (elapsedTime >= totalTime) {
      clearInterval(countdown);
      elapsedTime = totalTime;
    }
  }, 1000);

  return { countdown, elapsedTime };
}

export function pauseTimer(countdown, elapsedTime) {
  clearInterval(countdown);
  return elapsedTime;
}

export function resetTimer(countdown) {
  clearInterval(countdown);
  return 0;
}


export const handleButtonClick = (timerState, setTimerState) => {
  if (timerState.currentButton === 'start') {
    setTimerState({
      ...timerState,
      isRunning: true,
      currentButton: 'pause',
    });
  } else if (timerState.currentButton === 'pause') {
    setTimerState({
      ...timerState,
      isRunning: false,
      currentButton: 'reset',
    });
  } else if (timerState.currentButton === 'reset') {
    setTimerState({
      seconds: 0,
      isRunning: false,
      reset: true,
      currentButton: 'start',
    });
  }
};
