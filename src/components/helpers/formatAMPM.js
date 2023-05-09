export const formatAMPM = (date) => {
    var hours = date.getHours();
    var minutes = date.getMinutes();
    var ampm = hours >= 12 ? "pm" : "am";
    hours = hours % 12;
    hours = !hours ? 12 : hours < 10 ? "0" + hours : hours;
    minutes = minutes < 10 ? "0" + minutes : minutes;
    var strTime = hours + ":" + minutes + "" + ampm;

    const hoursInMs = date.getHours() * 3600000
    const minutesInMs = minutes * 60000
    const timeInMsFrom = hoursInMs + minutesInMs

    return { timeInMsFrom, strTime };
}