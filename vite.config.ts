import {defineConfig} from 'vite';
import solid from 'vite-plugin-solid';
import devtools from "solid-devtools/vite";
import { VitePluginRadar } from 'vite-plugin-radar'

export default defineConfig({
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
                id: import.meta.env.GTAG,
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
