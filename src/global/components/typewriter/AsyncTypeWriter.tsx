import {Suspense} from "solid-js";
import TypeWriter from "global/components/typewriter/TypeWriter.tsx";
import {createAsync} from "@solidjs/router";


export default (props:{content:Promise<string>})=>{
    
    const data = createAsync(()=>props.content);
    return (
        <Suspense>
            <TypeWriter content={data()||""}></TypeWriter>
        </Suspense>
    )
}