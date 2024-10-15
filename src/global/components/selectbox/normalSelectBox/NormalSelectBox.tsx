import * as solid from "solid-js";
import { BsCaretDownFill } from "solid-icons/bs";
import clsx from "clsx";
import { Transition, TransitionGroup } from "solid-transition-group";

import style from './NormalSelectBox.module.scss';
import hotkeys from "hotkeys-js";




interface selectBoxPropsType extends propsType {
    contents: Array<selectContents>
    onChange?: FunctionWithType<selectContents["value"]>
    value: selectContents
}

interface optionProps {
    changeValue: FunctionWithType<MouseEvent & { target: Element, currentTarget: HTMLButtonElement }, any>
    value: any
    label: string
}


const SelectBox: solid.Component<selectBoxPropsType> = (props) => {
    const [value, setValue] = solid.createSignal<any>(props.value.value);
    const [label, setLabel] = solid.createSignal<solid.JSXElement>(props.value.label);

    let wrapperRef: HTMLDivElement | undefined;

    solid.onMount(() => {
        hotkeys("Esc", () => wrapperRef?.blur());
    });

    solid.onCleanup(() => {
        hotkeys.unbind();
    });

    function changeValue(e: MouseEvent & { target: Element, currentTarget: HTMLButtonElement }, value: any) {
        setValue(value);
        setLabel(props.contents.find(v => v.value == value)?.label || "");
        if (props.onChange)
            props.onChange(value);

        wrapperRef?.blur();
    }


    return (
        <div class={clsx(style.selectBox, props.class)} ref={wrapperRef}>
            <button class={clsx(style.label)}>
                <span>{label()}</span>
                <BsCaretDownFill />
            </button>

            <div class={clsx(style.selector)}>
                <solid.For each={props.contents}>
                    {({ value, label }) => <Selector {...{ changeValue, value, label }} />}
                </solid.For>
            </div>
        </div>
    )
}


const Selector: solid.Component<optionProps> = (props) => {
    let optionRef: HTMLButtonElement | undefined

    function handleChange(e: MouseEvent & { target: Element, currentTarget: HTMLButtonElement }) {
        props.changeValue(e, props.value);
        e.currentTarget.blur();
    }

    return (
        <button class={style.options} onClick={handleChange} ref={optionRef}>
            {props.label}
        </button>
    )
}
export default SelectBox;