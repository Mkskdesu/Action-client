import { createSignal } from "solid-js";

export const [timerType, setTimerType] = createSignal("countup");
export const [timerState, setTimerState] = createSignal("paused");