import { IconsansBoldClock3 } from '../IconsansBoldClock3'
import { IconsansBoldArrowRight } from '../IconsansBoldArrowRight'
import Link from 'next/link'
import { Fragment } from 'react'
import Router from 'next/router'
import styles from './events-layout.module.css'
import Image from 'next/image'
import { Avatar, Card, Skeleton, Switch } from 'antd'
const { Meta } = Card
export default function EventsLayout({ imgList }) {
  if (imgList.length <= 0) {
    return (
      <div className={styles['main-events']}>
        //{' '}
        <span className={`${styles['events-nav']} ${styles['see-all']}`}>
          <Link href='#'>See all</Link>
          //{' '}
        </span>
        <div className={styles['events-preview']}>
          {Array.from({ length: 9 }).map((img, index) => (
            <Fragment key={index}>
              <Card style={{ backgroundColor: 'grey' }} className={styles['events-preview-container']} loading={true}>
                <Meta
                  avatar={<Avatar src='https://api.dicebear.com/7.x/miniavs/svg?seed=1' />}
                  title='Card title'
                  description='This is the description'
                />
              </Card>
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

export const CalendarIcon = ({ style }) => {
  return (
    <div style={style} className={styles['calendar-icon']}>
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
