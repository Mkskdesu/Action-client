import dayjs from "dayjs";
import { createEffect, createSignal, on, onMount, Show } from "solid-js";

import { setBottomBarState } from "global/states/bottomBarState";
import { setPageTitle } from "global/states/pageTitleState";

import createWeekCalendar from "global/utils/createWeekCalendar";
import DaySelector from "./daySelector/DaySelector";
import { record, recordDate, setRecord, setRecordDate, setWeekCalendar } from "./states/state";

import style from "./Record.module.scss";
import RecordInput from "./inputArea/RecordInput";
import R8Button from "global/components/button/r8Button/R8Button";
import { BsX } from "solid-icons/bs";
import { Transition } from "solid-transition-group";
import { reconcile } from "solid-js/store";


export default () => {

    const today = dayjs().startOf("day");
    let calendarBase = today.clone();

    const [totalStudyTime, setTotalStudyTime] = createSignal(0);
    const [showResetModal, setShowResetModal] = createSignal(false);
    setRecordDate(today);

    onMount(() => {
        setPageTitle("記録");
        setBottomBarState("record");
        setWeekCalendar(createWeekCalendar(calendarBase));
    });

    createEffect(() => {
        const rec = record;
        let total = 0;
        for (const i in rec) {
            total += record[i].time;
        }

        setTotalStudyTime(total);
    });

    function modalEnter(e: Element, done: () => void) {
        e.classList.remove(style.exit);
        e.classList.add(style.enter);
        e.querySelector(`div.${style.inner}`)?.classList.remove(style.exit);
        e.querySelector(`div.${style.inner}`)?.classList.add(style.enter);
        done();
    }
    function modalExit(e: Element, done: () => void) {
        e.classList.remove(style.enter);
        e.classList.add(style.exit);
        e.querySelector(`div.${style.inner}`)?.classList.remove(style.enter);
        e.querySelector(`div.${style.inner}`)?.classList.add(style.exit);
        setTimeout(() => {
            done();
        }, 500);
    }


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
                    <R8Button class={style.clear} onClick={() => setShowResetModal(true)}>内容を消去</R8Button>
                    <R8Button>この内容で保存する</R8Button>
                </div>
            </div>
            <Transition onEnter={modalEnter} onExit={modalExit}>
                <Show when={showResetModal()}>
                    <div class={style.resetModal} onClick={() => setShowResetModal(false)}>
                        <div class={style.inner} onClick={e => e.stopPropagation()}>
                            <div class={style.title}>
                                <h2>操作を行う前に</h2>
                                <button onClick={() => setShowResetModal(false)} ><BsX /></button>
                            </div>
                            <hr />
                            <p>
                                入力内容を消去しますか？保存されているデータは変更されません。 <br />
                                <b>この操作を取り消すことはできません！</b>
                            </p>
                            <div class={style.buttonArea}>
                                <R8Button class={style.delete} onClick={() => { setRecord(reconcile({})); setShowResetModal(false) }}>
                                    消去する
                                </R8Button>
                                <R8Button onClick={() => setShowResetModal(false)}>
                                    キャンセル
                                </R8Button>
                            </div>
                        </div>
                    </div>
                </Show>
            </Transition>
        </div>
    )

}