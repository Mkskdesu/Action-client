import userExists from "@/features/userExists/userExists";
import { A } from "@solidjs/router";
import R8Button from "global/components/button/r8Button/R8Button";
import { AiOutlineLoading3Quarters } from "solid-icons/ai";
import { BsEyeSlash, BsEye } from "solid-icons/bs";
import { createSignal, Setter, Show } from "solid-js";
import { v4 as uuidv4 } from "uuid";

import style from "./baseInputForm.module.scss";
import { setUserData } from "../states/formState";


interface baseInputFormProps {
    setPage: Setter<number>
}

export default (props: baseInputFormProps) => {

    const [showPassword, setShowPassword] = createSignal(false);
    const [disabled, setDisabled] = createSignal(false);
    const [errorMessage, setErrorMessage] = createSignal("");

    const userIdUuid = uuidv4();
    const passwordUuid = uuidv4();
    const passwordCheckUuid = uuidv4();

    function toggleShowPassword() {
        setShowPassword(p => !p);
        document.getElementById(`register-${passwordUuid}`)?.focus();
    }

    async function handleClick() {
        setDisabled(true);
        setErrorMessage("");
        const userid = (document.getElementById(`register-${userIdUuid}`) as HTMLInputElement).value;
        const password = (document.getElementById(`register-${passwordUuid}`) as HTMLInputElement).value;
        const passwordCheck = (document.getElementById(`register-${passwordCheckUuid}`) as HTMLInputElement).value;

        if (!userid || !password) {
            setErrorMessage("ユーザーIDまたはパスワードを入力してください.");
            setDisabled(false);
            return;
        }
        if (!(/^[A-Za-z0-9]*$/).test(userid) || !(userid.length > 3 && userid.length < 33)) {
            setErrorMessage("ユーザーIDには4~32文字の半角英数字のみ利用できます.");
            setDisabled(false);
            return;
        }
        if (password != passwordCheck) {
            setErrorMessage("入力されたパスワードが違います.");
            setDisabled(false);
            return;
        }

        try {
            const exist = await userExists(userid);
            if (exist) {
                setErrorMessage("このユーザーIDは既に使用されています.別のIDを試すか,ログインしてください.");
                setDisabled(false);
                return;
            }
        } catch (error) {
            setErrorMessage("ユーザー名のチェックに失敗しました.");
            setDisabled(false);
            return;
        }

        setUserData({ loginid: userid, password });
        props.setPage(1);

    }

    return (
        <>
            <div class={style.loginForm}>
                <h2>新規登録</h2>
                <div class={style.inputSection}>
                    <label for={`register-${userIdUuid}`}>ユーザーID(4~32文字)</label>
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
                    <label for={`register-${passwordCheckUuid}`}>パスワード(確認)</label>
                    <input type={"password"} id={`register-${passwordCheckUuid}`} />
                </div>
                <span class={style.error}>
                    {errorMessage()}
                </span>
                <R8Button class={style.loginButton} onClick={handleClick} disabled={disabled()}>
                    <Show when={disabled()} fallback="続ける">
                        <AiOutlineLoading3Quarters />
                    </Show>
                </R8Button>
            </div>
            <hr />
            <div class={style.support}>
                <p>アカウントを持っていますか？</p>
                <A href="/login">ログインはこちら</A>
            </div></>
    )
}