import {JSX} from "solid-js";

export default (props: JSX.HTMLAttributes<SVGSVGElement>) => {
    return (
        <>
            <svg
                {...props}
                fill="currentColor"
                stroke-width="0"
                viewBox="0 0 16 16"
                height="16"
                width="16"
                style="overflow:visible"
                version="1.1"
                id="svg1"
                xmlns="http://www.w3.org/2000/svg">
                <circle cx="8" cy="8" r="8"/>
            </svg>

        </>
    )
}