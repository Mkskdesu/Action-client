import style from "./Settings.module.scss";
import {onMount} from "solid-js";
import {setPageTitle} from "global/states/pageTitleState.ts";
import {setBottomBarState} from "global/states/bottomBarState.ts";
import RecordPage from "pages/settings/recordPage/RecordPage.tsx";

export default () =>{
    
    onMount(()=>{
        setPageTitle("設定");
        setBottomBarState("settings");
    })
    return (
        <div class={style.settings}>
            <RecordPage/>
        </div>
    )
}