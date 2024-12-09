import achievements from "@/features/localStorage/defaults/achievements.ts";
import dayjs from "dayjs";

export default () => {
    const storageData: typeof achievements = JSON.parse(localStorage.getItem("achievements") || "{}");
    const previousData = storageData.loginStreak.lastLogin;
    const diff = dayjs().startOf("day").diff(dayjs(storageData.loginStreak.lastLogin).startOf("day"),"day");
    if (diff == 0) {
        return [storageData.loginStreak.streak,diff,previousData];
    }else if (diff == 1) {
        storageData.loginStreak.streak++;
        storageData.loginStreak.lastLogin = dayjs().startOf("day").valueOf();
        localStorage.setItem("achievements", JSON.stringify(storageData));
        return [storageData.loginStreak.streak,diff,previousData];
    }else{
        storageData.loginStreak.streak = 0;
        storageData.loginStreak.lastLogin = dayjs().startOf("day").valueOf();
        localStorage.setItem("achievements", JSON.stringify(storageData));
        return [storageData.loginStreak.streak,diff,previousData];
    }
    

}