import react from 'react' 

export default function ApplicationsInputGroup({setTotalApplications, totalApplications}) {
  return (
      <div className="input-group">
        <label htmlFor="total-applications">Total Applications:</label>
        <input
          id="total-applications"
          type="number"
          min="0"
          step="1"
          value={totalApplications}
          onChange={(e) =>
            setTotalApplications(parseInt(e.target.value, 10) || 0)
          }
        />
    </div>

  )
}
