import Link from 'next/link'
import { Fragment, useEffect, useState } from 'react'
import Router from 'next/router'
import styles from './events-layout.module.css'
import Image from 'next/image'
import Skeleton from '@mui/material/Skeleton'
import { Clock } from 'iconsax-react'
import { MdArrowForward } from 'react-icons/md'
import CalendarIcon from '../AdminPagesSharedComponents/CalendarIcon/CalendarIcon'

export default function EventsLayout({ imgList }) {
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!imgList || imgList.length < 1) {
      setLoading(true)
    } else {
      setLoading(false)
    }
  }, [imgList])

  if (loading) {
    return (
      <div className={styles['main-events']}>
        <span className={`${styles['events-nav']} ${styles['see-all']}`}>
          <Link href='#'>See all</Link>
        </span>
        <div className={styles['events-preview']}>
          {Array.from({ length: 9 }).map((img, index) => (
            <Fragment key={index}>
              <div className={styles['skeleton-container']}>
                <div className={styles.skeletonCalendarIcon}>
                  <Skeleton animation='wave' variant='rounded' width={40} height={40} />
                </div>
                <div>
                  <Skeleton variant='text' width='40%' height={25} />
                  <Skeleton variant='text' width='55%' height={25} />
                  <Skeleton variant='text' width='45%' height={25} />
                </div>
              </div>
            </Fragment>
          ))}
        </div>
      </div>
    )
  } else {
    return (
      <div className={styles['main-events']}>
        <span className={`${styles['events-nav']} ${styles['see-all']}`}>
          <Link href='#'>See all</Link>
        </span>
        <div className={styles['events-preview']}>
          {imgList.map((img, index) => (
            <Fragment key={index}>
              <EventCard imgUrl={img.urls.regular} />
            </Fragment>
          ))}
        </div>
      </div>
    )
  }
}

const EventCard = ({ imgUrl }) => {
  return (
    <div className={styles['events-preview-container']} onClick={() => Router.push('#')}>
      <Image className={styles['evt-img']} src={imgUrl} alt='Alt Text' loading='eager' fill />
      <CalendarIcon />
      <EventsDetails />
    </div>
  )
}

// export const CalendarIcon = ({ style }) => {
//   return (
//     <div style={style} className={styles['calendar-icon']}>
//       <div className={styles['calendar-icon-ins-con']}>
//         <span className={styles['calender-date calendar-month']}>Dec</span>
//         <span className={styles['calendar-date calendar-day']}>28</span>
//       </div>
//     </div>
//   )
// }

const EventsDetails = () => {
  return (
    <div>
      <div className={styles['event-prev-detail']}>Jimi Hendrix</div>
      <div className={styles['event-prev-detail']}>Stockholm Music Arena</div>
      <div className={styles['event-preview-schedule']}>
        <Clock color='orange' fill='orange' className={styles['iconsans-bold-clock']} />
        <div className={styles['event-prev-detail']}>20:00</div>
        <MdArrowForward color='white' />
        <div className={styles['event-prev-detail']}>01:00</div>
      </div>
    </div>
  )
}
