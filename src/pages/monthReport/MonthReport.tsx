import { createEffect, JSXElement } from "solid-js";
import { setPageTitle } from "global/states/pageTitleState";

import FullPageFrame from "global/components/frame/fullPageFrame/FullPageFrame";
import Header from "global/components/header/Header";
import Footer from "global/components/footer/Footer";

import style from "./Home.module.scss";
import HomeRouter from "global/router/HomeRouter";
import { Router } from "@solidjs/router";

export default () => {


    return (
        <FullPageFrame class={style.monthreport}>

        </FullPageFrame>
    )
}
