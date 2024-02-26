import React from 'react'
import styles from './CalendarBookingCard.module.css'
import TabButton from '../AdminPagesSharedComponents/ViewTab/TabButton'
import { EventStatusIcon } from 'src/pages/admin/bookings/admin'
import { ArrowForward, Clock, More2 } from 'iconsax-react'

const CalendarBookingCard = () => {
  return (
    <div className={styles.calendarBookingCard}>
      <div className={styles.calendarBookingCardDetails}>
        <div className={styles.calendarBookingCardDetailsTitle}>
          <EventStatusIcon className={styles.statusIcon} />
          <div>Stockholm Event Festival</div>
          <div className={styles.calendarBookingCardDetailsOptionsIcon}>
            <More2 />
          </div>
        </div>
        <div className={styles.calendarBookingCardDetailsSchedule}>
          <Clock /> Today @ 8:00PM <ArrowForward /> 00:00
        </div>
        <div className={styles.calendarBookingCardDetailsArtistProfile}>
          <div className={styles.calendarBookingCardDetailsArtistImg}>
            <img
              className={styles.calendarBookingCardDetailsArtistImg}
              src='/images/ellipse-121.png'
              alt='Artist-profile-img'
            />
          </div>
          <div className={styles.calendarBookingCardDetailsArtistName}>John Doe</div>
        </div>
      </div>
      <TabButton className={styles.calendarBookingCardButton}>Details</TabButton>
    </div>
  )
}

export default CalendarBookingCard
