
import style from "./CountDown.module.scss"
import {createSignal, Match, Switch} from "solid-js";
import NumberInput from "global/components/input/numberinput/NumberInput.tsx";
import {setTimerState} from "global/states/timerState.ts";
import {startTimer} from "@/features/timerbackend/countup.ts";
import {BsCaretRightFill} from "solid-icons/bs";
import R8Button from "global/components/button/r8Button/R8Button.tsx";
import {mode} from "pages/timer/state/countdownState.ts";

export default () =>{

    const [timerValue, setTimerValue] = createSignal<Array<number>>([0, 0, 0]);
    let input1Ref: HTMLInputElement|undefined;
    let input2Ref: HTMLInputElement|undefined;
    let input3Ref: HTMLInputElement|undefined;
    
    function focusNext(e:KeyboardEvent,elem: HTMLInputElement) {
        if (e.key.toLowerCase() != "enter") return;
        elem.focus();
    }
    
    
    return(
        <div class={style.countdown}>
            <Switch>
                <Match when={mode() == "input"}>
                    <div class={style.input}>
                        <input type="number" placeholder={"h"} ref={input1Ref} onKeyDown={e => focusNext(e, input2Ref!)}/> : <input type="number" placeholder={"m"} ref={input2Ref} onKeyDown={e => focusNext(e, input3Ref!)}/> : 
                        <input type="number" placeholder={"s"} ref={input3Ref}/>
                        <div class={style.buttons}>
                            <R8Button class={style.button} onClick={() => {}}>
                                <BsCaretRightFill/>
                            </R8Button>
                        </div>
                    </div>
                </Match>

            </Switch>
        </div>
    )
}