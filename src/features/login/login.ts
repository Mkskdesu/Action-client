import { baseUrl } from "global/constants/baseUrl"
import { setData } from "../afterLogin/afterLogin";

import defaultUser from "@/features/localStorage/defaults/user";



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
        const storageData: typeof defaultUser = JSON.parse(localStorage.getItem("user")|| "{}");
        fetch(url, {
            method: "POST",
            headers: {
                "Origin": location.hostname,
                "content-type": "application/json",
            },
            body: JSON.stringify({ uuid: storageData.uuid, deviceid:  storageData.device.id, sid:storageData.sid})
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
        const storageData: typeof defaultUser = JSON.parse(localStorage.getItem("user")|| "{}");
        fetch(url, {
            method: "POST",
            headers: {
                "Origin": location.hostname,
                "content-type": "application/json",
            }, body: JSON.stringify({ loginid: id, password: password ,deviceid:  storageData.device.id})
        }).then(judgeResult)
            .then(setData)
            .then(resolve)
            .catch(reject)
    })
}