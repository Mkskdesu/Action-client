import {createSignal, onMount, Show} from "solid-js";

import { MemoryRouter, HashRouter as SolidRouter } from "@solidjs/router";

import PageRouter from "global/router/PageRouter";

import DevOverlay from "global/components/devOverlay/DevOverlay";

import style from "./App.module.scss";
import { isDev } from "solid-js/web";
import checkStreak from "@/features/loginStreak/checkStreak.ts";
import {loginStreak, setLoginStreak} from "global/states/loginStreak.ts";


export default () => {
    onMount(()=>{
        setLoginStreak(checkStreak())
        console.log("App mounted");
    })
    return (
        <div class={style.app}>
            <SolidRouter>
                <PageRouter />
            </SolidRouter>
            <Show when={isDev}><DevOverlay /></Show>
        </div>
    )
}