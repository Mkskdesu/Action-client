import { AiOutlineUser } from 'solid-icons/ai';
import {BsBell, BsClock, BsGrid3x3GapFill} from 'solid-icons/bs';

import IconButton from '../button/iconButton/IconButton';

import style from "./Header.module.scss";
import { pageTitle } from 'global/states/pageTitleState';
import { setSideBarState } from 'global/states/sidebarState';
import { setShowNotification } from 'global/states/notificationState';
import defaultUser from "@/features/localStorage/defaults/user.ts";
import {Match, Show, Switch} from "solid-js";
import {countDownTimerState, countUpTimerState} from "global/states/timerState.ts";
import TimerBadge from "global/components/header/timerBadge/TimerBadge.tsx";
import {Transition} from "solid-transition-group";
import {useNavigate} from "@solidjs/router";


export default () => {

    const storageData: typeof defaultUser = JSON.parse(localStorage.getItem("user")|| "{}");
    let headerRef: HTMLElement|undefined;
    
    const navigate = useNavigate();
    
    function enter(e:Element,done:()=>void):void {
        headerRef?.classList.add(style.enter);
        done()
    }
    function exit(e:Element,done:()=>void):void {
        headerRef?.classList.remove(style.enter);
        done()
    }
    
    function handleLogoClick(){
        navigate("/~/")
    }
    return (
        
            <header class={style.heading} ref={headerRef}>
                <span class={style.title} onClick={handleLogoClick}>Action</span>
                <span class={style.pageTitle}>
                {pageTitle()}
            </span>
                <div class={style.account}>
                    <AiOutlineUser/>
                    {storageData.name || "USER"}
                </div>
                <IconButton class={style.icon} onClick={() => setShowNotification(true)}>
                    <BsBell/>
                </IconButton>
                <Transition onEnter={enter} onExit={exit}>
                <Show when={countUpTimerState() == "running" || countDownTimerState() == "running"}>
                    <TimerBadge/>
                </Show>
                </Transition>
                <IconButton class={style.icon} onClick={() => setSideBarState(true)}>
                    <BsGrid3x3GapFill/>
                </IconButton>
            </header>
        
    )
}