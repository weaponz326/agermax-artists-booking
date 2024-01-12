import { IconsansBoldClock3 } from './IconsansBoldClock3'
import { IconsansBoldArrowRight } from './IconsansBoldArrowRight'
export default function EventPreview() {
  return (
    <div className='events-preview-img'>
      <div className='calendar'>
        <div className='calendar-icon'>
          <span className='calender-date calendar-month'>Dec</span>
          <span className='calendar-date calendar-day'>28</span>
        </div>
      </div>

      <div className='event-preview-details'>
        <div>Jimi Hendrix</div>
        <div>Stockholm Music Arena</div>
        <div className='event-preview-schedule'>
          <IconsansBoldClock3 className='iconsans-bold-clock' />
          <div className='text-wrapper-20'>20:00</div>
          <IconsansBoldArrowRight className='iconsans-bold-arrow' />
          <div className='text-wrapper-21'>01:00</div>
        </div>
      </div>
    </div>
  )
}
