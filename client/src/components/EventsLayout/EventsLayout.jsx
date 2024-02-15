import Link from 'next/link'
import { Fragment, useEffect, useState } from 'react'
import Router from 'next/router'
import styles from './events-layout.module.css'
import Image from 'next/image'
import Skeleton from '@mui/material/Skeleton'
import { Clock } from 'iconsax-react'
import { MdArrowForward } from 'react-icons/md'
import CalendarIcon from '../AdminPagesSharedComponents/CalendarIcon/CalendarIcon'
import { useBookings } from 'src/providers/BookingsProvider'
import { useArtists } from 'src/providers/ArtistsProvider'

export default function EventsLayout() {
  const { bookings } = useBookings()
  const [bookingsList, setBookingsList] = useState()
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!bookings || bookings.length < 1) {
      setLoading(true)
    } else {
      setBookingsList(bookings)
      setLoading(false)
    }
  }, [bookings])

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
          {bookingsList.map((booking, index) => (
            <Fragment key={index}>
              <EventCard booking={booking} />
            </Fragment>
          ))}
        </div>
      </div>
    )
  }
}

//Booking.Picture not yet supplied in the backend
const EventCard = ({ booking }) => {
  return (
    <div className={styles['events-preview-container']}>
      <Image
        className={styles['evt-img']}
        src={booking.picture ? booking.picture : ''}
        alt='BookingImg'
        loading='eager'
        fill
      />
      <CalendarIcon booking={booking} />
      <EventsDetails booking={booking} />
      <div className={styles.gradientOverlay}></div>
    </div>
  )
}

const EventsDetails = ({ booking }) => {
  const { artists } = useArtists()
  const [artistName, setArtistName] = useState('')
  const [startTime, setStartTime] = useState('')
  const [endTime, setEndTime] = useState('')

  // Fetch artist name from API if it is not provided in the data from the server
  useEffect(() => {
    if (artists && booking) {
      const artist = artists.find(a => a._id === booking.artistID)
      const artistFullName = artist ? `${artist?.firstName} ${artist?.lastName}` : 'Unknown Artist'
      setArtistName(artistFullName)

      //Configure Time for display
      const formattedStartTime = formatDateTime(booking.startTime)
      const formattedEndTime = formatDateTime(booking.endTime)

      setStartTime(formattedStartTime)
      setEndTime(formattedEndTime)
    }
  }, [artists, booking])

  const formatDateTime = (inputDateTime, outputFormat) => {
    const time = new Date(inputDateTime)
    const hour = time.getHours()
    const minutes = time.getMinutes()
    const formattedTime = `${hour.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`
    return formattedTime
  }

  return (
    <div className={styles.eventDetailsWrapper}>
      <div className={`${styles['event-prev-detail']} ${styles['artist-name']}`}>{artistName}</div>
      <div className={styles['event-prev-detail']}>
        {booking.locationVenue ? booking.locationVenue : 'Location not specified'}
      </div>
      <div className={styles['event-preview-schedule']}>
        <Clock color='orange' fill='orange' variant='Bold' className={styles['iconsans-bold-clock']} />
        <div className={styles['event-prev-detail']}>{startTime}</div>
        <MdArrowForward color='white' />
        <div className={styles['event-prev-detail']}>{endTime}</div>
      </div>
    </div>
  )
}
