import { setShowNotification, showNotification } from "global/states/notificationState"
import style from "./Notification.module.scss"
import { createSignal, Show } from "solid-js"
import { Transition } from "solid-transition-group"
import IconButton from "../button/iconButton/IconButton"
import { BsX } from "solid-icons/bs"
import R8Button from "../button/r8Button/R8Button"

export default () => {

    const [tab,setTab] = createSignal("priority");

    function enterAnim(el: Element, done: () => void) {
        el.classList.add(style.enter);
        done();
    }

    function exitAnim(el: Element, done: () => void) {
        el.classList.add(style.exit);
        setTimeout(done, 200);
    }

    return (
        <Transition onEnter={enterAnim} onExit={exitAnim}>
            <Show when={showNotification()}>
                <div class={style.notification} onClick={() => setShowNotification(false)}>
                    <div class={style.content} onClick={e => e.stopPropagation()}>
                        <div class={style.title}>
                            <h3>通知</h3>
                            <IconButton onClick={()=>setShowNotification(false)}>
                                <BsX />
                            </IconButton>
                        </div>
                        <div class={style.tab}>
                            <R8Button onClick={()=> setTab("priority")}>優先通知</R8Button>
                            <R8Button onClick={()=> setTab("normal")}>その他の通知</R8Button>
                        </div>
                        <div class={style.notificationArea}>
                            
                        </div>
                    </div>
                </div>
            </Show>
        </Transition>
    )
}