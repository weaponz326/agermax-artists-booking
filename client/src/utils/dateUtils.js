export function formatDate(dateString) {
  const date = new Date(dateString)

  const day = date.getDate()
  const month = date.toLocaleString('default', { month: 'short' })
  const year = date.getFullYear()

  const suffix = getSuffix(day) // Get the suffix for the day (e.g., "st", "nd", "rd", "th")

  return `${day}${suffix} ${month}, ${year}`
}

function getSuffix(day) {
  if (day >= 11 && day <= 13) {
    return 'th'
  }
  switch (day % 10) {
    case 1:
      return 'st'
    case 2:
      return 'nd'
    case 3:
      return 'rd'
    default:
      return 'th'
  }
}

export function formatTime(timeString) {
  const time = new Date(timeString)

  const hours = time.getUTCHours().toString().padStart(2, '0') // Get hours in UTC and pad with leading zero if necessary
  const minutes = time.getUTCMinutes().toString().padStart(2, '0') // Get minutes in UTC and pad with leading zero if necessary

  return `${hours}:${minutes}`
}
