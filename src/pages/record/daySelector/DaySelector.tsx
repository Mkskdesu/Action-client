import { Accessor, For, Setter, Signal } from "solid-js";
import { BsCalendar3, BsCaretLeftFill, BsCaretRightFill } from "solid-icons/bs";
import dayjs from "dayjs";

import createWeekCalendar from "global/utils/createWeekCalendar";
import IconButton from "global/components/button/iconButton/IconButton";
import R8Button from "global/components/button/r8Button/R8Button";

import style from "./DaySelector.module.scss";
import { recordDate, setRecordDate, setWeekCalendar, weekCalendar } from "../states/state";


interface daySelectorProps {

    calendarBase: dayjs.Dayjs
}

export default (props: daySelectorProps) => {

    function updateWeekCalendar(offset: 1 | -1) {
        if (offset == 1) props.calendarBase = props.calendarBase.add(1, "week");
        if (offset == -1) props.calendarBase = props.calendarBase.subtract(1, "week");
        setWeekCalendar(createWeekCalendar(props.calendarBase));
    }

    return (
        <div class={style.daySelect}>
            <hr />
            <div class={style.selector}>
                <IconButton class={style.calendarIcon}>
                    <BsCalendar3 />
                </IconButton>
                <div class={style.spacer}></div>
                <IconButton class={style.arrow} onClick={() => updateWeekCalendar(-1)}>
                    <BsCaretLeftFill />
                </IconButton>
                <div class={style.calendar}>
                    <For each={weekCalendar()}>
                        {data => (
                            <R8Button class={style.dayButton} onClick={() => setRecordDate(data)} data-active={data.isSame(recordDate())} >
                                <span class={style.date}>
                                    {data.format("MM/DD")}
                                </span>
                                <span class={style.day}>
                                    {data.format("ddd")}
                                </span>
                            </R8Button>
                        )}
                    </For>
                </div>
                <IconButton class={style.arrow} onClick={() => updateWeekCalendar(1)}>
                    <BsCaretRightFill />
                </IconButton>
                <div class={style.spacer}></div>
            </div>
            <hr />
        </div>
    )
}