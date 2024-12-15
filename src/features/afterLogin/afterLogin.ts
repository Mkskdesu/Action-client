import defaultUser from "@/features/localStorage/defaults/user.ts";

export function setData(data:loginResponse) {
    const userStorageData: typeof defaultUser= JSON.parse(localStorage.getItem("user")|| "{}");
    if(data.successful){
        userStorageData.name = data.data.user.name;
        userStorageData.uuid = data.data.uuid;
        userStorageData.createdAt = data.data.user.createdAt;
        userStorageData.sid = data.sid;
        localStorage.setItem("user", JSON.stringify(userStorageData));
    }
    location.pathname = "/";
    
}