import achievements from "@/features/localStorage/defaults/achievements.ts";
import dayjs from "dayjs";

export default () => {
    const storageData: typeof achievements = JSON.parse(localStorage.getItem("achievements") || "{}");
    const previousData = storageData.loginStreak.lastLogin;
    const dayDiff = dayjs().startOf("day").diff(dayjs(previousData).startOf("day"),"day");
    const diffValue = dayjs().diff(dayjs(previousData),"minute");
    console.log("diff:",dayDiff);
    if (dayDiff == 0) {
        return [storageData.loginStreak.streak,diffValue,previousData];
    }else if (dayDiff == 1) {
        storageData.loginStreak.streak++;
        storageData.loginStreak.lastLogin = dayjs().startOf("day").valueOf();
        localStorage.setItem("achievements", JSON.stringify(storageData));
        return [storageData.loginStreak.streak,diffValue,previousData];
    }else{
        storageData.loginStreak.streak = 1;
        storageData.loginStreak.lastLogin = dayjs().startOf("day").valueOf();
        localStorage.setItem("achievements", JSON.stringify(storageData));
        return [storageData.loginStreak.streak,diffValue,previousData];
    }
    

}