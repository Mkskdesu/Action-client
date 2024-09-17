import { BsX } from "solid-icons/bs";
import IconButton from "global/components/button/iconButton/IconButton";

import version from "assets/version?raw";

import style from "./sidebarContent.module.scss";
import R8Button from "global/components/button/r8Button/R8Button";
import { For } from "solid-js";
import { setSideBarState } from "global/states/sidebarState";
import { useNavigate } from "@solidjs/router";


export default () => {

    const navigate = useNavigate();

    const links = [
        { title: "ホーム", href: "/~" },
        { title: "記録", href: "/~/record" },
        { title: "ソーシャル", href: "/~/social" },
        { title: "タイマー", href: "/~/timer" },
        { title: "設定", href: "/settings" },
    ]


    return (
        <div class={style.content}>
            <div class={style.title}>
                <h1>Action</h1>
                <span>Ver. {version}</span>
                <IconButton class={style.x} onClick={() => setSideBarState(false)}>
                    <BsX />
                </IconButton>
            </div>
            <div class={style.main}>
                <For each={links}>
                    {
                        data => (
                            <button class={style.linkButton} onClick={() => {navigate(data.href);setSideBarState(false)}}>
                                {data.title}
                            </button>
                        )
                    }
                </For>
                <button class={style.linkButton} onClick={() => { setSideBarState(false) }}>
                    ログアウト
                </button>
            </div>
            <div class={style.footer}>
                Copyright &#169; 2024 Action creating Team all rights reserved.
            </div>
        </div>
    )
}