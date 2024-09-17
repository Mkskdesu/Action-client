import dayjs from "dayjs";
import { createSignal } from "solid-js";

export const [recordDate, setRecordDate] = createSignal<dayjs.Dayjs>();
export const [weekCalendar, setWeekCalendar] = createSignal<Array<dayjs.Dayjs>>([]);