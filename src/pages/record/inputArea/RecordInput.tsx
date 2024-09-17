import subjectMap from "assets/subjectMap.json";

import style from "./RecordInput.module.scss";
import NumberInput from "global/components/input/numberinput/NumberInput";
import { createSignal, Show } from "solid-js";


interface recordInputProps {
    subject: keyof typeof subjectMap
}

export default (props: recordInputProps) => {

    const [textLength, setTextLength] = createSignal(0)

    return (
        <div class={style.inputArea}>
            <h3>{subjectMap[props.subject]}</h3>
            <span>学習時間</span>
            <div class={style.timeInput}>
                <NumberInput min={0} max={23} step={1} class={style.input} value={0} /> :
                <NumberInput min={0} max={59} step={5} class={style.input} value={0} />
            </div>
            振り返り
            <div class={style.reflection} contentEditable onInput={e => setTextLength(e.target.textContent?.length || 0)}></div>
            <Show when={!textLength()}><span class={style.placeholder}>振り返りを入力してみましょう</span></Show>
            <div class={style.reflectionCounter}>
                {textLength()}文字
            </div>
        </div>
    )
}