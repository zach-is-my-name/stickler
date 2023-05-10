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

export function startTimer(pausedTime, totalTime, updateCountdown) {
  const startTime = Date.now() - pausedTime;
  let elapsedTime = pausedTime;

  const countdown = setInterval(() => {
    elapsedTime = Date.now() - startTime;

    if (elapsedTime >= totalTime) {
      clearInterval(countdown);
      elapsedTime = totalTime;
    }
    updateCountdown(totalTime - elapsedTime);
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


export const handleButtonClick = (timerState, setTimerState, countdown, setCountdown, hours, minutes) => {
  if (timerState.currentButton === 'start') {
    const totalTime = (hours * 60 + minutes) * 60 * 1000;
    const { countdown: newCountdown } = startTimer(0, totalTime, setCountdown);
    setCountdown(newCountdown);
    setTimerState({
      ...timerState,
      isRunning: true,
      currentButton: 'pause',
    });
  } else if (timerState.currentButton === 'pause') {
    clearInterval(countdown);
    setTimerState({
      ...timerState,
      isRunning: false,
      currentButton: 'reset',
    });
  } else if (timerState.currentButton === 'reset') {
    clearInterval(countdown);
    setCountdown(0);
    setTimerState({
      seconds: 0,
      isRunning: false,
      reset: true,
      currentButton: 'start',
    });
  }
};

export function formatTime(milliseconds) {
  const totalSeconds = Math.floor(milliseconds / 1000);
  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;

  return `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
}

