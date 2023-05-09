export const dateConverter = (date) => {

    const splitedDate = `${date}`.split(" ")

    const weekDay = splitedDate[0]
    const day = splitedDate[2]
    const year = splitedDate[3]
    const monthWord = splitedDate[1]

    let monthFullName
    let weekFullName
    let monthNumber

    switch (monthWord) {
        case "Jan":
            monthFullName = "January"
            break;
        case "Feb":
            monthFullName = "February"
            break;
        case "Mar":
            monthFullName = "March"
            break;
        case "Apr":
            monthFullName = "April"
            break;
        case "May":
            monthFullName = "May"
            break;
        case "Jun":
            monthFullName = "June"
            break;
        case "Jul":
            monthFullName = "July"
            break;
        case "Aug":
            monthFullName = "August"
            break;
        case "Sep":
            monthFullName = "September"
            break;
        case "Oct":
            monthFullName = "October"
            break;
        case "Nov":
            monthFullName = "November"
            break;
        case "Dec":
            monthFullName = "December"
            break;

        default:
            break;
    }

    switch (weekDay) {
        case "Mon":
            weekFullName = "Monday "
            break;
        case "Tue":
            weekFullName = "Tuesday"
            break;
        case "Wed":
            weekFullName = "Wednesday"
            break;
        case "Thu":
            weekFullName = "Thursday"
            break;
        case "Fri":
            weekFullName = "Friday"
            break;
        case "Sat":
            weekFullName = "Saturday"
            break;
        case "Sun":
            weekFullName = "Sunday"
            break;
        default:
            break;
    }
    const correctDate = `${day}/${monthNumber}/${year}`

    return {
        correctDate: correctDate,
        day: day,
        monthFullName: monthFullName,
        year: year,
        weekFullName: weekFullName
    }

}






