
import FullPageFrame from "global/components/frame/fullPageFrame/FullPageFrame";

import style from "./Dashboard.module.scss";
import Header from "global/components/Header/Header";


export default () => {
    return (
        <FullPageFrame class={style.dashboard}>
            <Header />
            <div class={style.content}>
                <div class={style.monthlySummary}>
                    <h1>2024年9月</h1>
                </div>
            </div>
        </FullPageFrame>
    )
}
