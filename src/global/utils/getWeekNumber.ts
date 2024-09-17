export default (date: Date) => {
    const currentDate = new Date(date.getTime());

    const day = currentDate.getUTCDay() || 7;
    currentDate.setUTCDate(currentDate.getUTCDate() + 4 - day);
    const yearStart = new Date(Date.UTC(currentDate.getUTCFullYear(), 0, 1));
    const weekNumber = Math.ceil((((currentDate.getTime() - yearStart.getTime()) / 86400000) + 1) / 7);
    return weekNumber;
}