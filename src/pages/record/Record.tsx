import dayjs from "dayjs";
import { createEffect, createSignal, on, onMount } from "solid-js";

import { setBottomBarState } from "global/states/bottomBarState";
import { setPageTitle } from "global/states/pageTitleState";

import createWeekCalendar from "global/utils/createWeekCalendar";
import DaySelector from "./daySelector/DaySelector";
import { record, recordDate, setRecordDate, setWeekCalendar } from "./states/state";

import style from "./Record.module.scss";
import RecordInput from "./inputArea/RecordInput";
import R8Button from "global/components/button/r8Button/R8Button";


export default () => {

    const today = dayjs().startOf("day");
    let calendarBase = today.clone();

    const [totalStudyTime,setTotalStudyTime] = createSignal(0);

    setRecordDate(today);

    onMount(() => {
        setPageTitle("記録");
        setBottomBarState("record");
        setWeekCalendar(createWeekCalendar(calendarBase));
    });

    createEffect(()=>{
        const rec = record;
        let total = 0;
        for (const i in rec) {
            total += record[i].time;
        }
        
        setTotalStudyTime(total);
    })


    return (

        <div class={style.record}>
            <DaySelector {...{ calendarBase }} />
            <div class={style.main}>
                <div class={style.title}>
                    <h2>{(recordDate() || dayjs()).format("MM月DD日")}の学習記録</h2>
                </div>
                <div class={style.inputArea}>
                    <RecordInput subject="english" />
                    <RecordInput subject="math" />
                    <RecordInput subject="japanese" />
                    <RecordInput subject="social" />
                    <RecordInput subject="science" />
                    <RecordInput subject="other" />
                </div>
                <div class={style.buttonArea}>
                    <h3>総学習時間 : {dayjs.duration(totalStudyTime(), "minute").format("HH時間mm分")}</h3>
                    <R8Button class={style.clear}>内容を消去</R8Button>
                    <R8Button>この内容で保存する</R8Button>
                </div>

            </div>
        </div>
    )

}