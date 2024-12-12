import { createSignal, Match, onMount, Show, Switch } from "solid-js";

import FullPageFrame from "global/components/frame/fullPageFrame/FullPageFrame"
import R8Button from "global/components/button/r8Button/R8Button";

import style from "./Social.module.scss";
import {setPageTitle} from "global/states/pageTitleState.ts";
import {setBottomBarState} from "global/states/bottomBarState.ts";
import NormalSelectBox from "global/components/selectbox/normalSelectBox/NormalSelectBox.tsx";

export default () => {

    const searchSelection = [{label:"名前",value:"name"},{label: "フレンドコード",value: "code"}];
    
    onMount(() => {
        setPageTitle("ソーシャル");
        setBottomBarState("social");
    });
    
    return (
        <div class={style.social}>
            <div class={style.search}>
                <input type="text" placeholder={"ユーザーを検索"}/>
                <NormalSelectBox contents={searchSelection} value={searchSelection[0]}/>
                <R8Button>検索</R8Button>
            </div>
            <div class={style.news}>
                <div class={style.title}>
                    <h2>みんなの近況</h2>
                </div>
                ここに表示するものはまだないようです. 他を探してみませんか?
            </div>
        </div>
    )
}