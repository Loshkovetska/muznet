const getPostDate = (datetime, mode = 'long') => {
  const now = new Date()
  const nowTime = now.getTime()
  const date = new Date(datetime)
  const dateTime = date.getTime()

  const dif = nowTime - dateTime

  var milliseconds = Math.floor((dif % 1000) / 100),
    seconds = Math.floor((dif / 1000) % 60),
    minutes = Math.floor((dif / (1000 * 60)) % 60),
    hours = Math.floor((dif / (1000 * 60 * 60)) % 24),
    days = Math.floor(dif / (1000 * 60 * 60 * 24)),
    months = Math.floor(dif / (1000 * 60 * 60 * 24 * 31)),
    years = Math.floor(dif / (1000 * 60 * 60 * 24 * 31 * 12))

  if (!years && !months && !days && !hours && !minutes) {
    if (mode == 'long') {
      return (
        seconds + (seconds > 0 || !seconds ? ' seconds ago' : ' second ago')
      )
    } else return seconds + (seconds > 0 || !seconds ? ' sec.' : ' sec.')
  }
  if (!years && !months && !days && !hours) {
    if (mode == 'long') {
      return (
        minutes + (minutes > 0 || !minutes ? ' minutes ago' : ' minute ago')
      )
    } else return minutes + (minutes > 0 || !minutes ? ' min.' : ' min.')
  }

  if (!years && !months && !days && hours < 24) {
    if (mode == 'long') {
      return hours + ' hours ago'
    } else return hours + ' h.'
  }

  if (!years && !months && days) {
    if (mode == 'long') {
      return days + (days > 1 ? ' days ago' : ' day ago')
    } else return days + (days > 1 ? ' d.' : ' d.')
  }

  if (!years && months) {
    if (mode == 'long') {
      return months + (months > 1 ? ' months ago' : ' month ago')
    } else return months + (months > 1 ? ' mon.' : ' mon.')
  }

  if (years) {
    if (mode == 'long') {
      return years + (years > 1 ? ' years ago' : ' year ago')
    } else return years + (years > 1 ? ' y.' : ' y.')
  }
}

export default getPostDate
