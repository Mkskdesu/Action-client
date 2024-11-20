import style from "./SuccessModal.module.scss";
import {BsX} from "solid-icons/bs";
import R8Button from "global/components/button/r8Button/R8Button.tsx";
import {setShowSuccessModal, showSuccessModal} from "pages/record/states/modal.ts";
import {Show} from "solid-js";
import {Transition} from "solid-transition-group";

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
            <Show when={showSuccessModal()}>
                <div class={style.modal} onClick={() => setShowSuccessModal(false)}>
                    <div class={style.inner} onClick={e => e.stopPropagation()}>
                        <div class={style.title}>
                            <h2>保存成功</h2>
                            <button onClick={() => setShowSuccessModal(false)}><BsX/></button>
                        </div>
                        <hr/>
                        <p>
                            学習記録を保存しました。
                        </p>
                        <div class={style.buttonArea}>
                            <R8Button onClick={() => setShowSuccessModal(false)}>
                                OK
                            </R8Button>
                        </div>
                    </div>
                </div>
            </Show>
        </Transition>

    )
}