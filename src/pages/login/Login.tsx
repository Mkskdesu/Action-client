import { createSignal, onMount, Show } from "solid-js";
import { v4 as uuidv4 } from "uuid";
import { BsEye, BsEyeSlash } from 'solid-icons/bs'
import { A, useNavigate } from "@solidjs/router";
import { AiOutlineLoading3Quarters } from 'solid-icons/ai'

import FullPageFrame from "global/components/frame/fullPageFrame/FullPageFrame"
import R8Button from "global/components/button/r8Button/R8Button";

import style from "./Login.module.scss";
import { baseUrl } from "global/constants/baseUrl";
import { setData } from "@/features/afterLogin/afterLogin";
import { autoLogin, login } from "@/features/login/login";


export default () => {

    const [showPassword, setShowPassword] = createSignal(false);
    const [disabled, setDisabled] = createSignal(true);
    const [errorMessage, setErrorMessage] = createSignal("");

    const navigate = useNavigate();

    const userIdUuid = uuidv4();
    const passwordUuid = uuidv4();
    
    function toggleShowPassword() {
        setShowPassword(p => !p);
        document.getElementById(`login-${passwordUuid}`)?.focus();
    }

    onMount(() => {
        
        autoLogin()
            .then(() => navigate("/~"))
            .catch(err => {
                console.error(err);
                setDisabled(false);
            })

    });

    function tryLogin() {
        setDisabled(true);
        setErrorMessage("")
        const username = (document.getElementById(`login-${userIdUuid}`) as HTMLInputElement).value;
        const password = (document.getElementById(`login-${passwordUuid}`) as HTMLInputElement).value;
        if (!username || !password) {
            setErrorMessage("パスワードまたはユーザー名を入力してください。");
            setDisabled(false);
            return;
        }
        login(username, password)
            .then(() => navigate("/~"))
            .catch((e:string) => {
                console.error(e);
                setErrorMessage(e.toString());
                setDisabled(false);
            })
    }

    return (
        <FullPageFrame class={style.login}>
            <div class={style.heading}>
                <span> Action</span>
            </div>

            <div class={style.wrapper}>
                <div class={style.content}>
                    <div class={style.loginForm}>
                        <div class={style.notification}>
                            ログインしづらい, またはログインできない場合は 
                            <A href={"/~"}>ログインスキップ</A>をお試しください.
                        </div>
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
                        {/*fix word break */}
                        <span class={style.error}>
                            {errorMessage()}
                        </span>
                        <R8Button class={style.loginButton} onClick={tryLogin} disabled={disabled()}>
                            <Show when={disabled()} fallback="ログイン">
                                <AiOutlineLoading3Quarters />
                            </Show>
                        </R8Button>
                    </div>
                    <hr />
                    <div class={style.support}>
                        <p>ログインできませんか？</p>
                        <A href="/resetpassword">パスワードを忘れた</A> <br />
                        <A href="/register">新規登録</A>
                    </div>
                </div>
            </div>
        </FullPageFrame>
    )
}