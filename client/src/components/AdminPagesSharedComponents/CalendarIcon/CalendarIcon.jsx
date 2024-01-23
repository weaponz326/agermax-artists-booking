import styles from './CalendarIcon.module.css'

const CalendarIcon = ({ style }) => {
  return (
    <div style={style} className={styles['calendar-icon']}>
      <div className={styles['calendar-icon-ins-con']}>
        <span className={styles['calendar-month']}>DEC</span>
        <span className={styles['calendar-day']}>28</span>
      </div>
    </div>
  )
}

export default CalendarIcon
