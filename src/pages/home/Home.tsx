import { createEffect, JSXElement } from "solid-js";
import { setPageTitle } from "global/states/pageTitleState";

import FullPageFrame from "global/components/frame/fullPageFrame/FullPageFrame";
import Header from "global/components/header/Header";
import Footer from "global/components/footer/Footer";
import Sidebar from "global/components/sidebar/sidebar";

import HomeRouter from "global/router/HomeRouter";
import { Router } from "@solidjs/router";

import style from "./Home.module.scss";


interface homeProps {
    children?: JSXElement
}

export default (props: homeProps) => {


    return (
        <FullPageFrame class={style.dashboard}>
            <Header />
            <div class={style.content}>
                {props.children}
            </div>
            <Footer />
            <Sidebar />
        </FullPageFrame>
    )
}
