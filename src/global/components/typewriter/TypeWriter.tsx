import {createEffect, createSignal, onCleanup, onMount} from "solid-js";


export default (props:{content:string,interval?:number}) =>{
    const [display,setDisplay] = createSignal("");
    let interval:number;
    
    createEffect(()=>{
        props.content //add dependence
        let index = 0;
        clearInterval(interval);
        setDisplay("")
        interval = setInterval(()=>{
            if(index > props.content.length-1) {
                clearInterval(interval);
                return;
            }
            setDisplay(d=>d+props.content[index]);
            index++;
        },props.interval||50)
    });
    
    onCleanup(()=>{
        clearInterval(interval);
    })
    
    return(
        <>{display()}</>
    )
}