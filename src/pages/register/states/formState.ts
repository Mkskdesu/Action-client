import { createStore } from "solid-js/store"

export interface defaultDataType {
    loginid: string
    password: string
    username: string
    /*     icon: {
            type: "file" | "url",
            data: File | string | null
        }, */
    status: string
}


export const defaultData: defaultDataType = {
    loginid: "",
    password: "",
    username: "",
    status: ""
}

export const [userData, setUserData] = createStore(defaultData);