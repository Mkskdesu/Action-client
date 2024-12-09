import { v4 as uuidv4 } from "uuid";
import { createSignal, Match, Setter, Show, Switch } from "solid-js";

import style from "./UserDetailsForm.module.scss";
import SelectBox from "global/components/selectbox/normalSelectBox/NormalSelectBox";
import R8Button from "global/components/button/r8Button/R8Button";
import { AiOutlineLoading3Quarters } from "solid-icons/ai";
import { setUserData, userData } from "../states/formState";
import registerUser from "@/features/register/registerUser";
import {useNavigate} from "@solidjs/router";


interface userDetailsFormProps {
    setPage: Setter<number>
}


export default (props: userDetailsFormProps) => {

    const [iconType, setIconType] = createSignal("url");
    const [disabled, setDisabled] = createSignal(false);
    const [errorMessage, setErrorMessage] = createSignal("");
    
    const navigate = useNavigate();

    const displayNameUuid = uuidv4();
    const statusUuid = uuidv4();
    const inputUuid = uuidv4();

    function handleClick() {
        setDisabled(true);
        const username = (document.getElementById(`register-${displayNameUuid}`) as HTMLInputElement).value;
        const status = (document.getElementById(`register-${statusUuid}`) as HTMLInputElement).value;
        if (!username || username.length > 21) {
            setErrorMessage("ディスプレイネームを20文字以内で入力してください.");
            setDisabled(false);
            return;
        }
        setUserData({ username, status });
        registerUser(userData).then(() => navigate("/~"))
            .catch((e: [string, number]) => {
                
            })
    }

    return (
        <>
            <div class={style.userDetailsForm}>
                <h2>プロフィール登録</h2>
                <button class={style.back} onClick={() => props.setPage(0)}> &lt; 戻る </button>
                <p class={style.notice}>
                    他の人に表示するプロフィールを入力しましょう.
                </p>
                <div class={style.inputSection}>
                    <label for={`register-${displayNameUuid}`}>ディスプレイネーム(20文字)</label>
                    <input type="text" id={`register-${displayNameUuid}`} />
                </div>
                <div class={style.inputSection}>
                    <label for={`register-${statusUuid}`}>自己紹介(任意)</label>
                    <div id={`register-${statusUuid}`} class={style.textInput} contentEditable />
                </div>
                <div class={style.inputSection}>
                    <label>アイコン</label>
                    <span class={style.notice}>現在準備中です.ご迷惑をおかけしております.</span>
                    {/*                     <SelectBox class={style.selector} contents={[{ label: "ファイル", value: "file" }, { label: "URL", value: "url" }]} value={{ label: "URL", value: "url" }} onChange={v => setIconType(v)} />
                    <Switch>
                        <Match when={iconType() == "file"}>
                            <input type="file" id={`register-${inputUuid}`} accept="image/*" />
                        </Match>
                        <Match when={iconType() == "url"}>
                            <input type="text" id={`register-${inputUuid}`} />
                        </Match>
                    </Switch> */}
                </div>
                <span class={style.error}>
                    {errorMessage()}
                </span>
                <R8Button class={style.loginButton} onClick={handleClick} disabled={disabled()}>
                    <Show when={disabled()} fallback="登録">
                        <AiOutlineLoading3Quarters />
                    </Show>
                </R8Button>

            </div>
        </>
    )
}