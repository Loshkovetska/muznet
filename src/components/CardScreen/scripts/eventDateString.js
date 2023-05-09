const prefixDefine = (time) => {
    const firstTwoDigit = time.slice(0, 2)

    if (Number(firstTwoDigit) < 12) {
        return "am"
    } else {
        return "pm"
    }
}

export const eventDateString = (date) => {
    if (date === undefined) return
    const { eventStart, eventEnd } = date
    const convertedEventStart = new Date(eventStart).toUTCString()
    const convertedEventEnd = new Date(eventEnd).toUTCString()

    const splitedEventStart = convertedEventStart.split(" ")
    const splitedEventEnd = convertedEventEnd.split(" ")

    const eventStartTime = splitedEventStart[4].slice(0, 5)
    const eventStartPrefix = prefixDefine(eventStartTime)
    const eventStartStr = `${eventStartTime}${eventStartPrefix}`

    const eventEndTime = splitedEventEnd[4].slice(0, 5)
    const eventEndPrefix = prefixDefine(eventEndTime)
    const eventEndStr = `${eventEndTime}${eventEndPrefix}`

    const correctDate = `${splitedEventStart[1]} ${splitedEventStart[2]}, ${eventStartStr} to ${eventEndStr}`
    return correctDate
}