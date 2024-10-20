import clsx from "clsx"
import getMonthData from "global/utils/getMonthData"
import { For, JSX, on } from "solid-js";
import * as solid from "solid-js";

import style from "./grassCalendar.module.scss";
import classificatoryTaxonomy from "global/utils/classificatoryTaxonomy";
import getQuantile from "global/utils/getQuantile";
import dayjs, { Dayjs } from "dayjs";
import getRecords from "./getRecords";


interface glassCalendarProps extends JSX.HTMLAttributes<HTMLDivElement> {
    monthBase: solid.Accessor<Dayjs>,
}

export default (props: glassCalendarProps) => {

    //const [firstDay, monthLength] = getMonthData(props.year, props.month);
    //const calendarBase = dayjs().year(props.year).month(props.month)
    const [calendarData, setCalendarData] = solid.createSignal<Array<Array<number>>>([]);

    solid.createEffect(on(props.monthBase, v => {
        renderCalendar(v);
    }));

    function renderCalendar(monthBase:Dayjs) {
        const firstDay = monthBase.day();
        const monthLength = monthBase.daysInMonth();
        const weeks = Math.ceil((monthLength - (7 - firstDay)) / 7) + 1;
        const records = getRecords(monthBase);
        let data = [];
        const [min, q1, mid, q3, max] = getQuantile(records);
        //console.log(min, q1, mid, q3, max);


        for (let i = 0; i < weeks; i++) {
            data[i] = new Array(7);
            if (i == 0) {
                for (let j = 0; j < 7 - firstDay; j++) {
                    data[i][j + firstDay] = classificatoryTaxonomy(records[i], q1, mid, q3);
                }

            } else {
                for (let j = 0; j < 7; j++) {
                    if ((7 * i - firstDay + j) > (monthLength - firstDay + 1)) continue;
                    data[i][j] = classificatoryTaxonomy(records[7 * i - firstDay + j], q1, mid, q3);
                }
            }
        }
        setCalendarData(data);
    }




    return (
        <div {...props} class={clsx(props.class, style.calendar)}>
            <div class={style.days}>
                <span class={style.sun}>日</span><span>月</span><span>火</span><span>水</span>
                <span>木</span><span>金</span> <span class={style.sat}>土</span>
            </div>
            <For each={calendarData()}>
                {
                    week => (
                        <div class={style.weekRow}>
                            <For each={week}>
                                {
                                    day =>
                                        <div class={clsx(style.dayBlock)} data-color={day}></div>
                                }
                            </For>
                        </div>
                    )
                }
            </For>
            <hr class={style.belowCalendar} />
            <div class={style.example}>
                少
                <div class={style.dayBlock} data-color={-1}></div>
                <div class={style.dayBlock} data-color={0}></div>
                <div class={style.dayBlock} data-color={1}></div>
                <div class={style.dayBlock} data-color={2}></div>
                <div class={style.dayBlock} data-color={3}></div>
                多
            </div>
        </div>
    )
}