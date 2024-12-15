import style from "./Logout.module.scss";
import FullPageFrame from "global/components/frame/fullPageFrame/FullPageFrame.tsx";
import {onMount} from "solid-js";
import {baseUrl} from "global/constants/baseUrl.ts";
import {useNavigate} from "@solidjs/router";

export default () =>{
    
    const navigate = useNavigate();
    
    onMount(()=>{
        const userData = JSON.parse(localStorage.getItem("user")||"{})")
        userData.sid = "";
        const url = new URL(baseUrl);
        url.pathname = "/users/logout";
        fetch(url).then(()=>navigate("/"));
    })
    
    return(
        <FullPageFrame class={style.logout}>
            ログアウトしています...完了したら,トップページに戻ります.
        </FullPageFrame>
    )
}