import { createSignal } from "solid-js";
import { v4 as uuidv4 } from "uuid";
import { BsEye, BsEyeSlash } from 'solid-icons/bs';
import { A } from "@solidjs/router";

import FullPageFrame from "global/components/frame/fullPageFrame/FullPageFrame"
import R8Button from "global/components/button/r8Button/R8Button";

import style from "./Register.module.scss";


export default () => {

    const [showPassword, setShowPassword] = createSignal(false);

    const userIdUuid = uuidv4();
    const passwordUuid = uuidv4();
    const passwordCheckUuid = uuidv4();


    function toggleShowPassword() {
        setShowPassword(p => !p);
        document.getElementById(`register-${passwordUuid}`)?.focus();
    }

    return (
        <FullPageFrame class={style.login}>
            <div class={style.heading}>
                <span>Action</span>
            </div>

            <div class={style.content}>
                <div class={style.loginForm}>
                    <h2>新規登録</h2>
                    <div class={style.inputSection}>
                        <label for={`register-${userIdUuid}`}>ユーザーID</label>
                        <input type="text" id={`register-${userIdUuid}`} />
                    </div>
                    <div class={style.inputSection}>
                        <label for={`register-${passwordUuid}`}>パスワード</label>
                        <div class={style.passwordInput}>
                            <input type={showPassword() ? "text" : "password"} id={`register-${passwordUuid}`} />
                            <button onClick={toggleShowPassword} class={style.passwordToggle} >
                                {showPassword() ? <BsEyeSlash /> : <BsEye />}
                            </button>
                        </div>
                    </div>
                    <div class={style.inputSection}>
                        <label for={`login-${passwordCheckUuid}`}>パスワード(確認)</label>
                            <input type={"password"} id={`login-${passwordCheckUuid}`} />
                    </div>
                    <R8Button class={style.loginButton}>
                        登録
                    </R8Button>
                </div>
                <hr />
                <div class={style.support}>
                    <p>アカウントを持っていますか？</p>
                    <A href="/login">ログインはこちら</A>
                </div>
            </div>
        </FullPageFrame>
    )
}