import react from 'react' 

export default function ButtonGroup({ timerState, handleButtonClick, setTimerState }) {
  return (
    <div className="buttonGroup">
      {timerState.currentButton === 'start' ? (
        <button onClick={() => handleButtonClick(timerState, setTimerState, null, null)}>Start</button>) 

        : timerState.currentButton === 'pause' ? (
        <button onClick={() => handleButtonClick(timerState, setTimerState)}>Pause</button>) 

        : (<button onClick={() => handleButtonClick(timerState, setTimerState)}>Reset</button>
      )}
    </div>
  );
}
