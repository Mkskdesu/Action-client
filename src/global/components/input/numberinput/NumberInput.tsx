import { JSX, onCleanup, onMount, Show, splitProps } from "solid-js";

import style from "./NumberInput.module.scss";
import { BsCaretDownFill, BsCaretUpFill } from "solid-icons/bs";
import clsx from "clsx";


interface numberInputProps extends JSX.HTMLAttributes<HTMLInputElement> {
    type?: "number"
    min?: number
    max?: number
    step?: number
    value?: number
    nospin?: boolean
    onUpdate?: (e:number) => unknown
}

export default (props: numberInputProps) => {

    const [local, others] = splitProps(props, ["class", "onUpdate"]);

    let inputRef: HTMLInputElement | undefined;

    onMount(()=>{
        inputRef?.addEventListener("input",e=>{
            props.onUpdate && props.onUpdate(Number((e.target as HTMLInputElement).value))
        });
    });

    onCleanup(() => {
        inputRef?.removeEventListener("input", e => {
            props.onUpdate && props.onUpdate(Number((e.target as HTMLInputElement).value))
        });
    });

    function spinUp() {
        if (!inputRef) return;
        const newValue = (Math.min(Number(inputRef.value) + (props.step || 1), props.max ?? Infinity)).toString();
        inputRef.value = newValue;
        props.onUpdate && props.onUpdate(Number(newValue));
    }

    function spinDown() {
        if (!inputRef) return;
        const newValue = (Math.max(Number(inputRef.value) - (props.step || 1), props.min ?? -Infinity)).toString();
        inputRef.value = newValue;
        props.onUpdate && props.onUpdate(Number(newValue));
    }

    return (
        <div class={clsx(style.numberInput, local.class)} data-nospin={props.nospin}>
            <input type="number" {...others} ref={inputRef} />
            <Show when={props.nospin !== true}>
                <div class={style.spin}>
                    <button onClick={spinUp}><BsCaretUpFill /></button>
                    <button onClick={spinDown}><BsCaretDownFill /></button>
                </div>
            </Show>
        </div>
    )
}