import { setPageTitle } from "global/states/pageTitleState";
import style from "./Timer.module.scss";
import { createSignal, Match, onCleanup, onMount, Switch } from "solid-js";
import R8Button from "global/components/button/r8Button/R8Button";
import { setBottomBarState } from "global/states/bottomBarState";
import { setTimerType, timerType } from "global/states/timerState";
import CountUp from "./CountUp/CountUp";
import CountDown from "pages/timer/CountDown/CountDown.tsx";


export default () => {

    let wakeLock:WakeLockSentinel;
    const [wakeLockStatus,setWakeLockStatus] = createSignal("");

    onMount(() => {
        setPageTitle("タイマー");
        setBottomBarState("timer");
        setWakeLockStatus("スリープ防止のリクエスト待ちです...")
        window.navigator.wakeLock.request("screen")
        .then(res=>{
            wakeLock = res;
            setWakeLockStatus("この画面を表示中は、スリープ防止が有効です.")
        })
        .catch(err=>{
            setWakeLockStatus("スリープ防止の許可を取得できませんでした.");
        });

    });

    onCleanup(()=>{
        wakeLock?.release();
    });

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
                    <Match when={timerType() == "countdown"}>
                        <CountDown/>
                    </Match>
                </Switch>
            </div>
            <div class={style.noteWrapper}>
                <div class={style.note}>
                    <h3>タイマー機能をご利用にあたって</h3> <br />
                    タイマー機能を使用中は,アプリを終了したり端末をスリープにしたりしないでください.正常に計測できない場合があります. <br />
                    省電力モードを使用していると,正常に計測できません. <br />
                    {wakeLockStatus()}
                </div>
            </div>
        </div>
    )
}