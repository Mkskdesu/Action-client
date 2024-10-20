import { Accessor, For, Setter, Show, Signal } from "solid-js";
import { BsCalendar3, BsCaretLeftFill, BsCaretRightFill, BsCheckCircleFill } from "solid-icons/bs";
import dayjs from "dayjs";
import DatePicker from "@rnwonder/solid-date-picker";

import createWeekCalendar from "global/utils/createWeekCalendar";
import IconButton from "global/components/button/iconButton/IconButton";
import R8Button from "global/components/button/r8Button/R8Button";
import { recordDate, setRecordDate, setWeekCalendar, weekCalendar } from "../states/state";

import style from "./DaySelector.module.scss";
import "@rnwonder/solid-date-picker/dist/style.css";
import "@rnwonder/solid-date-picker/themes/ark-ui"
import recordExists from "@/features/RecordExists/recordExists";

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
                        data-theme={"dark"}
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
                                <div class={style.datecontainer}>
                                    <span class={style.date}>
                                        {data.format("MM/DD")}
                                    </span>
                                    <span class={style.day}>
                                        {data.format("ddd")}
                                    </span>
                                </div>
                                <Show when={recordExists(data)}>
                                    <BsCheckCircleFill class={style.check} />
                                </Show>
                            </R8Button>
                        )}
                    </For>
                </div>
                <IconButton class={style.arrow} onClick={() => updateWeekCalendar(1)}>
                    <BsCaretRightFill />
                </IconButton>
                <div class={style.spacer}></div>
                <div class={style.spacer}></div>
            </div>
            <hr />
        </div>
    )
}