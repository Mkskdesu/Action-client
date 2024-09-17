import { createSignal } from "solid-js";

import { MemoryRouter, Router as SolidRouter } from "@solidjs/router";

import PageRouter from "global/router/PageRouter";

import style from "./App.module.scss";


export default () => {
    return (
        <div class={style.app}>
            <SolidRouter>
                <PageRouter />
            </SolidRouter>
        </div>
    )
}