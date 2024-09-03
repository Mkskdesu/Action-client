import { JSX } from "solid-js";

import style from "./IconButton.module.scss";
import clsx from "clsx";


export default (props: JSX.HTMLAttributes<HTMLButtonElement>) => {
    return (
        <button {...props} class={clsx(props.class, style.iconButton)}>
            {props.children}
        </button>
    )
}