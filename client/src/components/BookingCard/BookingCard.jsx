import React, { useEffect, useState } from 'react'
import styles from './BookingCard.module.css'
import { Tag } from '../Carousel/Carousel'
import { TimePicker, ConfigProvider, Button } from 'antd'
import BookingCalendar from '../BookingCalendar/BookingCalendar'
import dayjs from 'dayjs'
import { Calendar, Clock } from 'iconsax-react'
// import Button from '../Button/Button'
import { MdCheckCircle } from 'react-icons/md'
import Link from 'next/link'

const BookingCard = ({ onClose, setBookingCardType, bookingCardType, setOpen }) => {
  if (bookingCardType === 'schedule') {
    const nextPage = 'summary'
    return (
      <div className={`${styles.bookingCard} ${styles.schedule}`}>
        <BookingArtistProfile />
        <h3 className={styles.chooseWhen}>Choose When 👇</h3>
        <section className={styles.bookingCalendarSection}>
          <BookingCalendar />
        </section>
        <section className={styles.bookingTimeSection}>
          <h3>What Time?</h3>
          <div className={styles.timeChooserContainer}>
            <TimeChooser label={'Get-In-Time'} />
            <div className={styles.timeChooserDivider}></div>
            <TimeChooser label={'Start-Time'} />
            <div className={styles.timeChooserDivider}></div>

            <TimeChooser label={'End-Time'} />
          </div>
        </section>
        <BookingAction
          rightButtonMsg={'Next'}
          leftButtonMsg={'Cancel'}
          setBookingCardType={setBookingCardType}
          nextPage={nextPage}
          bookingCardType={bookingCardType}
          onClose={onClose}
          setOpen={setOpen}
        />
      </div>
    )
  } else if (bookingCardType === 'summary') {
    const nextPage = 'confirmation'
    const previousPage = 'schedule'

    return (
      <div className={`${styles.bookingCard} ${styles.summary}`}>
        <BookingArtistProfile />
        <div>
          <h3>Summary</h3>
          <SummaryDetails icon={<Calendar />} schedule={'Date'} value={'21-03-2024'} />
          <SummaryDetails icon={<Clock />} schedule={'Time'} value={'18:00 GMT'} />
          <h3 style={{ marginBottom: '14.5rem' }}>Your Details</h3>
        </div>

        <BookingAction
          leftButtonMsg={'Back'}
          rightButtonMsg={'Book Now'}
          setBookingCardType={setBookingCardType}
          nextPage={nextPage}
          previousPage={previousPage}
        />
      </div>
    )
  } else if (bookingCardType === 'confirmation') {
    const nextPage = '/'
    function handleConfirmBtnClick() {
      setOpen(false)
      setBookingCardType('schedule')
    }
    return (
      <div className={`${styles.bookingCard} ${styles.confirmation}`}>
        <h1>Thank you!</h1>
        <p className={styles.confirmationMessage}>
          Your booking is now pending moderation. We will get back to you with further details
        </p>
        <div>
          <MdCheckCircle
            size='200'
            color='#7cdb94'
            className={styles.checkmarkIcon}
            style={{ fontSize: 200, color: '#32ED7D', borderRadius: '50%' }}
          />
        </div>
        <button onClick={handleConfirmBtnClick} className={styles.bookingConfirmButton}>
          View Booking
        </button>
        <div>
          <Link href={'/'}>
            <span>Back to Home!</span>
          </Link>
        </div>
      </div>
    )
  } else {
    return (
      <div className={styles.errorMessage}>
        Error in booking card type. Select for type either "schedule", "summary" or "confirmation
      </div>
    )
  }
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
        <TimePicker variant={'borderless'} defaultValue={dayjs('19:00', format)} format={format} />
      </ConfigProvider>
    </div>
  )
}

export const BookingArtistProfile = () => {
  return (
    <section className={styles.BookingArtistProfile}>
      <h2>Artist Name</h2>
      <section className={styles['tagSection']}>
        <Tag genre={'Rock'} />
        <Tag genre={'Rock'} />
      </section>
    </section>
  )
}

export const BookingAction = ({
  onClose,
  setOpen,
  rightButtonMsg,
  leftButtonMsg,
  setBookingCardType,
  bookingCardType,
  nextPage,
  previousPage
}) => {
  function handleLeftClick() {
    if (bookingCardType === 'schedule') {
      return setOpen(false)
    }
    return setBookingCardType(previousPage)
  }

  const checkFirstLevel = nextPage === 'confirmation' ? styles.activeActionLevel : styles.actionLevel
  return (
    <section className={styles.bookingActionSection}>
      <Button onClose={onClose} onClick={handleLeftClick} className={styles.bookingButton}>
        👈 {leftButtonMsg}
      </Button>
      <div className={styles.actionLevelContainer}>
        <div className={styles.activeActionLevel}></div>
        <div className={checkFirstLevel}></div>
        <div className={`${styles.actionLevel} ${styles.actionLevel}`}></div>
      </div>
      <Button className={styles.bookingButton} onClick={() => setBookingCardType(nextPage)}>
        {rightButtonMsg} 👉
      </Button>
    </section>
  )
}

const SummaryDetails = ({ icon, schedule, value }) => {
  return (
    <div className={styles.summaryDetails}>
      <div>{icon}</div>
      <div>
        <div>{schedule}</div>
        <h4 style={{ margin: '0' }}>{value} </h4>
      </div>
    </div>
  )
}
