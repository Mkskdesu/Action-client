import style from "../Settings.module.scss";
import NumberInput from "global/components/input/numberinput/NumberInput.tsx";

export default () => {

    const config = JSON.parse(localStorage.getItem("config")||"{}");
    
    function save(){
        localStorage.setItem("config", JSON.stringify(config));
    }
    
    function handleVolumeChange(value:number){
        config.timer.soundVolume = value;
        save();
    }

    return (
        <div class={style.section}>
            <h2>タイマー</h2>
            <div class={style.content}>
                <div class={style.input}>
                    カウントダウンタイマーの音量
                    <NumberInput min={0} max={100} step={1} value={config.timer.soundVolume*100} onChange={e => handleVolumeChange(Number(e.target.value)/100)}/> %
                </div>
                <p>カウントダウンタイマーの音量(%)を調整します.(0~100)</p>
            </div>
        </div>
    )
}