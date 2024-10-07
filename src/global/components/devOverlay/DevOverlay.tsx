import { BsArrowClockwise, BsArrowLeft, BsArrowRight, BsHouse, BsX } from "solid-icons/bs";
import style from "./DevOverlay.module.scss";
import { onCleanup, onMount, Show } from "solid-js";
import hotkeys from "hotkeys-js";
import { createSignal } from "solid-js";
import dayjs from "dayjs";
import { UAParser } from "ua-parser-js";
import clsx from "clsx";
import { v4 as uuidv4 } from "uuid";

export default () => {
    const [showMainOverlay, setShowMainOverlay] = createSignal(true);
    const [showLocationOverlay, setShowLocationOverlay] = createSignal(true);
    const [currentHash, setCurrentHash] = createSignal("");
    const [screen, setScreen] = createSignal([window.innerWidth, window.innerHeight]);
    const [mouse, setMouse] = createSignal([0, 0]);
    const device = UAParser();
    const navigateId = uuidv4();


    onMount(() => {
        hotkeys("shift+f2", (e, key) => {
            setShowMainOverlay(p => !p);
        });
        window.addEventListener("popstate", () => setCurrentHash(location.hash))
        window.addEventListener("resize", () => setScreen([window.innerWidth, window.innerHeight]));
        window.addEventListener("mousemove", (e) => setMouse([e.x, e.y]));
    });

    onCleanup(() => {
        hotkeys.unbind("shift+f2");
        window.removeEventListener("popstate", () => setCurrentHash(location.hash))
        window.removeEventListener("resize", () => setScreen([window.innerWidth, window.innerHeight]));
        window.removeEventListener("mousemove", (e) => setMouse([e.x, e.y]));

    })

    return (
        <div class={style.container}>
            <Show when={showMainOverlay()}>
                <div class={clsx(style.mainOverlay, style.overlay)}>
                    <div class={style.title}>
                        <span>ACTION Developer Overlay (Shift+F2)</span>
                        <button class={style.x} onClick={() => setShowMainOverlay(false)}><BsX></BsX></button>
                    </div>
                    <div class={style.content}>
                        <b>Status</b> <br />
                        Session Started: {dayjs().subtract(performance.now(), "ms").format()} <br />
                        Origin : {location.origin} <br />
                        Location : {currentHash()} <br />

                        <b>Screen Info</b> <br />
                        Resolution: {screen()[0]} x {screen()[1]} <br />
                        Orientation: {screen()[0] > screen()[1] ? "Landscape" : "Portrait"} <br />
                        Pointer: {mouse()[0]}, {mouse()[1]} <br />
                        <b>Device Info</b> <br />
                        UA : {navigator.userAgent} <br />
                        Browser : {device.browser.name} ver.{device.browser.version} <br />
                        Engine : {device.engine.name} ver.{device.engine.version}
                        Device : {device.os.name}{device.os.version} <br />
                        CPU-Arch : {device.cpu.architecture}
                    </div>
                </div>
            </Show>
            <Show when={showLocationOverlay()}>
                <div class={clsx(style.locationOverlay, style.overlay)}>
                    <div class={style.title}>
                        <span>Location Overlay (Shift+F3)</span>
                        <button class={style.x} onClick={() => setShowLocationOverlay(false)}><BsX></BsX></button>
                    </div>
                    <div class={style.content}>
                        <button onClick={() => location.hash = "#/~"}><BsHouse /></button>
                        <input type="text" id={navigateId} placeholder="navigate to path" />
                        <button onClick={() => location.hash = (document.getElementById(navigateId) as HTMLInputElement).value}>Go</button>
                        <button onClick={() => history.back()}><BsArrowLeft /></button>
                        <button onClick={() => history.forward()}><BsArrowRight /></button>
                        <button onClick={location.reload}><BsArrowClockwise /></button>
                    </div>
                </div>
            </Show>
        </div>
    )
}