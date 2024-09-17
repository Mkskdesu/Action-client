import { Show } from "solid-js";
import { Transition } from "solid-transition-group";

import { setSideBarState, sideBarState } from "global/states/sidebarState";

import style from "./sidebar.module.scss";
import SidebarContent from "./sidebarContent/sidebarContent";


export default () => {

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
            <Show when={sideBarState()}>
                <div class={style.sidebar} onClick={() => setSideBarState(false)}>
                    <div class={style.inner} onClick={e => e.stopPropagation()}>
                        <SidebarContent />
                    </div>
                </div>
            </Show>
        </Transition>
    )
}


