import {defineConfig, loadEnv} from 'vite';
import solid from 'vite-plugin-solid';
import devtools from "solid-devtools/vite";
import { VitePluginRadar } from 'vite-plugin-radar'
import {VitePWA} from "vite-plugin-pwa";



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
            }),
            VitePWA({
                registerType: "autoUpdate",
                devOptions:{enabled:true},
                includeAssets:["apple-touch-icon.png","icon_192.png","icon_512.png","icon_maskable_192.png","icon_maskable_512.png"],
                manifest:false
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