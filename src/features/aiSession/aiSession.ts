import {baseUrl} from "global/constants/baseUrl.ts";

interface aiSessionOptions {
    mode: "edge" | "server" | "auto",
}
async function checkEdgeAIAvaliable() {
    if (!window.ai) return false;
    const avaliable = await window.ai.canCreateTextSession();
    if (avaliable == "no") return false;
    else return true;
}

interface log {
    sysPrompt: string;
    userPrompt: string;
    result: aiResult
}

interface aiResult {

    role: string;
    content: string;
    refusal: null

}

export default class aiSession {
    mode = "auto";
    ready = false;
    logs: Array<log> = []
    constructor(options: aiSessionOptions) {
        if (options.mode != "server") {
            checkEdgeAIAvaliable().then((r)=>this.decideMode(options.mode,r));
        }
    }
    decideMode(m:aiSessionOptions["mode"],avaliable: boolean) {
        if(m=="edge" && !avaliable) {
            throw new Error("Edge AI is specified but it is not avaliable.")
        }
        else if (m=="edge" && avaliable) this.mode = "edge"
        else if (m=="auto" && avaliable) this.mode = "edge";
        else this.mode = "server";
        this.ready = true;
    }
    createSession(){
        
    }
    async textPrompt(sysPrompt: string,userPrompt: string){
        const url = new URL(baseUrl)
        url.pathname = "/api/ai";
        const result = await fetch(url,{
            method: "POST",
            headers: {
                "Origin": location.hostname,
                "Content-type": "application/json"
            },
            body: JSON.stringify({sysPrompt, userPrompt}),
        }).then(res=> {
            if(res.ok) return res.json()
        }).then(json=>json.text as aiResult)
            .catch(console.error);
        if(result)
            this.logs.push({sysPrompt,userPrompt,result});
        return result;
    }

}