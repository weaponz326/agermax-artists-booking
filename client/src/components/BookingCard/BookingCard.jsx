import React from 'react'
import styles from './BookingCard.module.css'
import { Tag } from '../Carousel/Carousel'
import { TimePicker, ConfigProvider, Button } from 'antd'
import BookingCalendar from '../BookingCalendar/BookingCalendar'
import dayjs from 'dayjs'

const style = {
  backgroundColor: 'rgb(240, 240, 240)',
  height: '100%',
  borderRadius: '2rem',
  padding: '2rem'
}

const BookingCard = () => {
  return (
    <div style={style} className={styles.bookingCard}>
      <h2>Artist Name</h2>
      <section className={styles['tagSection']}>
        <Tag genre={'Rock'} />
        <Tag genre={'Rock'} />
      </section>
      <h3 className={styles.chooseWhen}>Choose When 👇</h3>
      <section className={styles.bookingCalendarSection}>
        <BookingCalendar />
      </section>
      <section className={style.bookingTimeSection}>
        <h3>What Time?</h3>
        <div className={styles.timeChooserContainer}>
          <TimeChooser label={'Get-In-Time'} />
          <div className={styles.timeChooserDivider}></div>
          <TimeChooser label={'Start-Time'} />
          <div className={styles.timeChooserDivider}></div>

          <TimeChooser label={'End-Time'} />
        </div>
      </section>
      <div className={styles.bookingActionSection}>
        <Button>👈 Cancel</Button>
        <div className={styles.actionLevelContainer}>
          <div className={styles.actionLevel}></div>
          <div className={styles.actionLevel}></div>
          <div className={styles.actionLevel}></div>
        </div>
        <Button>Next 👉</Button>
      </div>
    </div>
  )
}

export default BookingCard

export const TimeChooser = ({ label }) => {
  const format = 'HH:mm'
  return (
    <div className={styles.timeChooser}>
      <label htmlFor='time'>{label}</label> <br />
      <ConfigProvider
        theme={{
          token: {
            padding: '0',
            paddingInline: '0'
          }
        }}
      >
        <TimePicker variant={'borderless'} defaultValue={dayjs('12:08', format)} format={format} />
      </ConfigProvider>
    </div>
  )
}
