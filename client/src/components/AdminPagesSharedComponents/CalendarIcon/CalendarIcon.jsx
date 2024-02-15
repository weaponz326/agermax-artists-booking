import { useEffect, useState } from 'react'
import styles from './CalendarIcon.module.css'

const CalendarIcon = ({ style, booking }) => {
  const [eventMonth, setEventMonth] = useState(null)
  const [eventDay, setEventDay] = useState(null)

  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']

  useEffect(() => {
    if (booking) {
      const monthIndex = formatDateTime(booking.dateTimeRequested).month
      const monthString = months[monthIndex].toUpperCase()
      const formattedDay = formatDateTime(booking.dateTimeRequested)

      setEventMonth(monthString)
      setEventDay(formattedDay.day)
    }
  }, [booking])

  const formatDateTime = inputDateTime => {
    const date = new Date(inputDateTime)
    const month = date.getMonth()
    const day = date.getDate().toString().padStart(2, '0')
    return { month, day }
  }

  return (
    <div style={style} className={styles['calendar-icon']}>
      <div className={styles['calendar-icon-ins-con']}>
        <span className={styles['calendar-month']}>{eventMonth ? eventMonth : 'DEC'}</span>
        <span className={styles['calendar-day']}>{eventDay ? eventDay : '28'}</span>
      </div>
    </div>
  )
}

export default CalendarIcon
