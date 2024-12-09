import { createEffect, createSignal, onMount } from "solid-js";
import { CgChevronLeft, CgChevronRight } from "solid-icons/cg";
import clsx from "clsx";
import dayjs from "dayjs";

import { setBottomBarState } from "global/states/bottomBarState";
import { setPageTitle } from "global/states/pageTitleState";
import IconButton from "global/components/button/iconButton/IconButton";
import IconTextButton from "global/components/button/iconTextButton/IconTextButton";
import GrassCalendar from "global/components/grassCalendar/grassCalendar";
import getWeekNumber from "global/utils/getWeekNumber";

import style from "./Dashboard.module.scss";
import WeeklyGraph from "global/components/weeklyGraph/WeeklyGraph";
import ToggleInput from "global/components/input/toggleInput/ToggleInput";

import checkStreak from "@/features/loginStreak/checkStreak.ts";
import aiSession from "@/features/aiSession/aiSession.ts";
import loginStreakPrompt from "pages/dashboard/aiPrompt/loginStreakPrompt.ts";
import {loginStreak} from "global/states/loginStreak.ts";
import TypeWriter from "global/components/typewriter/TypeWriter.tsx";
import AsyncTypeWriter from "global/components/typewriter/AsyncTypeWriter.tsx";

export default () => {

    let graphAreaRef: HTMLDivElement | undefined;

    const [weekBase, setWeekBase] = createSignal(dayjs().startOf("week"));
    const [monthBase, setMonthBase] = createSignal(dayjs().startOf("month"));
    const [graphUnit, setGraphUnit] = createSignal(false);
    const [loginCounterText,setLoginCounterText] = createSignal("");

    const ai = new aiSession({mode:"server"});
    let streak;

    onMount(() => {
        setPageTitle("ホーム");
        setBottomBarState("home");
        ai.createSession();
        generateStreakText();
    });
    
    function generateStreakText() {
        const result = ai.textPrompt(loginStreakPrompt.sysPrompt,loginStreakPrompt.userPrompt + JSON.stringify({streak:loginStreak()[0], diff:loginStreak()[1], lastLogin: loginStreak()[2]})).then(r=>r?.content||"").then(setLoginCounterText)
        console.log(result);
    }

    return (
        <div class={style.dashboard}>
            <div class={style.loginCounter}>
                <TypeWriter content={`現在 ${loginStreak()[0]} 日連続ログイン中! `} />
                <TypeWriter content={loginCounterText()} />
            </div>
            <div class={style.grassCalendar}>
                <div class={style.title}>
                    <h2>{monthBase().year()} 年 {monthBase().month() + 1} 月</h2>
                    <IconTextButton class={style.button} icon={<CgChevronLeft/>}
                                    onClick={() => setMonthBase(p => p.subtract(1, "month"))}>
                        前月
                    </IconTextButton>
                    <IconTextButton class={style.button} icon={<CgChevronRight/>}
                                    onClick={() => setMonthBase(p => p.add(1, "month"))}>
                        次月
                    </IconTextButton>
                    <button class={clsx(style.button, style.detailsbutton)}>詳細</button>
                </div>
                <GrassCalendar {...{monthBase}} />
            </div>
            <div class={style.weekCalendar}>
                <div class={style.title}>
                    <h2>今週の概要 - 第 {weekBase().week()} 週</h2>
                    <IconTextButton class={style.button} icon={<CgChevronLeft/>}
                                    onClick={() => setWeekBase(p => p.subtract(1, "week"))}>
                        先週
                    </IconTextButton>
                    <IconTextButton class={style.button} icon={<CgChevronRight/>}
                                    onClick={() => setWeekBase(p => p.add(1, "week"))}>
                        次週
                    </IconTextButton>

                    <label>
                        表示単位: 時間 <ToggleInput onChange={e => {
                        setGraphUnit(p => !p)
                    }}/> 分
                    </label>
                    {/* <h2>{new Date().getFullYear()} 年 第 {getWeekNumber(new Date())} 週</h2> */}
                </div>
                <div class={style.graph} ref={graphAreaRef}>
                    <WeeklyGraph {...{weekBase, graphUnit}} />
                </div>
            </div>

        </div>
    )
}