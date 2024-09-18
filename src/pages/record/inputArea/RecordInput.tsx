import subjectMap from "assets/subjectMap.json";

import style from "./RecordInput.module.scss";
import NumberInput from "global/components/input/numberinput/NumberInput";
import { createEffect, createSignal, Show } from "solid-js";
import { record, setRecord } from "../states/state";


interface recordInputProps {
    subject: keyof typeof subjectMap
}

export default (props: recordInputProps) => {

    const [textLength, setTextLength] = createSignal(0);
    const [hour, setHour] = createSignal(0);
    const [minute, setMinute] = createSignal(0);

    createEffect(() => {
        const time = Math.min(Math.max(0, 60 * hour() + minute()), 1440)
        setRecord(props.subject, { time });
    });

    return (
        <div class={style.inputArea} tabIndex={0}>
            <h3>{subjectMap[props.subject]}</h3>
            <span>学習時間</span>
            <div class={style.timeInput}>
                <NumberInput min={0} max={23} step={1} class={style.input} value={0} onUpdate={e => setHour(Number(e))} /> :
                <NumberInput min={0} max={59} step={5} class={style.input} value={0} onUpdate={e => setMinute(Number(e))} />
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