//month is zero indexed
export default (year: number, month: number): [number, number] => {
    const firstDate = new Date(year, month, 1);
    const firstDay = firstDate.getDay();
    const lastDay = new Date(year, month + 1, 0).getDate();

    return [firstDay, lastDay];
}