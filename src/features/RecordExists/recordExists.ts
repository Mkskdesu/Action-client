import { Dayjs } from "dayjs";

export default (date:Dayjs) =>{
    const record = JSON.parse(localStorage.getItem("record")||"{}");
    const data = record?.[`y${date?.year()}`]?.[`m${date?.month()}`]?.[`d${date?.date()}`];
    if(data) return true;
    else return false;
}