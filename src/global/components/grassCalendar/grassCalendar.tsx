import clsx from "clsx"
import getMonthData from "global/utils/getMonthData"
import { For, JSX } from "solid-js";
import * as solid from "solid-js";

import style from "./grassCalendar.module.scss";
import classificatoryTaxonomy from "global/utils/classificatoryTaxonomy";
import getQuantile from "global/utils/getQuantile";


interface glassCalendarProps extends JSX.HTMLAttributes<HTMLDivElement> {
    year: number,
    month: number,
    data: Array<number>
}



export default (props: glassCalendarProps) => {

    const [firstDay, monthLength] = getMonthData(props.year, props.month);
    const weeks = Math.ceil((monthLength - (7 - firstDay)) / 7) + 1;
    let data = [];

    const [min, q1, mid, q3, max] = getQuantile(props.data);

    for (let i = 0; i < weeks; i++) {
        data[i] = new Array(7);
        if (i == 0) {
            for (let j = 0; j < 7 - firstDay; j++) {
                data[i][j + firstDay] = classificatoryTaxonomy(props.data[i], q1, mid, q3);
            }

        } else {
            for (let j = 0; j < 7; j++) {
                data[i][j] = classificatoryTaxonomy(props.data[7 * i - firstDay], q1, mid, q3);
            }
        }
    }

    return (
        <div {...props} class={clsx(props.class, style.calendar)}>
            <div class={style.days}>
                <span class={style.sun}>日</span><span>月</span><span>火</span><span>水</span>
                <span>木</span><span>金</span> <span class={style.sat}>土</span>
            </div>
            <For each={data}>

            </For>
        </div>
    )
}