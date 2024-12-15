import * as solid from "solid-js";
import { BsCaretDownFill } from 'solid-icons/bs'

import style from "./NormalSelectBox.module.scss";
import clsx from "clsx";
import {createSignal} from "solid-js";

interface normalSelectBoxProps {
    class?: string
    value: { label: solid.JSXElement, value:any }
    contents: Array<{ label: solid.JSXElement, value:any }>
    onChange?: (e:any)=>void
}

interface optionProps {
    onClick?: (e:any) => void
    label: solid.JSXElement 
    value: any
}


export default(props:normalSelectBoxProps) => {

    let labelRef: HTMLButtonElement | undefined;
    
    const [label,setLabel] = createSignal(props.value.label||props.contents[0].label);

    
    function handleChange(e:{label:string,value:any}) {
        setLabel(e.label);
        props.onChange && props.onChange(e.value);
    }

    return (
        <div class={clsx(style.selectBox, props.class)} tabIndex={0}>
            <button class={clsx(style.label)} ref={labelRef} tabIndex={0} onClick={e => e.currentTarget.focus()}>
                <span>{label()}</span>
                <BsCaretDownFill />
            </button>

            <div class={clsx(style.selector)}>
                <solid.For each={props.contents}>
                    {({ value, label }) => <Selector {...{ value, label }} onClick={handleChange} />}
                </solid.For>
            </div>
        </div>
    )
}

const Selector: solid.Component<optionProps> = (props) => {
    let optionRef: HTMLButtonElement | undefined

    function handleChange(e: MouseEvent & { target: Element, currentTarget: HTMLButtonElement }) {
        e.currentTarget.focus();
        //if (props.onClick) props.onClick(props.value);
        props.onClick && props.onClick({label:props.label,value:props.value})
        e.currentTarget.blur();
    }

    return (
        <button class={style.options} onClick={handleChange} ref={optionRef} tabIndex={0} onPointerDown={e=>e.currentTarget.focus()}>
            {props.label}
        </button>
    )
}

