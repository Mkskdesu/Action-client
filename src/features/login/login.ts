import { baseUrl } from "global/constants/baseUrl"
import { setData } from "../afterLogin/afterLogin";

async function judgeResult(data: Response) {
    const json = await data.json();
    if (!data.ok || !json.successful) {
        throw new Error(json.status);
    } else {
        return json;
    }
}

export const autoLogin = () => {
    return new Promise((resolve, reject) => {
        const url = new URL(baseUrl)
        url.pathname = "/users/autologin";
        fetch(url, {
            method: "POST",
            headers: {
                "Origin": location.hostname
            },
            body: JSON.stringify({ uuid: JSON.parse(localStorage.getItem("user") || "{}").uuid || "" })
        }).then(judgeResult)
            .then(setData)
            .then(resolve)
            .catch(reject)
    })
}

export const login = (id: string, password: string) => {
    return new Promise((resolve, reject) => {
        const url = new URL(baseUrl);
        url.pathname = "/users/login";
        fetch(url, {
            method: "POST",
            headers: {
                "Origin": location.hostname
            }, body: JSON.stringify({ userid: id, password: password })
        }).then(judgeResult)
            .then(setData)
            .then(resolve)
            .catch(reject)
    })
}