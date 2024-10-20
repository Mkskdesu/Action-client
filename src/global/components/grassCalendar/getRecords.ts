import { Dayjs } from "dayjs";

export default (monthBase: Dayjs) => {
    const monthLength = monthBase.daysInMonth();
    const records = JSON.parse(localStorage.getItem("record") || "{}");
    const record = records?.[`y${monthBase?.year()}`]?.[`m${monthBase?.month()}`]
    const data = [];
    if (!record) {
        return [];
    }
    for (let i = monthBase.date(); i < monthLength + 1; i++) {
        const recordData: recordDay | undefined = record?.[`d${i}`];
        let total = 0;
        if (!recordData) {
            data.push(0);
            continue;
        }
        for (const subject in recordData) {
            const element = recordData[subject];
            if (element.time) total += element.time;
            /* if (Object.hasOwnProperty.call(recordData, subject)) {
                const element = recordData[subject];
                if (element.time) total += element.time;
            } */
        }
        data.push(total)
    }

    return data;
}