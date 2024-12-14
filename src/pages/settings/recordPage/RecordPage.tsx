import style from "../Settings.module.scss";
import NormalSelectBox from "global/components/selectbox/normalSelectBox/NormalSelectBox";

export default () => {

    const config = JSON.parse(localStorage.getItem("config")||"{}");
    const inputType = [{label:"数値入力(規定)",value:"direct"},{label:"選択式",value:"selector"}]
    const defaultInputType = inputType[inputType.findIndex(e=>e.value==config.record.inputType)] || inputType[0];
    
    function save(){
        localStorage.setItem("config", JSON.stringify(config));
    }
    
    function handleInputTypeChange(value:string){
        config.record.inputType = value;
        save();
    }

    return (
        <div class={style.section}>
            <h2>学習記録</h2>
            <div class={style.content}>
                <div class={style.input}>
                    学習記録の入力方法
                    <NormalSelectBox contents={inputType} value={defaultInputType} onChange={v=>handleInputTypeChange(v)}/>
                </div>
                <p>数値入力: キーボードまたは矢印ボタンで入力します. 選択式: ドロップダウンから選択します(5分間隔).</p>
            </div>
        </div>
    )
}