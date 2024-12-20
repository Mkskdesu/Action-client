import {baseUrl} from "global/constants/baseUrl.ts";

async function judgeResult(data: Response) {
    const json = await data.json();
    if (!data.ok || !json.successful) {
        throw new Error(json.status);
    } else {
        return json;
    }
}


interface resetOption{
    loginid:string,
    password:string,
}
export default (data:resetOption)=>{
    return new Promise((resolve, reject)=>{
        const url = new URL(baseUrl)
        url.pathname = "/users/resetpassword";
        return fetch(url, {
            method: "POST",
            headers: {
                "Origin": location.hostname,
                "content-type": "application/json"
            },
            body: JSON.stringify(data)
        }).then(judgeResult)
            .then(resolve)
            .catch(reject)
    })
        
}