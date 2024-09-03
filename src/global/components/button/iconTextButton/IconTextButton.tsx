import { JSX, JSXElement } from "solid-js";

import style from "./IconTextButton.module.scss";
import clsx from "clsx";

interface iconTextButtonProps extends JSX.HTMLAttributes<HTMLButtonElement> {
    icon: JSXElement
}
export default (props: iconTextButtonProps) => {
    return (
        <button {...props} class={clsx(props.class, style.iconButton)}>
            <div class={style.icon}>
                {props.icon}
            </div>
            {props.children}
        </button>
    )
}