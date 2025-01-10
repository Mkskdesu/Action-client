import {Accessor, createEffect, For, JSX, on, onCleanup, onMount} from "solid-js"

import dayjs, { Dayjs } from "dayjs";
import createWeekCalendar from "global/utils/createWeekCalendar";
import recordExists from "@/features/RecordExists/recordExists";
import "@/lib/googlechart";
import * as Highcharts from "highcharts";

import style from "./WeeklyGraph.module.scss";
import aiSession from "@/features/aiSession/aiSession.ts";
import {Options} from "highcharts";
//import "highcharts/css/themes/dark-unica.css";

interface weeklyGraphProps {
    weekBase: Accessor<dayjs.Dayjs>
    graphUnit: Accessor<boolean>
}

export default (props: weeklyGraphProps) => {

    let graphAreaRef: HTMLDivElement | undefined;
    let graphAvaliable = true;

    const legends = [["english", "英語"], ["math", "数学"], ["japanese", "国語"], ["social", "社会科"], ["science", "理科"], ["other", "その他"]]

    const ai = new aiSession({mode:"server"});
    
    let chart:Highcharts.Chart;

    onMount(() => {
        /*google.charts.load('current', { 'packages': ['corechart'] });
        google.charts.setOnLoadCallback(init);*/
        window.addEventListener("resize", init);
    });
    
    onCleanup(()=>{
        window.removeEventListener("resize", init);
    })

    createEffect(on([props.weekBase, props.graphUnit], ([w, g]) => {
        createTable(w, g);
    }));

    function init() {
        createTable(props.weekBase(), props.graphUnit());
    }

    function createTable(weekBase: Dayjs, unit: boolean) {
        const weekData = [];
        const calendar = []
        const subjects = ["english", "math", "japanese", "social", "science", "other"]
        const weekCalendar = createWeekCalendar(weekBase);
        for (const day of weekCalendar) {
            const data:Array<number> = [];
            calendar.push(day.format("MM/DD"));
            if (!recordExists(day)) weekData.push([...data, 0, 0, 0, 0, 0, 0]);
            else {
                const record = JSON.parse(localStorage.getItem("record") || "{}");
                const recordData = record[`y${day?.year()}`][`m${day?.month()}`][`d${day?.date()}`];
                for (const subject of subjects) {
                    data.push(unit? recordData[subject].time : Number((recordData[subject].time / 60).toFixed(2)))
                }
                weekData.push(data);
            }
        }
        drawChart(weekData,calendar, unit)
    }

    function drawChart(weekData: Array<Array<number>>,calendar:Array<string>, unit: boolean) {
        if(chart){
            chart.destroy();
        }
        const data:{name:string,data:Array<number>} = 
             [
                {name: "英語", data: weekData.map(day => day[0]),color:"#ED6B2FFF"},
                {name: "数学", data: weekData.map(day => day[1]),color:"#2FB1EDFF"},
                {name: "国語", data: weekData.map(day => day[2]),color:"#ED1BB1FF"},
                {name: "社会", data: weekData.map(day => day[3]),color:"#EDDD2FFF"},
                {name: "理科", data: weekData.map(day => day[4]),color:"#2FED43FF"},
                {name: "その他", data: weekData.map(day => day[5]),color:"#2FEDDDFF"},
            ]
        
        const cfg: Options = {
            chart:{type:"column"},
            title:{text:""},
            
            xAxis:{
                categories: calendar.map<string>(day => day),
            },
            yAxis:{
                min: 0,
                title: {text:`学習時間 (${unit?"分":"時間"})`},
                stackLabels: {
                    enabled: true
                }
            },
            legend:{
                enabled:false,
            },
            tooltip:{
                backgroundColor:"#373F5AFF",
                headerFormat:" {category} ",
                pointFormat:`{series.name}: {point.y}${unit?"分":"時間"}`,
            },
            plotOptions: {
                column: {
                    stacking: 'normal',
                }
            },
            series:data
        }
        chart = Highcharts.chart(graphAreaRef!,cfg);
        
        
    }

    return (
        <div class={style.graph}>
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
        </div>

    )
}