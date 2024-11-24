import { AiOutlineUser } from 'solid-icons/ai';
import { BsBell, BsGrid3x3GapFill } from 'solid-icons/bs';

import IconButton from '../button/iconButton/IconButton';

import style from "./Header.module.scss";
import { pageTitle } from 'global/states/pageTitleState';
import { setSideBarState } from 'global/states/sidebarState';
import { setShowNotification } from 'global/states/notificationState';
import defaultUser from "@/features/localStorage/defaults/user.ts";


export default () => {

    const storageData: typeof defaultUser = JSON.parse(localStorage.getItem("user")|| "{}");
    
    return (
        <header class={style.heading}>
            <span class={style.title}>Action</span>
            <span class={style.pageTitle}>
                {pageTitle()}
            </span>
            <div class={style.account}>
                <AiOutlineUser />
                { storageData.name ||  "USER"}
            </div>
            <IconButton class={style.icon} onClick={()=> setShowNotification(true)}>
                <BsBell />
            </IconButton>
            <IconButton class={style.icon} onClick={() => setSideBarState(true)}>
                <BsGrid3x3GapFill />
            </IconButton>
        </header>
    )
}