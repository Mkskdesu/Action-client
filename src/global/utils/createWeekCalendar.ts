import dayjs from "dayjs";

export default (base: dayjs.Dayjs) => {
    const weekCalendar: Array<dayjs.Dayjs> = [];
    for (let i = 0; i < 7; i++) {
        if (i == 0) {
            weekCalendar.push(base.startOf('week'));
        } else {
            weekCalendar.push(weekCalendar[i - 1].add(1, "day"));
        }
    }
    return weekCalendar;
}