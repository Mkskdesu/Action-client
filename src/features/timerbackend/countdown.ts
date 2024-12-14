const timerValue = {
    originalValue: 0,
    time: 0,
    intervalId: 0,
    lastUpdate: 0,
    onEnd: ()=>{},
}

function setCountDownTimer(v:number,callback:()=>void){
    timerValue.time = v;
    timerValue.originalValue = v;
    timerValue.onEnd = callback;
}

function startCountDownTimer() {
    timerValue.lastUpdate = performance.now();
    timerValue.intervalId = setInterval(() => {
        const diff = performance.now() - timerValue.lastUpdate;
        timerValue.time -= diff;
        if(timerValue.time < 0){
            stopCountDownTimer();
            timerValue.onEnd();
            timerValue.time = 0;
            return;
        }
        timerValue.lastUpdate = performance.now();
    }, 100);

}

function stopCountDownTimer() {
    clearInterval(timerValue.intervalId);
}

function resetCountDownTimer() {
    stopCountDownTimer();
    timerValue.time = timerValue.originalValue;
    timerValue.intervalId = 0;
}

function getCountDownTime() {
    return timerValue.time;
}

function getOriginalTime() {
    return timerValue.originalValue;
}

export { setCountDownTimer,startCountDownTimer, stopCountDownTimer, resetCountDownTimer, getCountDownTime,getOriginalTime };