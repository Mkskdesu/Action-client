import style from './ResetModal.module.scss';
import {Show} from "solid-js";
import {BsX} from "solid-icons/bs";
import R8Button from "global/components/button/r8Button/R8Button.tsx";
import {resetRecord} from "pages/record/states/state.ts";
import {Transition} from "solid-transition-group";
import {setShowResetModal, showResetModal} from "pages/record/states/modal.ts";

export default () => {

    function modalEnter(e: Element, done: () => void) {
        e.classList.remove(style.exit);
        e.classList.add(style.enter);
        e.querySelector(`div.${style.inner}`)?.classList.remove(style.exit);
        e.querySelector(`div.${style.inner}`)?.classList.add(style.enter);
        done();
    }
    function modalExit(e: Element, done: () => void) {
        e.classList.remove(style.enter);
        e.classList.add(style.exit);
        e.querySelector(`div.${style.inner}`)?.classList.remove(style.enter);
        e.querySelector(`div.${style.inner}`)?.classList.add(style.exit);
        setTimeout(() => {
            done();
        }, 500);
    }

    
    return (
        <Transition onEnter={modalEnter} onExit={modalExit}>
            <Show when={showResetModal()}>
                <div class={style.resetModal} onClick={() => setShowResetModal(false)}>
                    <div class={style.inner} onClick={e => e.stopPropagation()}>
                        <div class={style.title}>
                            <h2>操作を行う前に</h2>
                            <button onClick={() => setShowResetModal(false)} ><BsX /></button>
                        </div>
                        <hr />
                        <p>
                            入力内容を消去しますか？保存されているデータは変更されません。 <br />
                            <b>この操作を取り消すことはできません！</b>
                        </p>
                        <div class={style.buttonArea}>
                            <R8Button class={style.delete} onClick={() => { resetRecord(); setShowResetModal(false) }}>
                                消去する
                            </R8Button>
                            <R8Button onClick={() => setShowResetModal(false)}>
                                キャンセル
                            </R8Button>
                        </div>
                    </div>
                </div>
            </Show>

        </Transition>
    )
}