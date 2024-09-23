import general from "./defaults/general";
import notification from "./defaults/notifications";
import record from "./defaults/studyrecord";
import user from "./defaults/user";

export default () => {
    localStorage.setItem("general", JSON.stringify({ ...general, ...(JSON.parse(localStorage.getItem("general") || "{}")) }));
    localStorage.setItem("notification", JSON.stringify({ ...notification, ...(JSON.parse(localStorage.getItem("notification") || "{}")) }));
    localStorage.setItem("record", JSON.stringify({ ...record, ...(JSON.parse(localStorage.getItem("record") || "{}")) }));
    localStorage.setItem("user", JSON.stringify({ ...user, ...(JSON.parse(localStorage.getItem("user") || "{}")) }));
}