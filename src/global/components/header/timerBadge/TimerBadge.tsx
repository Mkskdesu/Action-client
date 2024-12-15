import style from "./TimerBadge.module.scss"

import {BsClock} from "solid-icons/bs";
import {createEffect, createSignal, Match, on, onCleanup, Setter, Show, Switch} from "solid-js";
import {countDownTimerState, countUpTimerState} from "global/states/timerState.ts";
import {getCountUpTime} from "@/features/timerbackend/countup.ts";
import {getCountDownTime} from "@/features/timerbackend/countdown.ts";
import {Transition} from "solid-transition-group";
import {useNavigate} from "@solidjs/router";

export default () =>{

    const [countUpTimerValue, setCountUpTimerValue] = createSignal<Array<number>>([0, 0, 0]);
    const [countDownTimerValue, setCountDownTimerValue] = createSignal<Array<number>>([0, 0, 0]);

    let countUpTimerInterval: number;
    let countDownTimerInterval: number;
    let animTimeout:number;

    const navigate = useNavigate();

    createEffect(on(countUpTimerState,() => {
        if (countUpTimerState() == "running")
            countUpTimerInterval = setInterval(()=>parseTimer(getCountUpTime(), setCountUpTimerValue), 100);
        else clearInterval(countUpTimerInterval);

    }));
    createEffect(on(countDownTimerState,() => {
        if (countDownTimerState() == "running")
            countDownTimerInterval = setInterval(()=>parseTimer(getCountDownTime(), setCountDownTimerValue), 100);
        else clearInterval(countDownTimerInterval);

    }));

    onCleanup(()=>{
        clearInterval(countUpTimerInterval);
        clearInterval(countDownTimerInterval);
        clearTimeout(animTimeout);
    });

    function parseTimer(value:number,setter:Setter<Array<number>>) {
        
        let hour = Math.floor(value / 3600000);
        value -= 3600000 * hour;
        let min = Math.floor(value / 60000);
        value -= 60000 * min;
        let sec = Math.floor(value / 1000);
        setter([hour,min, sec]);
    }
    
    function handleClick(){
        navigate("/~/timer")
    }
    
    return (
        /*<Transition onEnter={enter} onExit={exit}>
            <Show when={countUpTimerState()== "running" || countDownTimerState() == "running"} fallback={<div></div>}>*/
                <div class={style.badge} onClick={handleClick}>
                    <BsClock />
                    <Switch>
                        <Match when={countUpTimerState()=="running"}>
                            <div class={style.clock}>
                                <Show when={countUpTimerValue()[0]}>
                                    <span class={style.number}>{countUpTimerValue()[0].toString().padStart(2, "0")}</span>
                                    <span class={style.colon}>:</span>
                                </Show>
                                <span class={style.number}>{countUpTimerValue()[1].toString().padStart(2, "0")}</span>
                                <span class={style.colon}>:</span>
                                <span class={style.number}>{countUpTimerValue()[2].toString().padStart(2, "0")}</span>
                            </div>
                        </Match>
                        <Match when={countDownTimerState() == "running"}>
                            <div class={style.clock}>
                                <Show when={countDownTimerValue()[0]}>
                                    <span class={style.number}>{countDownTimerValue()[0].toString().padStart(2, "0")}</span>
                                    <span class={style.colon}>:</span>
                                </Show>
                                <span class={style.number}>{countDownTimerValue()[1].toString().padStart(2, "0")}</span>
                                <span class={style.colon}>:</span>
                                <span class={style.number}>{countDownTimerValue()[2].toString().padStart(2, "0")}</span>
                            </div>
                        </Match>
                    </Switch>
                </div>
        /*    </Show>
        </Transition>*/
    )
}