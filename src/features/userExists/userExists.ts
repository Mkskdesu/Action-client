import { baseUrl } from "global/constants/baseUrl"

export default (name: string) => {
    return new Promise<boolean>((resolve, reject) => {
        const url = new URL(baseUrl)
        url.pathname = "/users/exists";
        url.searchParams.append("user", name);
        fetch(url, {
            method: "GET",
            headers: {
                "Origin": location.hostname
            },
        }).then(r => {
            if (!r.ok) reject();
            else return r.json();
        }).then(json => {
            if (json.successful && "exist" in json)
                resolve(json.exist)
            else reject();
        })
    })
}