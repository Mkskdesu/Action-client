import { JSX } from "solid-js";
import clsx from "clsx";
import style from "./ToggleInput.module.scss";


interface toggleProps extends JSX.HTMLAttributes<HTMLInputElement>{
    type?:"checkbox"
}

export default (props:toggleProps) => {
    return (
        <input {...props} type="checkbox" class={clsx(props.class,style.toggle)} />
    )
}