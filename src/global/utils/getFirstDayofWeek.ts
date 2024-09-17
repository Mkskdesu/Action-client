export default (date: Date) => {
    const day = date.getDay();

    return new Date(date).setDate(date.getDate() - day);
}