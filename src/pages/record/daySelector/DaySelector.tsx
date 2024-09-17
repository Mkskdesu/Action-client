import { Accessor, For, Setter, Signal } from "solid-js";
import { BsCalendar3, BsCaretLeftFill, BsCaretRightFill } from "solid-icons/bs";
import dayjs from "dayjs";

import createWeekCalendar from "global/utils/createWeekCalendar";
import IconButton from "global/components/button/iconButton/IconButton";
import R8Button from "global/components/button/r8Button/R8Button";

import style from "./DaySelector.module.scss";
import { recordDate, setRecordDate, setWeekCalendar, weekCalendar } from "../states/state";
import DatePicker from "@rnwonder/solid-date-picker";
import "@rnwonder/solid-date-picker/dist/style.css";


interface daySelectorProps {

    calendarBase: dayjs.Dayjs
}

export default (props: daySelectorProps) => {

    function updateWeekCalendar(offset: 1 | 0 | -1) {
        if (offset == 1) props.calendarBase = props.calendarBase.add(1, "week");
        if (offset == -1) props.calendarBase = props.calendarBase.subtract(1, "week");
        setWeekCalendar(createWeekCalendar(props.calendarBase));
    }

    return (
        <div class={style.daySelect}>
            <hr />
            <div class={style.selector}>
                <div class={style.calendarIconWrapper}>
                    <DatePicker
                        renderInput={({ showDate }) => (
                            <IconButton class={style.calendarIcon} onClick={showDate}>
                                <BsCalendar3 />
                            </IconButton>
                        )}
                        onChange={data => {
                            if (data.type !== 'single' || !data.selectedDate) return;
                            console.log(data.selectedDate);

                            props.calendarBase = dayjs().year(data.selectedDate.year || dayjs().year()).month(data.selectedDate.month || dayjs().month()).date(data.selectedDate.day || dayjs().date())
                            setRecordDate(props.calendarBase.clone().startOf("day"));
                            updateWeekCalendar(0);
                        }}
                    />
                </div>

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