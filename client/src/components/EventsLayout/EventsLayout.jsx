import { IconsansBoldClock3 } from '../IconsansBoldClock3'
import { IconsansBoldArrowRight } from '../IconsansBoldArrowRight'
import Link from 'next/link'
import { Fragment } from 'react'
import Router from 'next/router'
export default function EventsLayout({ imgList }) {
  return (
    <div className='events-preview'>
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
    <div className='events-preview-container' onClick={() => Router.push('#')}>
      <img className='evt-img' src={imgUrl} alt='Alt Text' />
      <CalendarIcon />
      <EventsDetails />
    </div>
  )
}

const CalendarIcon = () => {
  return (
    <div className='calendar-icon'>
      <div className='calendar-icon-ins-con'>
        <span className='calender-date calendar-month'>Dec</span>
        <span className='calendar-date calendar-day'>28</span>
      </div>
    </div>
  )
}

const EventsDetails = () => {
  return (
    <div>
      <div className='event-prev-detail'>Jimi Hendrix</div>
      <div className='event-prev-detail'>Stockholm Music Arena</div>
      <div className='event-preview-schedule'>
        <IconsansBoldClock3 className='iconsans-bold-clock' />
        <div className='event-prev-detail'>20:00</div>
        <IconsansBoldArrowRight className='iconsans-bold-arrow' />
        <div className='event-prev-detail'>01:00</div>
      </div>
    </div>
  )
}
