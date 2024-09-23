import { createSignal, onMount } from "solid-js";
import { v4 as uuidv4 } from "uuid";
import { BsEye, BsEyeSlash } from 'solid-icons/bs'
import { A } from "@solidjs/router";

import FullPageFrame from "global/components/frame/fullPageFrame/FullPageFrame"
import R8Button from "global/components/button/r8Button/R8Button";

import style from "./Login.module.scss";
import { baseUrl } from "global/constants/baseUrl";


export default () => {

    const [showPassword, setShowPassword] = createSignal(false);

    const userIdUuid = uuidv4();
    const passwordUuid = uuidv4();

    function toggleShowPassword() {
        setShowPassword(p => !p);
        document.getElementById(`login-${passwordUuid}`)?.focus();
    }

    onMount(() => {
        const aaa = new Promise((resolve, reject) => {
            const url = new URL(baseUrl)
            url.pathname = "/users/autologin";
            fetch(url, {
                headers: {
                    "Origin": location.hostname
                }
            }).then(async data => {
                console.log(data);

                console.log(data.status);

            }).catch(err => {
                console.error(err)
            })
        })
    })

    return (
        <FullPageFrame class={style.login}>
            <div class={style.heading}>
                <span> Action</span>
            </div>

            <div class={style.content}>
                <div class={style.loginForm}>
                    <h2>ログイン</h2>
                    <div class={style.inputSection}>
                        <label for={`login-${userIdUuid}`}>ユーザーID</label>
                        <input type="text" id={`login-${userIdUuid}`} />
                    </div>
                    <div class={style.inputSection}>
                        <label for={`login-${passwordUuid}`}>パスワード</label>
                        <div class={style.passwordInput}>
                            <input type={showPassword() ? "text" : "password"} id={`login-${passwordUuid}`} />
                            <button onClick={toggleShowPassword} class={style.passwordToggle} >
                                {showPassword() ? <BsEyeSlash /> : <BsEye />}
                            </button>
                        </div>
                    </div>

                    <R8Button class={style.loginButton}>
                        ログイン
                    </R8Button>
                </div>
                <hr />
                <div class={style.support}>
                    <p>ログインできませんか？</p>
                    <A href="">パスワードを忘れた</A> <br />
                    <A href="/register">新規登録</A>
                </div>
            </div>
        </FullPageFrame>
    )
}