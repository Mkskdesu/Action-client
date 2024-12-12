import { HiOutlineHome } from "solid-icons/hi";
import { CgNotes } from "solid-icons/cg";
import { BsClock, BsPeople } from "solid-icons/bs";

import style from "./Footer.module.scss";
import { useNavigate } from "@solidjs/router";
import { bottomBarState } from "global/states/bottomBarState";


export default () => {

    const navigate = useNavigate();

    return (
        <footer class={style.footer}>
            <div class={style.content}>
                <button onClick={()=>navigate("/~")} data-active={bottomBarState()=="home"}>
                    <HiOutlineHome />
                    <span>ホーム</span>
                </button>
                <button onClick={() => navigate("record")} data-active={bottomBarState() == "record"}>
                    <CgNotes />
                    <span>記録</span>
                </button>
                <button onClick={() => navigate("social")} data-active={bottomBarState() == "social"}>
                    <BsPeople />
                    <span>ソーシャル</span>
                </button>
                <button onClick={() => navigate("timer")} data-active={bottomBarState() == "timer"}>
                    <BsClock />
                    <span>タイマー</span>
                </button>
            </div>
        </footer>
    )
}