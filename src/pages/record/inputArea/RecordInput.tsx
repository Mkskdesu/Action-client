import subjectMap from "assets/subjectMap.json";

import style from "./RecordInput.module.scss";
import NumberInput from "global/components/input/numberinput/NumberInput";
import { createEffect, createSignal, onMount, Show, untrack } from "solid-js";
import { record, recordDate, setRecord } from "../states/state";
import { unwrap } from "solid-js/store";


interface recordInputProps {
    subject: keyof typeof subjectMap
}

export default (props: recordInputProps) => {

    const [textLength, setTextLength] = createSignal(0);
    const [hour, setHour] = createSignal(0);
    const [minute, setMinute] = createSignal(0);

    let hourRef: HTMLInputElement | undefined;
    let minuteRef: HTMLInputElement | undefined;
    let inputRef: HTMLDivElement | undefined;

    const initialData = unwrap(record)[props.subject];
    const initialHour = Math.floor(initialData.time / 60);
    const initialMinute = initialData.time - (initialHour * 60);

    createEffect(() => {
        const time = Math.min(Math.max(0, 60 * hour() + minute()), 1440)
        setRecord(props.subject, { time });
    });

    createEffect(() => {
        try {
            const date = recordDate();
            const record = JSON.parse(localStorage.getItem("record") || "{}");
            if (!record) return;
            const data = record?.[`y${date?.year()}`]?.[`m${date?.month()}`]?.[`d${date?.date()}`][props.subject];
            if (!data) return;
            if (hourRef) hourRef.value = Math.floor(data.time / 60).toString();
            if (minuteRef) minuteRef.value = (data.time - Math.floor(data.time / 60) * 60).toString();
            if (inputRef) inputRef.textContent = data.reflection.toString();
            setTextLength(data.reflection.length);
        } catch (error) {
            if (hourRef) hourRef.value = "0";
            if (minuteRef) minuteRef.value = "0";
            if (inputRef) inputRef.textContent = "";
            setTextLength(0);
        }
    })

    function handleInput(e: InputEvent & { currentTarget: HTMLDivElement; target: Element; }) {
        setTextLength(e.target.textContent?.length || 0);
    }
    function confirmText(e: FocusEvent & { currentTarget: HTMLDivElement; target: Element; }) {
        setRecord(props.subject, { reflection: e.target.textContent || "" });
    }

    return (
        <div class={style.inputArea} tabIndex={0}>
            <h3 class={style.title} data-subject={props.subject}>{subjectMap[props.subject]}</h3>
            <span>学習時間</span>
            <div class={style.timeInput}>
                <NumberInput min={0} max={23} step={1} class={style.input} value={initialHour} onUpdate={e => setHour(Number(e))} ref={hourRef} /> :
                <NumberInput min={0} max={59} step={5} class={style.input} value={initialMinute} onUpdate={e => setMinute(Number(e))} ref={minuteRef} />
            </div>
            振り返り
            <div class={style.reflection} contentEditable onInput={handleInput} onBlur={confirmText} textContent={initialData.reflection} ref={inputRef}></div>
            <Show when={!textLength()} fallback={
                <div class={style.reflectionCounter}>
                    {textLength()}文字
                </div>}
            >
                <span class={style.placeholder}>振り返りを入力してみましょう</span>
            </Show>

        </div>
    )
}