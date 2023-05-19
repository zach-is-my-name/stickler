function timer(duration) {
  const start = duration  
  let timeLeft = duration
  setInterval(() => {
    if (timeLeft === 0) return
    timeLeft -= 1 
    console.log(timeLeft)
  }, 1000)

}

timer(15)
















