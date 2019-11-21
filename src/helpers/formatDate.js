export default function (date) {
    var today = new Date(date.getTime() - (date.getTimezoneOffset() * 60000)).toISOString().substring(0, 16);
    return today;
}