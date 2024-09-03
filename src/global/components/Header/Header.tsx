import { AiOutlineUser } from 'solid-icons/ai';
import { BsBell, BsGrid3x3GapFill } from 'solid-icons/bs';

import IconButton from '../button/iconButton/IconButton';

import style from "./Header.module.scss";
import { pageTitle } from 'global/states/pageTitleState';


export default () => {
    return (
        <header class={style.heading}>
            <span class={style.title}>Action</span>
            <span class={style.pageTitle}>
                {pageTitle()}
            </span>
            <div class={style.account}>
                <AiOutlineUser />
                USER
            </div>
            <IconButton class={style.icon}>
                <BsBell />
            </IconButton>
            <IconButton class={style.icon}>
                <BsGrid3x3GapFill />
            </IconButton>
        </header>
    )
}