import { JSX } from "solid-js";

import style from "./r8Button.module.scss";
import clsx from "clsx";


export default (props: JSX.HTMLAttributes<HTMLButtonElement>) => {
    return (
        <button {...props} class={clsx(props.class, style.r8Button)}>
            {props.children}
        </button>
    )
}