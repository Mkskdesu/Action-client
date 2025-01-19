import style from "./Questionnaire.module.scss";
import {onMount} from "solid-js";
import {setPageTitle} from "global/states/pageTitleState.ts";
import {setBottomBarState} from "global/states/bottomBarState.ts";


export default () =>{

    onMount(() => {
        setPageTitle("満足度アンケート");
        setBottomBarState("questionnaire");

        
    });
    return (
        <div class={style.questionnaire}>
            <iframe src={import.meta.env.VITE_GOOGLE_FORM_URL} >読み込み中...</iframe>
        </div>
    )
}