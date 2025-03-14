import R8Button from "global/components/button/r8Button/R8Button";
import style from "./CountUp.module.scss";
import { BsArrowCounterclockwise, BsCaretRightFill, BsPauseFill } from "solid-icons/bs";
import { setCountUpTimerState, countUpTimerState } from "global/states/timerState";
import { getCountUpTime, resetCountUpTimer, startCountUpTimer, stopCountUpTimer } from "@/features/timerbackend/countup";
import {createEffect, createSignal, onCleanup, onMount, Show} from "solid-js";
import SaveDialog from "pages/timer/saveDialog/saveDialog.tsx";
import {setShowModal, showModal} from "pages/timer/state/modal.ts";
import {Transition} from "solid-transition-group";


export default () => {

    const [timerValue, setTimerValue] = createSignal<Array<number>>([0, 0, 0, 0]);

    let timerInterval: number;

    createEffect(() => {
        if (countUpTimerState() == "running") {
            timerInterval = setInterval(parseTimer, 100);
        }else{
            clearInterval(timerInterval);
        }
    });
    
    onCleanup(()=>{
        clearInterval(timerInterval);
    })
    

    function parseTimer() {
        let value = getCountUpTime();
        let hour = Math.floor(value / 3600000);
        value -= 3600000 * hour;
        let min = Math.floor(value / 60000);
        value -= 60000 * min;
        let sec = Math.floor(value / 1000);
        value -= 1000 * sec;
        setTimerValue([hour,min, sec, value]);
    }

    


    return (
        <div class={style.countUp}>

            <div class={style.clock}>
                <Show when={timerValue()[0]}>
                    <span class={style.number}>{timerValue()[0].toString().padStart(2, "0")}</span>
                    <span class={style.colon}>:</span>
                </Show>
                <span class={style.number}>{timerValue()[1].toString().padStart(2, "0")}</span>
                <span class={style.colon}>:</span>
                <span class={style.number}>{timerValue()[2].toString().padStart(2, "0")}</span>
                <span class={style.colon}>:</span>
                <span class={style.number} style={{width:"1.5em"}}>{timerValue()[3].toFixed(0).toString().padStart(3, "0")}</span>
            </div>

            <div class={style.buttons}>
                <Show when={countUpTimerState() == "paused"}>
                    <R8Button class={style.button} onClick={() => { setCountUpTimerState("running"); startCountUpTimer(); }}>
                        <BsCaretRightFill />
                    </R8Button>
                </Show>
                <Show when={countUpTimerState() == "running"}>
                    <R8Button class={style.button} onClick={() => { setCountUpTimerState("paused"); stopCountUpTimer(); }}>
                        <BsPauseFill />
                    </R8Button>
                </Show>
                <R8Button class={style.button} onClick={() => { setCountUpTimerState("paused"); resetCountUpTimer();setTimerValue([0,0,0,0]) }}>
                    <BsArrowCounterclockwise />
                </R8Button>
                <R8Button class={style.button} onclick={() => {setShowModal(true)}}>
                    学習記録に保存する
                </R8Button>
            </div>
            
                    <SaveDialog/>
            
        </div >
    )
}