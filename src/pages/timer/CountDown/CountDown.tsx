
import style from "./CountDown.module.scss"
import {createSignal} from "solid-js";
import NumberInput from "global/components/input/numberinput/NumberInput.tsx";

export default () =>{

    const [timerValue, setTimerValue] = createSignal<Array<number>>([0, 0, 0]);
    
    
    
    return(
        <div class={style.countdown}>
            <div class={style.input}>
                <input type="number"/> : <input type="number"/> : <input type="number"/>
            </div>
        </div>
    )
}