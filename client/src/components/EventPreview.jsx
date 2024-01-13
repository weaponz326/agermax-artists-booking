import { IconsansBoldClock3 } from './IconsansBoldClock3'
import { IconsansBoldArrowRight } from './IconsansBoldArrowRight'
import Link from 'next/link'
import { Router, useRouter } from 'next/router'
export default function EventPreview() {
  const router = useRouter()
  return (
    <div onClick={() => router.push('')} className='events-preview-img'>
      <div className='calendar'>
        <div className='calendar-icon'>
          <div className='calendar-icon-ins-con'>
            <span className='calender-date calendar-month'>Dec</span>
            <span className='calendar-date calendar-day'>28</span>
          </div>
        </div>
      </div>

      <div className='event-preview-details'>
        <div className='event-prev-detail'>Jimi Hendrix</div>
        <div className='event-prev-detail'>Stockholm Music Arena</div>
        <div className='event-preview-schedule'>
          <IconsansBoldClock3 className='iconsans-bold-clock' />
          <div className='event-prev-detail'>20:00</div>
          <IconsansBoldArrowRight className='iconsans-bold-arrow' />
          <div className='event-prev-detail'>01:00</div>
        </div>
      </div>
    </div>
  )
}
