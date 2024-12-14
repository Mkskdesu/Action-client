import { createSignal } from "solid-js";

export const [timerType, setTimerType] = createSignal("countup");
export const [countUpTimerState, setCountUpTimerState] = createSignal("paused");
export const [countDownTimerState, setCountDownTimerState] = createSignal("paused");
