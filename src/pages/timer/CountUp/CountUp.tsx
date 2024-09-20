import R8Button from "global/components/button/r8Button/R8Button";
import style from "./CountUp.module.scss";
import { BsArrowCounterclockwise, BsCaretRightFill, BsPauseFill } from "solid-icons/bs";
import { setTimerState, timerState } from "global/states/timerState";
import { getTime, resetTimer, startTimer, stopTimer } from "@/features/timerbackend/countup";
import { createEffect, createSignal, onMount, Show } from "solid-js";


export default () => {

    const [timerValue, setTimerValue] = createSignal<Array<number>>([0, 0, 0]);

    let timerInterval: number;

    createEffect(() => {
        if (timerState() == "running") {
            timerInterval = setInterval(parseTimer, 100);
        }
    });

    onMount(() => {
        parseTimer();
    })

    function parseTimer() {
        let value = getTime();
        let min = Math.floor(value / 60000);
        value -= 60000 * min;
        let sec = Math.floor(value / 1000);
        value -= 1000 * sec;
        setTimerValue([min, sec, value]);
    }

    return (
        <div class={style.countUp}>

            <div class={style.clock}>
                {timerValue()[0].toString().padStart(2, "0")} : {timerValue()[1].toString().padStart(2, "0")} : {timerValue()[2].toString().padStart(3, "0")}
            </div>

            <div class={style.buttons}>
                <Show when={timerState() == "paused"}>
                    <R8Button class={style.button} onClick={() => { setTimerState("running"); startTimer(); }}>
                        <BsCaretRightFill />
                    </R8Button>
                </Show>
                <Show when={timerState() == "running"}>
                    <R8Button class={style.button} onClick={() => { setTimerState("paused"); stopTimer(); }}>
                        <BsPauseFill />
                    </R8Button>
                </Show>
                <R8Button class={style.button} onClick={() => { setTimerState("paused"); resetTimer(); }}>
                    <BsArrowCounterclockwise />
                </R8Button>
            </div>

        </div >
    )
}