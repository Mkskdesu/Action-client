interface aiSessionOptions {
    mode: "edge" | "server" | "auto",
}
async function checkEdgeAIAvaliable() {
    if (!window.ai) return false;
    const avaliable = await window.ai.canCreateTextSession();
    if (avaliable = "no") return false;
    else return true;
}

class aiSession {
    mode = "auto";
    ready = false;
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

}