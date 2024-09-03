import { createSignal } from "solid-js";
import { v4 as uuidv4 } from "uuid";
import { BsEye, BsEyeSlash } from 'solid-icons/bs'
import FullPageFrame from "global/components/frame/fullPageFrame/FullPageFrame"

import style from "./Login.module.scss";
import Header from "global/components/Header/Header";


export default () => {

    const [showPassword, setShowPassword] = createSignal(false);

    const userIdUuid = uuidv4();
    const passwordUuid = uuidv4();
    return (
        <FullPageFrame class={style.login}>
            <div class={style.heading}>
                <span> Action</span>
            </div>

            <div class={style.content}>
                <h2>ログイン</h2>
                <section class={style.inputSection}>
                    <label for={`login-${userIdUuid}`}>ユーザーID</label>
                    <input type="text" id={`login-${userIdUuid}`} />
                </section>
                <section class={style.inputSection}>
                    <label for={`login-${passwordUuid}`}>パスワード</label>
                    <div class={style.passwordInput}>
                        <input type={showPassword() ? "text" : "password"} id={`login-${passwordUuid}`} />
                        <button onClick={() => setShowPassword(p => !p)} class={style.passwordToggle} >
                            {showPassword() ? <BsEyeSlash /> : <BsEye />}
                        </button>
                    </div>
                </section>
                <button class={style.login}>
                    ログイン
                </button>
            </div>
        </FullPageFrame>
    )
}