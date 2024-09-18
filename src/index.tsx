/* @refresh reload */
import { isDev, render } from 'solid-js/web';
import dayjs from "dayjs";
import weekYear from 'dayjs/plugin/weekYear';
import weekOfYear from 'dayjs/plugin/weekOfYear';
import duration from "dayjs/plugin/duration";
import "dayjs/locale/ja";

import App from './App/App';

import "global/styles/style.scss";


window.addEventListener("load", () => {

    try {
        dayjs.locale("ja");
        console.log("dayjs locale set.");
    } catch (error) {
        console.error(error);
    }


    try {
        dayjs.extend(weekYear);
        dayjs.extend(weekOfYear);
        dayjs.extend(duration);
        console.log("dayjs plugin loaded");
    } catch (error) {
        console.error(error);
    }

    if (isDev) {
        const chiiTag = document.createElement("script");
        chiiTag.src = "http://localhost:25560/target.js";
        document.body.appendChild(chiiTag);
    }


    const root = document.getElementById('root')
    render(() => <App />, root!);

    console.log("ACTION is ready.");
    console.log("%c Hold up!", "color:red;font-size:64px;border:4px solid black;");
    console.log("%c Please be careful when you paste anything to console.\n Attackers may steal your information.", "color:#ffa69f;background-color:#633023;font-size:16px;");
})