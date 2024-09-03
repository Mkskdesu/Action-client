import { createEffect } from "solid-js";

import { setPageTitle } from "global/states/pageTitleState";
import IconButton from "global/components/button/iconButton/IconButton";

import style from "./Dashboard.module.scss";
import { CgChevronLeft, CgChevronRight } from "solid-icons/cg";
import IconTextButton from "global/components/button/iconTextButton/IconTextButton";
import clsx from "clsx";



export default () => {

    createEffect(() => {
        setPageTitle("ホーム");
    });

    return (
        <div class={style.dashboard}>
            <div class={style.grassCalendar}>
                <div class={style.title}>
                    <h2>{new Date().getFullYear()} 年 {new Date().getMonth() + 1} 月</h2>
                    <IconTextButton class={style.button} icon={<CgChevronLeft />}>
                        前月
                    </IconTextButton>
                    <IconTextButton class={style.button} icon={<CgChevronRight />}>
                        次月
                    </IconTextButton>
                    <button class={clsx(style.button, style.detailsbutton)}>詳細</button>
                </div>
            </div>
        </div>
    )
}