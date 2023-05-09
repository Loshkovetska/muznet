export const agendaDateConverter = ({ month }) => {
  // const splitedDate = `${date}`.split(" ")

  // const weekDay = splitedDate[0]
  // const day = splitedDate[2]
  // const year = splitedDate[3]
  // const monthWord = splitedDate[1]

  let monthFullName
  let weekFullName
  let monthNumber

  switch (month) {
    case 0:
      monthFullName = "January"
      break
    case 1:
      monthFullName = "February"
      break
    case 2:
      monthFullName = "March"
      break
    case 3:
      monthFullName = "April"
      break
    case 4:
      monthFullName = "May"
      break
    case 5:
      monthFullName = "June"
      break
    case 6:
      monthFullName = "July"
      break
    case 7:
      monthFullName = "August"
      break
    case 8:
      monthFullName = "September"
      break
    case 9:
      monthFullName = "October"
      break
    case 10:
      monthFullName = "November"
      break
    case 11:
      monthFullName = "December"
      break
    default:
      break
  }

  // const correctDate = `${day}/${monthNumber}/${year}`

  return {
    monthFullName: monthFullName,
  }
}
