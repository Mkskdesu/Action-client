const timerValue = {
    time: 0,
    intervalId: 0,
    lastUpdate: 0,
}

function startCountUpTimer() {
    timerValue.lastUpdate = performance.now();
    timerValue.intervalId = setInterval(() => {
        const diff = performance.now() - timerValue.lastUpdate;
        timerValue.time += diff;
        timerValue.lastUpdate = performance.now();
    }, 100);
    
}

function stopCountUpTimer() {
    clearInterval(timerValue.intervalId);
}

function resetCountUpTimer() {
    stopCountUpTimer();
    timerValue.time = 0;
    timerValue.intervalId = 0;
}

function getCountUpTime() {
    return timerValue.time;
}


export { startCountUpTimer, stopCountUpTimer, resetCountUpTimer, getCountUpTime };