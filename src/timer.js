import {useCallback} from 'react';

export function useStartTimer(pausedTime, timeMilSec, setCountdown, intervalId, setIntervalId) {
  const startTime = Date.now() - pausedTime;
  let elapsedTime = pausedTime;
  const _intervalId = setInterval(() => {
    elapsedTime = Date.now() - startTime;
    if (elapsedTime >= timeMilSec) {
      clearInterval(intervalId);
      elapsedTime = timeMilSec;
    }
    setCountdown(timeMilSec - elapsedTime);
  }, 1000);
  setIntervalId(_intervalId);
  return {
    setIntervalId,
    intervalId,
    elapsedTime,
  };
}

export function useHandleButtonClick(intervalId, setIntervalId, timerState, setTimerState, pausedTime, setPausedTime, hours, minutes, setCountdown) {
  const timeMilSec = (hours * 60 + minutes) * 60 * 1000;

  // Use the useCallback hook to memoize the useStartTimer hook
  const useStartTimer = useCallback(
    (pausedTime, timeMilSec, setCountdown, intervalId, setIntervalId) => {
      const startTime = Date.now() - pausedTime;
      let elapsedTime = pausedTime;
      const _intervalId = setInterval(() => {
        elapsedTime = Date.now() - startTime;
        if (elapsedTime >= timeMilSec) {
          clearInterval(intervalId);
          elapsedTime = timeMilSec;
        }
        setCountdown(timeMilSec - elapsedTime);
      }, 1000);
      setIntervalId(_intervalId);
      return {
        setIntervalId,
        intervalId,
        elapsedTime,
      };
    },
    [intervalId, setIntervalId],
  );

  if (!timerState.isRunning) {
    setPausedTime(elapsedTime);
    setTimerState({
      ...timerState,
      isRunning: true,
      currentButton: 'pause',
    });
  } else if (timerState.currentButton === 'pause') {
    clearInterval(intervalId);
    setPausedTime(pausedTime);
    setTimerState({
      ...timerState,
      isRunning: false,
      currentButton: 'reset',
    });
  } else if (timerState.currentButton === 'reset') {
    clearInterval(intervalId);
    setCountdown(0);
    setPausedTime(0);
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
