import { baseUrl } from "global/constants/baseUrl";
import { defaultDataType } from "pages/register/states/formState";


export default (userData: defaultDataType) => {
    const url = new URL(baseUrl)
    url.pathname = "/users/register";
    fetch(url, {
        method: "POST",
        headers: {
            "Origin": location.hostname
        },
        body: JSON.stringify(userData)
    })
}