import {Accessor, createEffect, For, JSX, on, onCleanup, onMount} from "solid-js"

import dayjs, { Dayjs } from "dayjs";
import createWeekCalendar from "global/utils/createWeekCalendar";
import recordExists from "@/features/RecordExists/recordExists";
import "@/lib/googlechart";

import style from "./WeeklyGraph.module.scss";
import aiSession from "@/features/aiSession/aiSession.ts";


interface weeklyGraphProps {
    weekBase: Accessor<dayjs.Dayjs>
    graphUnit: Accessor<boolean>
}

export default (props: weeklyGraphProps) => {

    let graphAreaRef: HTMLDivElement | undefined;
    let graphAvaliable = false;

    const legends = [["english", "英語"], ["math", "数学"], ["japanese", "国語"], ["social", "社会科"], ["science", "理科"], ["other", "その他"]]

    const ai = new aiSession({mode:"server"});

    onMount(() => {
        google.charts.load('current', { 'packages': ['corechart'] });
        google.charts.setOnLoadCallback(init);
        window.addEventListener("resize", init);
    });
    
    onCleanup(()=>{
        window.removeEventListener("resize", init);
    })

    createEffect(on([props.weekBase, props.graphUnit], ([w, g]) => {
        if (!graphAvaliable) return;
        createTable(w, g);
    }
    ));

    function init() {
        graphAvaliable = true;
        createTable(props.weekBase(), props.graphUnit());
    }

    function createTable(weekBase: Dayjs, unit: boolean) {
        const weekData = [];
        const subjects = ["english", "math", "japanese", "social", "science", "other"]
        const weekCalendar = createWeekCalendar(weekBase);
        for (const day of weekCalendar) {
            const data = [];
            data.push(day.format("MM/DD"));
            if (!recordExists(day)) weekData.push([...data, 0, 0, 0, 0, 0, 0]);
            else {
                const record = JSON.parse(localStorage.getItem("record") || "{}");
                const recordData = record[`y${day?.year()}`][`m${day?.month()}`][`d${day?.date()}`];
                for (const subject of subjects) {
                    data.push(recordData[subject].time / (unit ? 1 : 60));
                }
                weekData.push(data);
            }
        }
        drawChart(weekData, unit)
    }

    function drawChart(weekData: Array<Array<string | number>>, unit: boolean) {
        const data = google.visualization.arrayToDataTable([
            ['', "英語", "数学", "国語", "社会科", "理科", "その他"],
            ...weekData
        ]);

        const options = {
            colors: ["#ed652f", "#2fb1ed", "#ed2f89", "#eddd2f", "#2fed43", "#2feddd"],
            isStacked: true,
            legend: { position: "none" },
            vAxis: {
                title: `学習時間(${unit ? "分" : "時間"})`,
                minValue: 0,
                //maxValue: unit ? 1500 : 25
            },
            backgroundColor: "",
            tooltip: {
                isHtml: true
            },
            animation: {
                duration: 300,
                easing: 'out',
            },

        };

        const chart = new google.visualization.ColumnChart(graphAreaRef!);

        chart.draw(data, options);
    }

    return (
        <>
            <style>
                {`text {
                    fill: rgb(228,245,247) !important;
                }`}
            </style>
            <div class={style.graphArea} ref={graphAreaRef}>

            </div>
            <div class={style.legends}>
                <For each={legends}>
                    {(data) =>
                        <div class={style.legend}>
                            <div class={style[data[0]]}></div>
                            <span>{data[1]}</span>
                        </div>
                    }
                </For>
            </div>
        </>

    )
}