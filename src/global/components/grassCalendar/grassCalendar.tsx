import clsx from "clsx"
import getMonthData from "global/utils/getMonthData"
import {createSignal, For, JSX, on, Show} from "solid-js";
import * as solid from "solid-js";

import style from "./grassCalendar.module.scss";
import classificatoryTaxonomy from "global/utils/classificatoryTaxonomy";
import getQuantile from "global/utils/getQuantile";
import dayjs, { Dayjs } from "dayjs";
import getRecords from "./getRecords";
import sumArray from "global/utils/sumArray.ts";


interface glassCalendarProps extends JSX.HTMLAttributes<HTMLDivElement> {
    monthBase: solid.Accessor<Dayjs>,
}

export default (props: glassCalendarProps) => {

    //const [firstDay, monthLength] = getMonthData(props.year, props.month);
    //const calendarBase = dayjs().year(props.year).month(props.month)
    const [calendarData, setCalendarData] = solid.createSignal<Array<Array<number>>>([]);
    const [total,setTotal] = createSignal(0);
    let firstDay:number;
    let records:Array<number>;

    solid.createEffect(on(props.monthBase, v => {
        renderCalendar(v);
    }));

    function renderCalendar(monthBase:Dayjs) {
        firstDay = monthBase.day();
        const monthLength = monthBase.daysInMonth();
        
        const weeks = Math.ceil((monthLength - (7 - firstDay)) / 7) + 1;
        records = getRecords(monthBase);
        let data = [];
        const [min, q1, mid, q3, max] = getQuantile(records);
        console.log(min, q1, mid, q3, max)

        let index = 0;
        for (let i = 0; i < weeks; i++) {
            data[i] = new Array(7);
            if (i == 0) {
                for (let j = 0; j < 7 - firstDay; j++) {
                    data[i][j + firstDay] = classificatoryTaxonomy(records[j], q1, mid, q3);
                    index++;
                }

            } else {
                for (let j = 0; j < 7; j++) {
                    //if ((7 * i - firstDay + j) > (monthLength - firstDay + 1)) continue;
                    if (index+1 > monthLength) continue;
                    data[i][j] = classificatoryTaxonomy(records[7 * i - firstDay + j], q1, mid, q3);
                    index++;
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
                    (week, i) => (
                        <div class={style.weekRow}>
                            <For each={week}>
                                {
                                    (day, j) =>{
                                        const dateIndex = i()==0?j()-firstDay:7*i()+j()-firstDay;
                                        const time = records[dateIndex]
                                        return(
                                            <div class={clsx(style.dayBlock)} data-color={day}>
                                                <Show when={dateIndex < props.monthBase().daysInMonth() && dateIndex>-1}>
                                                    <div class={style.tooltip}>
                                                        <span class={style.date}>{props.monthBase().month() + 1} / {dateIndex + 1}</span>
                                                        <span class={style.time}>{dayjs.duration(time||0, "minute").format("HH:mm")}</span>
                                                    </div>
                                                </Show>
                                            </div>
                                        )
                                    }
                                }
                            </For>
                        </div>
                    )
                }
            </For>
    <hr class={style.belowCalendar}/>
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