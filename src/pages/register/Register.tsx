import { createSignal, Match, onMount, Show, Switch } from "solid-js";
import { v4 as uuidv4 } from "uuid";
import { BsEye, BsEyeSlash } from 'solid-icons/bs';

import FullPageFrame from "global/components/frame/fullPageFrame/FullPageFrame"
import R8Button from "global/components/button/r8Button/R8Button";

import style from "./Register.module.scss";
import { AiOutlineLoading3Quarters } from "solid-icons/ai";
import userExists from "@/features/userExists/userExists";
import BaseInputForm from "./baseInputForm/BaseInputForm";
import { defaultData, setUserData } from "./states/formState";
import { reconcile } from "solid-js/store";
import UserDetailsForm from "./userDetailsForm/UserDetailsForm";


export default () => {
    const [page, setPage] = createSignal(1);

    onMount(() => {
        setUserData(reconcile(defaultData))
    })

    return (
        <FullPageFrame class={style.login}>
            <div class={style.heading}>
                <span>Action</span>
            </div>
            <div class={style.wrapper}>
                <div class={style.content}>
                    <Switch>
                        <Match when={page() == 0}>
                            <BaseInputForm {...{ setPage }} />
                        </Match>
                        <Match when={page() == 1}>
                            <UserDetailsForm {...{ setPage }} />
                        </Match>
                    </Switch>
                </div>
            </div>

        </FullPageFrame>
    )
}