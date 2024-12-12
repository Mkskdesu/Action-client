import {defineConfig, loadEnv} from 'vite';
import solid from 'vite-plugin-solid';
import devtools from "solid-devtools/vite";
import { VitePluginRadar } from 'vite-plugin-radar'



export default ({mode}:{mode:string})=>{
    process.env = {...process.env, ...loadEnv(mode, process.cwd())};
    return defineConfig({
        plugins: [solid(),
            devtools({
                autoname: true,
                locator: {
                    targetIDE: 'vscode',
                    componentLocation: true,
                    jsxLocation: true,
                }
            }),
            VitePluginRadar({
                // Google Analytics tag injection
                analytics: {
                    id: process.env.GTAG,
                },
            })
        ],
        resolve: {
            alias: {
                "global/": "/src/global/",
                "pages/": "/src/pages/",
                "assets/": "/src/assets/",
                "@/": "/src/"
            }
        }
    })


}