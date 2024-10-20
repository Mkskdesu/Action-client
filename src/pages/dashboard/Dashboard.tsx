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
import WeeklyGraph from "global/components/weeklyGraph/weeklyGraph";
import ToggleInput from "global/components/input/toggleInput/ToggleInput";


export default () => {

    let graphAreaRef:HTMLDivElement|undefined;

    const [weekBase,setWeekBase] = createSignal(dayjs().startOf("week"));
    const [graphUnit,setGraphUnit] = createSignal(false);
    

    onMount(() => {
        
        setPageTitle("ホーム");
        setBottomBarState("home");
    });

    

    return (
        <div class={style.dashboard}>
            <div class={style.grassCalendar}>
                <div class={style.title}>
                    <h2>{new Date().getFullYear()} 年 {new Date().getMonth() + 1} 月</h2>
                    <IconTextButton class={style.button} icon={<CgChevronLeft />}>
                        前月
                    </IconTextButton>
                    <IconTextButton class={style.button} icon={<CgChevronRight />}>
                        次月
                    </IconTextButton>
                    <button class={clsx(style.button, style.detailsbutton)}>詳細</button>
                </div>
                <GrassCalendar year={2024} month={8} data={[]} />
            </div>
            <div class={style.weekCalendar}>
                <div class={style.title}>
                    <h2>今週の概要 - 第 {weekBase().week()} 週</h2>
                    <IconTextButton class={style.button} icon={<CgChevronLeft />} onClick={()=>setWeekBase(p=>p.subtract(1,"week"))}>
                        先週
                    </IconTextButton>
                    <IconTextButton class={style.button} icon={<CgChevronRight />} onClick={() => setWeekBase(p => p.add(1, "week"))} >
                        次週
                    </IconTextButton>

                    <label>
                        表示単位: 時間 <ToggleInput onChange={e=>{setGraphUnit(p=>!p)}} /> 分
                    </label>
                    {/* <h2>{new Date().getFullYear()} 年 第 {getWeekNumber(new Date())} 週</h2> */}
                </div>
                    <div class={style.graph} ref={graphAreaRef}>
                        <WeeklyGraph {...{weekBase}} unit={graphUnit} />
                    </div>
            </div>

        </div>
    )
}