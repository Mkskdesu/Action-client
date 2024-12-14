
import style from "./CountDown.module.scss"
import {Howl} from "howler";
import {createEffect, createSignal, Match, onCleanup, Show, Switch} from "solid-js";
import {
    countDownTimerState,
    setCountDownTimerState,
} from "global/states/timerState.ts";
import {BsArrowCounterclockwise, BsCaretRightFill, BsCircle, BsPauseFill} from "solid-icons/bs";
import R8Button from "global/components/button/r8Button/R8Button.tsx";
import {mode, setMode} from "pages/timer/state/countdownState.ts";
import {
    getCountDownTime, getOriginalTime, resetCountDownTimer,
    setCountDownTimer,
    startCountDownTimer,
    stopCountDownTimer
} from "@/features/timerbackend/countdown.ts";

import timerSound from "assets/sound/Timer.mp3";
import Circle from "global/components/svg/Circle.tsx";


export default () =>{

    const [timerValue, setTimerValue] = createSignal<Array<number>>([0, 0, 0]);
    let input1Ref: HTMLInputElement|undefined;
    let input2Ref: HTMLInputElement|undefined;
    let input3Ref: HTMLInputElement|undefined;
    let circleRef: SVGSVGElement|undefined;
    let timerInterval: number;
    const volume = JSON.parse(localStorage.getItem("config")||'{"timer":{"soundVolume":0.5}}').timer.soundVolume;
    
    function focusNext(e:KeyboardEvent,elem: HTMLInputElement) {
        if (e.key.toLowerCase() != "enter") return;
        elem.focus();
    }
    
    function timerEnd(){
        setCountDownTimerState("paused");
        const source = new Howl({
            src:[timerSound],
            volume:volume,
        });
        source.play();
    }
    
    function confirmTime(){
        const hour = (Number(input1Ref?.value||0)) * 3600000;
        const minute = (Number(input2Ref?.value||0)) * 60000;
        const second = Number(input3Ref?.value||0) * 1000;
        setCountDownTimer(hour+minute+second,timerEnd);
        setMode("running");
        startCountDownTimer();
        setCountDownTimerState("running");
    }

    createEffect(() => {
        if (countDownTimerState() == "running") {
            timerInterval = setInterval(parseTimer, 100);
        }else{
            clearInterval(timerInterval);
        }
    });

    onCleanup(()=>{
        clearInterval(timerInterval);
        
    })

    function parseTimer() {
        let value = getCountDownTime();
        const percent = (value / getOriginalTime()) *100;
        let hour = Math.floor(value / 3600000);
        value -= 3600000 * hour;
        let min = Math.floor(value / 60000);
        value -= 60000 * min;
        let sec = Math.floor(value / 1000);
        setTimerValue([hour,min, sec]);
        circleRef!.querySelector("circle")!.style.strokeDashoffset = (50 + (50 - percent/2)).toString();
    }
    
    
    return(
        <div class={style.countdown}>
            <Switch>
                <Match when={mode() == "input"}>
                    <div class={style.input}>
                        <input type="number" placeholder={"h"} ref={input1Ref} onKeyDown={e => focusNext(e, input2Ref!)}/> : <input type="number" placeholder={"m"} ref={input2Ref} onKeyDown={e => focusNext(e, input3Ref!)}/> : 
                        <input type="number" placeholder={"s"} ref={input3Ref}/>
                        <div class={style.buttons}>
                            <R8Button class={style.button} onClick={confirmTime}>
                                <BsCaretRightFill/>
                            </R8Button>
                        </div>
                        <p class={style.normalText}>アラームの音量 : {volume*100}%</p>
                    </div>
                </Match>
                <Match when={mode() == "running"}>
                    <div class={style.clock}>
                        <Show when={timerValue()[0]}>
                            {timerValue()[0].toString().padStart(2, "0")} :
                        </Show> {timerValue()[1].toString().padStart(2, "0")} : {timerValue()[2].toString().padStart(2, "0")}
                        <div class={style.circle}>
                            <Circle ref={circleRef}/>
                        </div>
                    </div>
                    <div class={style.buttons}>
                        <Show when={countDownTimerState() == "paused"}>
                            <R8Button class={style.button} onClick={() => { setCountDownTimerState("running"); startCountDownTimer(); }}>
                                <BsCaretRightFill />
                            </R8Button>
                        </Show>
                        <Show when={countDownTimerState() == "running"}>
                            <R8Button class={style.button} onClick={() => { setCountDownTimerState("paused"); stopCountDownTimer(); }}>
                                <BsPauseFill />
                            </R8Button>
                        </Show>
                        <R8Button class={style.button} onClick={() => { setCountDownTimerState("paused"); resetCountDownTimer();setMode("input"); }}>
                            <BsArrowCounterclockwise />
                        </R8Button>
                    </div>
                </Match>

            </Switch>
        </div>
    )
}