import react from 'react' 

export default function ButtonGroup({timerState, handleButtonClick}) {
    <div className='buttonGroup'>
    {timerState.currentButton === 'start' ? (
      <button onClick={() => handleButtonClick(timerState)}>Start</button>
    ) : timerState.currentButton === 'pause' ? (
      <button onClick={() => handleButtonClick(timerState)}>Pause</button>
    ) : (
      <button onClick={() => handleButtonClick(timerState)}>Reset</button>
    )}
    </div>
}
