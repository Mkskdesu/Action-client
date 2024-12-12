import { createEffect, createSignal, onMount } from "solid-js";
import { CgChevronLeft, CgChevronRight } from "solid-icons/cg";
import clsx from "clsx";
import dayjs from "dayjs";

import { setBottomBarState } from "global/states/bottomBarState";
import { setPageTitle } from "global/states/pageTitleState";

import style from "./PatchNote.module.scss";
import patchnoteUrl from "global/constants/patchnoteUrl.ts";
import {marked} from "marked";

export default () => {
    
    let renderAreaRef:HTMLDivElement|undefined;

    onMount(() => {
        setPageTitle("パッチノート");
        setBottomBarState("patchnote");
        
        fetch(patchnoteUrl)
            .then(res=>res.text())
            .then(marked).then(render)
            .catch(e=>{
                console.error(e);
                render("*パッチノートの表示に失敗しました.*")
            })
    });
    
    function render(html:string) {
        if(!renderAreaRef)return;
        renderAreaRef.innerHTML = html;
    }

    return (
        <div class={style.patchnote}>
            <div class={style.renderArea} ref={renderAreaRef}/>
        </div>
    )
}