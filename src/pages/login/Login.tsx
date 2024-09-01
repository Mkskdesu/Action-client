import FullPageFrame from "global/components/frame/fullPageFrame/FullPageFrame"

import style from "./Login.module.scss";
import Header from "global/components/outSessionHeader/OutSessionHeader";


export default () => {
    return (
        <FullPageFrame class={style.login}>
            <Header />
            <h1>ログイン</h1>
        </FullPageFrame>
    )
}