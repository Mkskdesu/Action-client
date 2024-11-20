import {createEffect, createSignal, Show} from "solid-js";
import style from "./saveDialog.module.scss";
import {BsX} from "solid-icons/bs";
import R8Button from "global/components/button/r8Button/R8Button.tsx";
import {defaultRecord, record, resetRecord} from "pages/record/states/state.ts";
import {Transition} from "solid-transition-group";
import {setShowModal, showModal} from "pages/timer/state/modal.ts";
import clsx from "clsx";
import NormalSelectBox from "global/components/selectbox/normalSelectBox/NormalSelectBox.tsx";
import subjectMap from "assets/subjectMap.json";
import recordExists from "@/features/RecordExists/recordExists.ts";
import dayjs from "dayjs";
import deepmerge from "deepmerge";
import {getTime} from "@/features/timerbackend/countup.ts";
import {cloneDeep} from "lodash";


export default () =>{
    
    const subjects = 
        [{label:"数学",value:"math"},{label:"英語",value:"english"},
        {label:"国語",value:"japanese"},{label:"社会科",value:"social"},
        {label:"理科",value:"science"},{label:"その他",value:"other"}]
    
     const [selectedSubject, setSelectedSubject] = createSignal<string>("");
     const [exist,setExist] = createSignal<boolean>(false);
    

    function modalEnter(e: Element, done: () => void) {
        e.classList.remove(style.exit);
        e.classList.add(style.enter);
        e.querySelector(`div.${style.inner}`)?.classList.remove(style.exit);
        e.querySelector(`div.${style.inner}`)?.classList.add(style.enter);
        done();
    }
    function modalExit(e: Element, done: () => void) {
        e.classList.remove(style.enter);
        e.classList.add(style.exit);
        e.querySelector(`div.${style.inner}`)?.classList.remove(style.enter);
        e.querySelector(`div.${style.inner}`)?.classList.add(style.exit);
        setTimeout(() => {
            done();
        }, 500);
    }
    
    createEffect(()=>{
        const date = dayjs();
        const exist = recordExists(date);
        if (exist) {
            const record = JSON.parse(localStorage.getItem("record") || "{}");
            const data = record?.[`y${date?.year()}`]?.[`m${date?.month()}`]?.[`d${date?.date()}`];
            if(data?.[selectedSubject()]?.time > 0) {
                setExist(true)
            }else setExist(false)
        }
    });
    
    function save(override:boolean = false) {
        const date = dayjs();
        if(recordExists(date)) {
            const record = JSON.parse(localStorage.getItem("record") || "{}");
            const data = record?.[`y${date?.year()}`]?.[`m${date?.month()}`]?.[`d${date?.date()}`];
            if (override) data[selectedSubject()].time = Math.floor(getTime() / 60000);
            else data[selectedSubject()].time += Math.floor(getTime() / 60000);
            localStorage.setItem("record", JSON.stringify(record));
        }else{
            const record = cloneDeep(defaultRecord);
            record[selectedSubject()] = getTime() / 60000;
            const saved = JSON.parse(localStorage.getItem("record") || "{}");
            const data: { [key: string]: { [key: string]: { [key: string]: object } } } = {};
            data[`y${date.year()}`] = {};
            data[`y${date.year()}`][`m${date.month()}`] = {}
            data[`y${date.year()}`][`m${date.month()}`][`d${date.date()}`] = defaultRecord;
            
            localStorage.setItem("record", JSON.stringify(deepmerge.all([saved, data])));
        }
    }
    
    return(
        <Transition onEnter={modalEnter} onExit={modalExit}>
            <Show when={showModal()}>
                <div class={style.modal} onClick={() => setShowModal(false)}>
                    <div class={style.inner} onClick={e => e.stopPropagation()}>
                        <div class={style.title}>
                            <h2>学習記録を保存する</h2>
                            <button onClick={() => setShowModal(false)}><BsX/></button>
                        </div>
                        <hr/>
                        <p>
                            <NormalSelectBox contents={subjects} value={{label:"選択してください", value:null}} onChange={setSelectedSubject} />
                            <Show when={exist()}>
                                注意 : すでに保存した学習記録があります。
                            </Show>
                        </p>
                        <div class={style.buttonArea}>
                            <Show when={exist()}>
                                <R8Button onClick={() => {
                                    save(true);
                                    setShowModal(false)
                                }} disabled={!selectedSubject()}>
                                    上書き保存
                                </R8Button>
                            </Show>
                            <R8Button onClick={() => {
                                save();
                                setShowModal(false)
                            }} disabled={!selectedSubject()}>
                                {exist()?"学習記録に時間を追加":"保存する"}
                            </R8Button>
                            <R8Button onClick={() => setShowModal(false)}>
                                キャンセル
                            </R8Button>
                        </div>
                    </div>
                </div>
            </Show>
        </Transition>

    )
}