import dayjs from "dayjs";
import { createSignal } from "solid-js";
import { createStore, reconcile } from "solid-js/store";


export const defaultRecord:recordDay = {
    math: {
        time: 0,
        reflection: ""
    },
    english: {
        time: 0,
        reflection: ""
    },
    japanese: {
        time: 0,
        reflection: ""
    },
    social: {
        time: 0,
        reflection: ""
    },
    science: {
        time: 0,
        reflection: ""
    },
    other: {
        time: 0,
        reflection: ""
    }
}

export const [recordDate, setRecordDate] = createSignal<dayjs.Dayjs>();
export const [weekCalendar, setWeekCalendar] = createSignal<Array<dayjs.Dayjs>>([]);

export const [record, setRecord] = createStore(defaultRecord);

export function resetRecord(){
    setRecord(reconcile(defaultRecord));
}