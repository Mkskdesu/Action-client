import { createSignal, Show } from "solid-js";

import { MemoryRouter, HashRouter as SolidRouter } from "@solidjs/router";

import PageRouter from "global/router/PageRouter";

import DevOverlay from "global/components/devOverlay/DevOverlay";

import style from "./App.module.scss";
import { isDev } from "solid-js/web";



export default () => {
    return (
        <div class={style.app}>
            <SolidRouter>
                <PageRouter />
            </SolidRouter>
            <Show when={isDev}><DevOverlay /></Show>
        </div>
    )
}