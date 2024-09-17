import dayjs from "dayjs";
import { onMount } from "solid-js";

import { setBottomBarState } from "global/states/bottomBarState";
import { setPageTitle } from "global/states/pageTitleState";

import createWeekCalendar from "global/utils/createWeekCalendar";
import DaySelector from "./daySelector/DaySelector";
import { recordDate, setRecordDate, setWeekCalendar } from "./states/state";

import style from "./Record.module.scss";
import RecordInput from "./inputArea/RecordInput";
import R8Button from "global/components/button/r8Button/R8Button";


export default () => {

    const today = dayjs().startOf("day");
    let calendarBase = today.clone();

    setRecordDate(today);


    onMount(() => {
        setPageTitle("記録");
        setBottomBarState("record");
        setWeekCalendar(createWeekCalendar(calendarBase));
    });


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
                    <R8Button>内容を消去</R8Button>
                    <R8Button>この内容で保存する</R8Button>
                </div>

            </div>
        </div>
    )

}