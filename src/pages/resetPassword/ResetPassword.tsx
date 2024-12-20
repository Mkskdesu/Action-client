import style from "./ResetPassword.module.scss";
import FullPageFrame from "global/components/frame/fullPageFrame/FullPageFrame.tsx";
import {A, useNavigate} from "@solidjs/router";
import {BsEye, BsEyeSlash} from "solid-icons/bs";
import R8Button from "global/components/button/r8Button/R8Button.tsx";
import {createSignal, Show} from "solid-js";
import {AiOutlineLoading3Quarters} from "solid-icons/ai";
import {v4 as uuidv4} from "uuid";
import resetPassword from "@/features/resetPassword/resetPassword.ts";

export default () => {

    const [showPassword, setShowPassword] = createSignal(false);
    const [disabled, setDisabled] = createSignal(false);
    const [errorMessage, setErrorMessage] = createSignal("");
    const [successMessage, setSuccessMessage] = createSignal("");

    const navigate = useNavigate();

    const userIdUuid = uuidv4();
    const passwordUuid = uuidv4();
    const passwordCheckUuid = uuidv4();

    function toggleShowPassword() {
        setShowPassword(p => !p);
        document.getElementById(`reset-${passwordUuid}`)?.focus();
    }
    
    function handleClick(){
        setDisabled(true);
        setErrorMessage("");
        const userid = (document.getElementById(`reset-${userIdUuid}`) as HTMLInputElement).value;
        const password = (document.getElementById(`reset-${passwordUuid}`) as HTMLInputElement).value;
        const passwordCheck = (document.getElementById(`reset-${passwordCheckUuid}`) as HTMLInputElement).value;

        if (!userid || !password) {
            setErrorMessage("ユーザーIDまたはパスワードを入力してください.");
            setDisabled(false);
            return;
        }
        if(password!= passwordCheck){
            setErrorMessage("入力されたパスワードが違います.");
            setDisabled(false);
            return;
        }
        
        resetPassword({loginid:userid,password})
            .then(()=>{
                setSuccessMessage("パスワードをリセットしました.ログインページに戻ります...");
                setTimeout(()=>{
                    navigate("/login");
                },2000)
                
            })
            .catch((e) => {
                console.error(e);
                setErrorMessage(e.toString());
                setDisabled(false);
            })
        
    }


    return (
        <FullPageFrame class={style.reset}>
            <div class={style.heading}>
                <span> Action</span>
            </div>

            <div class={style.wrapper}>
                <div class={style.content}>
                    <div class={style.loginForm}>
                        <h2>パスワードのリセット</h2>
                        <div class={style.inputSection}>
                            <label for={`reset-${userIdUuid}`}>ユーザーID</label>
                            <input type="text" id={`reset-${userIdUuid}`}/>
                        </div>
                        <div class={style.inputSection}>
                            <label for={`login-${passwordUuid}`}>新しいパスワード</label>
                            <div class={style.passwordInput}>
                                <input type={showPassword() ? "text" : "password"} id={`reset-${passwordUuid}`}/>
                                <button onClick={toggleShowPassword} class={style.passwordToggle}>
                                    {showPassword() ? <BsEyeSlash/> : <BsEye/>}
                                </button>
                            </div>
                        </div>

                        <div class={style.inputSection}>
                            <label for={`reset-${passwordCheckUuid}`}>新しいパスワード(確認)</label>
                            <input type={"password"} id={`reset-${passwordCheckUuid}`}/>
                        </div>

                        {/*fix word break */}
                        <span class={style.error}>
                            {errorMessage()}
                        </span>
                        <span class={style.success}>
                            {successMessage()}
                        </span>
                        <R8Button class={style.loginButton} onClick={handleClick} disabled={disabled()}>
                            <Show when={disabled()} fallback="リセット">
                                <AiOutlineLoading3Quarters/>
                            </Show>
                        </R8Button>
                    </div>
                </div>
            </div>
        </FullPageFrame>
    )
}