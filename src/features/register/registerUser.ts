import { baseUrl } from "global/constants/baseUrl";
import { defaultDataType } from "pages/register/states/formState";
import defaultUser from "@/features/localStorage/defaults/user.ts";
import {setData} from "@/features/afterLogin/afterLogin.ts";


async function judgeResult(data: Response) {
    const json = await data.json();
    if (!data.ok || !json.successful) {
        throw new Error(json.status);
    } else {
        return json;
    }
}


export default (userData: defaultDataType) => {
    return new Promise((resolve,reject) => {
        const storageData: typeof defaultUser = JSON.parse(localStorage.getItem("user")|| "{}");
        const url = new URL(baseUrl)
        url.pathname = "/users/register";
        return fetch(url, {
            method: "POST",
            headers: {
                "Origin": location.hostname,
                "content-type": "application/json"
            },
            body: JSON.stringify({...userData,deviceid:storageData.device.id})
        }).then(judgeResult)
            .then(setData)
            .then(resolve)
            .catch(reject)
    });
}