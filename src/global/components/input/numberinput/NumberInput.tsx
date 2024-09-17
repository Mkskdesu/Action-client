import { JSX, Show, splitProps } from "solid-js";

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
}

export default (props: numberInputProps) => {

    const [local, others] = splitProps(props, ["class"]);

    let inputRef: HTMLInputElement | undefined;

    function spinUp() {
        if (!inputRef) return;
        inputRef.value = (Math.min(Number(inputRef.value) + (props.step || 1), props.max ?? Infinity)).toString();
    }

    function spinDown() {
        if (!inputRef) return;
        inputRef.value = (Math.max(Number(inputRef.value) - (props.step || 1), props.min ?? -Infinity)).toString();
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