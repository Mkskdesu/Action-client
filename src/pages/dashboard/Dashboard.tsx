import {createEffect, createSignal, on, onCleanup, onMount, Show} from "solid-js";
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
import {A} from "@solidjs/router";
import getRecords from "global/components/grassCalendar/getRecords.ts";
import sumArray from "global/utils/sumArray.ts";
import grassCalendarPrompt from "pages/dashboard/aiPrompt/grassCalendarPrompt.ts";
import R8Button from "global/components/button/r8Button/R8Button.tsx";
import {BsX} from "solid-icons/bs";

import version from "assets/version?raw";

export default () => {

    let graphAreaRef: HTMLDivElement | undefined;

    const [weekBase, setWeekBase] = createSignal(dayjs().startOf("week"));
    const [monthBase, setMonthBase] = createSignal(dayjs().startOf("month"));
    const [monthTotal,setMonthTotal] = createSignal([0,0]);
    const [graphUnit, setGraphUnit] = createSignal(false);
    const [loginCounterText,setLoginCounterText] = createSignal("");
    const [grassCalendarText,setGrassCalendarText] = createSignal("");
    const [showInstallButton,setShowInstallButton] = createSignal(false);
    let installPromptData;

    const ai = new aiSession({mode:"server"});
    let streak;

    onMount(() => {
        setPageTitle("ホーム");
        setBottomBarState("home");
        ai.createSession();
        generateStreakText();
        generateGrassCalendarText();
        window.addEventListener("beforeinstallprompt",handleBeforeInstall)
    });
    
    createEffect(on(monthBase,()=>{
        let time = getTotalMonthTime();
        const hour = Math.floor(time/60);
        time -= hour*60;
        setMonthTotal([hour,time]);
    }));
    
    onCleanup(()=>{
        window.removeEventListener("beforeinstallprompt",handleBeforeInstall);
    })
    
    function handleBeforeInstall(e:WindowEventMap[keyof WindowEventMap]) {
        const bannerValue = localStorage.getItem("pwaInstallBanner");
        if (bannerValue == "no") return;
        setShowInstallButton(true);
        installPromptData = e;
    }
    
    function installPWA(){
        if(!installPromptData) {
            alert("すでにインストールされているか, インストールできません.");
            return;
        }
        installPromptData.prompt();
    }
    
    function rejectInstall(){
        setShowInstallButton(false);
        localStorage.setItem("pwaInstallBanner", "no")
    }
    
    function generateStreakText() {
        const result = ai.textPrompt(loginStreakPrompt.sysPrompt,loginStreakPrompt.userPrompt + JSON.stringify({streak:loginStreak()[0], diff:loginStreak()[1], lastLogin: loginStreak()[2]}))
            .then(r=>r?.content||"").then(setLoginCounterText)
    }
    function generateGrassCalendarText() {
        const result = ai.textPrompt(grassCalendarPrompt.sysPrompt,grassCalendarPrompt.userPrompt + JSON.stringify({targetMonth:monthBase().month(), record: JSON.parse(localStorage.getItem("record")||"{}") }))
            .then(r=>r?.content||"").then(setGrassCalendarText);
        console.log(result);
    }
    
    function getTotalMonthTime(){
        return sumArray(getRecords(monthBase()))
    }

    return (
        <div class={style.dashboard}>
            <Show when={showInstallButton()}>
                <div class={clsx(style.notification, style.pwabanner)}>
                    <img src="/icon_192.png" height={32} alt=""/>
                    <span style={{"font-family": "Kamaboko"}}>ACTION </span>
                    アプリ版
                    <div>{/*spacer*/}</div>
                    <R8Button onClick={installPWA}>インストール</R8Button>
                    <R8Button class={style.x} onClick={rejectInstall}><BsX/></R8Button>
                </div>
            </Show>
            <div class={style.notification}>
                [お知らせ] 12月15日 22:40更新 <span style={{"font-family": "Kamaboko"}}>ACTION</span> Ver.{version}
                アップデート配信! <A href={"patchnote"}>更新内容とパッチノートはこちら</A>
            </div>
            <div class={style.loginCounter}>
                <TypeWriter content={`現在 ${(loginStreak()[0]).toString()} 日連続ログイン中! `}/>
                <TypeWriter content={loginCounterText()}/>
            </div>
            <div class={style.grassCalendar}>
                <div class={style.title}>
                    <h2>{monthBase().year()} 年 {monthBase().month() + 1} 月</h2> <p>総学習時間 : {monthTotal()[0]}時間{monthTotal()[1]}分</p>
                    <div class={style.spacer}></div>
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
                    <div class={style.textArea}>
                        <TypeWriter content={grassCalendarText()}/>
                    </div>
                <GrassCalendar {...{monthBase}} />
            </div>
            <div class={style.weekCalendar}>
            <div class={style.title}>
                    <h2>一週間の概要 - 第 {weekBase().week()} 週</h2>
                    <div class={style.spacer}></div>
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