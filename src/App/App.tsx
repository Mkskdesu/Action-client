import { createSignal } from "solid-js";

import { MemoryRouter, Router as SolidRouter } from "@solidjs/router";


import style from "./App.module.scss";
import PageRouter from "global/router/PageRouter";

export default () => {
    return (
        <div class={style.app}>
            <SolidRouter>
                <PageRouter />
            </SolidRouter>
        </div>
    )
}