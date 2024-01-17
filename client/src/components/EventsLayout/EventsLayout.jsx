import { IconsansBoldClock3 } from '../IconsansBoldClock3'
import { IconsansBoldArrowRight } from '../IconsansBoldArrowRight'
import Link from 'next/link'
import { Fragment } from 'react'
import Router from 'next/router'
import styles from './events-layout.module.css'
export default function EventsLayout({ imgList }) {
  return (
    <div className={styles['events-preview']}>
      {imgList.map((img, index) => (
        <Fragment key={index}>
          <EventCard imgUrl={img.urls.regular} />
        </Fragment>
      ))}
    </div>
  )
}

const EventCard = ({ imgUrl }) => {
  return (
    <div className={styles['events-preview-container']} onClick={() => Router.push('#')}>
      <img className={styles['evt-img']} src={imgUrl} alt='Alt Text' />
      <CalendarIcon />
      <EventsDetails />
    </div>
  )
}

const CalendarIcon = () => {
  return (
    <div className={styles['calendar-icon']}>
      <div className={styles['calendar-icon-ins-con']}>
        <span className={styles['calender-date calendar-month']}>Dec</span>
        <span className={styles['calendar-date calendar-day']}>28</span>
      </div>
    </div>
  )
}

const EventsDetails = () => {
  return (
    <div>
      <div className={styles['event-prev-detail']}>Jimi Hendrix</div>
      <div className={styles['event-prev-detail']}>Stockholm Music Arena</div>
      <div className={styles['event-preview-schedule']}>
        <IconsansBoldClock3 className={styles['iconsans-bold-clock']} />
        <div className='event-prev-detail'>20:00</div>
        <IconsansBoldArrowRight className={styles['iconsans-bold-arrow']} />
        <div className={styles['event-prev-detail']}>01:00</div>
      </div>
    </div>
  )
}
