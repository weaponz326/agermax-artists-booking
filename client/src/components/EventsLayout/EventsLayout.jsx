import { Fragment, useEffect, useState } from 'react'
import styles from './events-layout.module.css'
import Image from 'next/image'
import Skeleton from '@mui/material/Skeleton'
import { Clock } from 'iconsax-react'
import { MdArrowForward } from 'react-icons/md'
import CalendarIcon from '../AdminPagesSharedComponents/CalendarIcon/CalendarIcon'
import Link from 'next/link'
import { getUserById } from 'src/services/users'

export default function EventsLayout({ bookings, numOfBookings, selectedGenre, setSelectedGenre }) {
  const [bookingsList, setBookingsList] = useState()
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!bookings || bookings.length < 1) {
      setLoading(true)
    } else {
      setBookingsList(bookings.slice(0, numOfBookings))
      setLoading(false)
    }
  }, [bookings, numOfBookings, loading])

  const skeletonCarouselDetail = {
    background: 'rgb(219, 224, 228)'
  }

  if (loading) {
    return (
      // <div className={styles['main-events']}>
      <div className={styles['events-preview']}>
        {Array.from({ length: numOfBookings }).map((img, index) => (
          <Fragment key={index}>
            <div className={styles['skeleton-container']}>
              <div className={styles.skeletonCalendarIcon}>
                <Skeleton
                  animation='wave'
                  variant='rounded'
                  width={40}
                  height={40}
                  sx={{ ...skeletonCarouselDetail }}
                />
              </div>
              <div>
                <Skeleton variant='text' width='40%' height={25} sx={{ ...skeletonCarouselDetail }} />
                <Skeleton variant='text' width='55%' height={25} sx={{ ...skeletonCarouselDetail }} />
                <Skeleton variant='text' width='45%' height={25} sx={{ ...skeletonCarouselDetail }} />
              </div>
            </div>
          </Fragment>
        ))}
      </div>
      // </div>
    )
  } else {
    return (
      // <div className={styles['main-events']}>
      <div className={styles['events-preview']}>
        {bookingsList.map((booking, index) => (
          <Fragment key={index}>
            <EventCard booking={booking} />
          </Fragment>
        ))}
      </div>
      // </div>
    )
  }
}

//Booking.Picture not yet supplied in the backend
const EventCard = ({ booking }) => {
  const [bookingImage, setBookingImage] = useState('')
  useEffect(() => {
    const fetchArtist = async () => {
      const bookingArtist = await getUserById(booking.artistID)
      if (booking) {
        if (booking.mainBanner === '') {
          setBookingImage(bookingArtist.profilePhoto)
        }
        setBookingImage(booking.mainBanner)
        console.log('booking banner', booking.mainBanner)
      } else {
        setBookingImage(bookingArtist.profilePhoto)
        console.log('Artist Profile Photo', bookingArtist.profilePhoto)
      }
    }

    fetchArtist()
  }, [booking])

  return (
    <div className={styles['events-preview-container']}>
      <Image className={styles['evt-img']} src={bookingImage} alt={'bookingImage'} loading='eager' fill />
      <CalendarIcon booking={booking} />
      <EventsDetails booking={booking} />
      <div className={styles.gradientOverlay}></div>
    </div>
  )
}

const EventsDetails = ({ booking }) => {
  const [artistName, setArtistName] = useState('')
  const [startTime, setStartTime] = useState('')
  const [endTime, setEndTime] = useState('')

  // Fetch artist name from API if it is not provided in the data from the server
  useEffect(() => {
    if (booking) {
      const fetchArtistID = async () => {
        try {
          const artist = await getUserById(booking.artistID)
          const artistFullName = `${artist.firstName} ${artist.lastName}`
          setArtistName(artistFullName)
        } catch (error) {
          console.log(error)
        }
      }
      fetchArtistID()

      //Configure Time for display
      const formattedStartTime = formatDateTime(booking.startTime)
      const formattedEndTime = formatDateTime(booking.endTime)

      setStartTime(formattedStartTime)
      setEndTime(formattedEndTime)
    }
  }, [])

  const formatDateTime = (inputDateTime, outputFormat) => {
    const time = new Date(inputDateTime)
    const hour = time.getHours()
    const minutes = time.getMinutes()
    const formattedTime = `${hour.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`
    return formattedTime
  }

  return (
    <div className={styles.eventDetailsWrapper}>
      <div className={`${styles['event-prev-detail']} ${styles['artist-name']}`}>
        <Link
          className={`${styles['event-prev-detail']} ${styles['artist-name']}`}
          href={`/artists/${booking.artistID}`}
        >
          {artistName ? artistName : 'Not Provided'}
        </Link>
      </div>
      <div className={styles['event-prev-detail']}>
        {booking.locationVenue ? booking.locationVenue : 'Location not specified'}
      </div>
      <div className={styles['event-preview-schedule']}>
        <Clock color='orange' fill='orange' variant='Bold' />
        <div className={styles['event-prev-detail']}>{startTime}</div>
        <MdArrowForward color='white' />
        <div className={styles['event-prev-detail']}>{endTime}</div>
      </div>
    </div>
  )
}
