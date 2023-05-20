import react from 'react' 

export default function ApplicationsDisplayGroup ({totalApplications}) {
  return (
    <div id="applications">
    <p>
    Total Applications:{' '}
    <span id="total-applications-display">{totalApplications}</span>
    </p>
    </div>
  ) 
}
