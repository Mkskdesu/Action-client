const timerValue = {
    time: 0,
    intervalId: 0,
}

function startTimer() {
    timerValue.intervalId = setInterval(() => {
        timerValue.time += 100;
    }, 100);
}

function stopTimer() {
    clearInterval(timerValue.intervalId);
}

function resetTimer() {
    stopTimer();
    timerValue.time = 0;
    timerValue.intervalId = 0;
}

function getTime() {
    return timerValue.time;
}


export { startTimer, stopTimer, resetTimer, getTime };