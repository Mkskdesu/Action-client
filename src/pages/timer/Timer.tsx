import { setPageTitle } from "global/states/pageTitleState";
import style from "./Timer.module.scss";
import { createSignal, Match, onMount, Switch } from "solid-js";
import R8Button from "global/components/button/r8Button/R8Button";
import { setBottomBarState } from "global/states/bottomBarState";
import { setTimerType, timerType } from "global/states/timerState";
import CountUp from "./CountUp/CountUp";


export default () => {

    onMount(() => {
        setPageTitle("タイマー");
        setBottomBarState("timer");
    })

    return (
        <div class={style.timer}>
            <div class={style.tabWrapper}>
                <div class={style.tabs}>
                    <R8Button onClick={() => setTimerType("countup")} data-active={timerType() == "countup"}>カウントアップ</R8Button>
                    <R8Button onClick={() => setTimerType("countdown")} data-active={timerType() == "countdown"}>カウントダウン</R8Button>
                </div>
            </div>
            <div class={style.timerContentWrapper}>
                <Switch fallback={<></>}>
                    <Match when={timerType() == "countup"}>
                        <CountUp />
                    </Match>
                </Switch>
            </div>
            <div class={style.noteWrapper}>
                <div class={style.note}>
                    <h3>タイマー機能をご利用にあたって</h3> <br />
                    タイマー機能を使用中は,アプリを終了したり端末をスリープにしたりしないでください.正常に計測できない場合があります. <br />
                    省電力モードを使用していると,正常に計測できません.
                </div>
            </div>
        </div>
    )
}