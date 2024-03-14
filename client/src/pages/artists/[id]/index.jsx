import { useEffect, useState } from 'react'
import { Clock, ExportSquare, Location, PlayCircle } from 'iconsax-react'
import CustomPagesLayout from 'src/layouts/CustomPagesLayout'
import styles from './artist-profile.module.css'
import { Drawer, ConfigProvider, Avatar } from 'antd'
import Image from 'next/image'

import { AntDesignOutlined, UserOutlined } from '@ant-design/icons'

import { useRouter } from 'next/router'
import BookingCard from 'src/components/BookingCard/BookingCard'
import Link from 'next/link'
import { getArtistById, getEventsPhotos } from 'src/services/artists'
import { getUserById } from 'src/services/users'
import Skeleton from '@mui/material/Skeleton'
import TransitionsModal from 'src/components/TransitionModal/TransitionModal'
import BookingsProvider from 'src/providers/BookingsProvider'
import { useBookings } from 'src/providers/BookingsProvider'
import FallbackSpinner from 'src/@core/components/spinner'
import { useAuth } from 'src/hooks/useAuth'

export const dateTimeFormat = (dateTime, format) => {
  const options = { month: 'short' }
  if (format === 'month') return new Date(dateTime).toLocaleString('en-US', options)
  if (format === 'day') {
    if (new Date(dateTime).getDate() < 10) return '0' + new Date(dateTime).getDate()
    return new Date(dateTime).getDate()
  }
  if (format === 'UTCHours') {
    if (new Date(dateTime).getUTCHours() < 10) return '0' + new Date(dateTime).getUTCHours()
    return new Date(dateTime).getUTCHours()
  }
  if (format === 'UTCMinutes') {
    if (new Date(dateTime).getUTCMinutes() < 10) return '0' + new Date(dateTime).getUTCMinutes()
    return new Date(dateTime).getUTCMinutes()
  }
}

function ArtistProfile() {
  const router = useRouter()
  const { id } = router.query
  const [artist, setArtist] = useState(null)
  const [openSideDrawer, setOpenSideDrawer] = useState(false)
  const [openDrawer, setOpenDrawer] = useState(false)
  const { user, logout } = useAuth()

  useEffect(() => {
    const fetchArtistID = async () => {
      try {
        const artist = await getUserById(id)
        setArtist(artist)
      } catch (error) {
        console.log('failed to fetch user')
      }
    }
    if (id) fetchArtistID()
  }, [id])

  function drawerState(value) {
    setOpenDrawer(value)
  }

  if (!artist) return null

  return (
    <CustomPagesLayout>
      <main>
        <BookingsProvider>
          <div className={styles['page-layout']}>
            <ArtisteProfileSection
              openDrawer={openDrawer}
              openSideDrawer={openSideDrawer}
              setOpenSideDrawer={setOpenSideDrawer}
              drawerState={drawerState}
              artist={artist}
              user={user}
              logout={logout}
            />
            <EventsSection artist={artist} />
          </div>
        </BookingsProvider>
      </main>
    </CustomPagesLayout>
  )
}

export default ArtistProfile

const EventsSection = ({ artist }) => {
  const { bookings } = useBookings()
  const [numberOfUpcomingEvents, setNumberOfUpcomingEvents] = useState(4)
  const [numberOfPastEvents, setNumberOfPastEvents] = useState(5)
  const [artistsUpcomingEvents, setArtistsUpcomingEvents] = useState([])
  const [artistsPastEvents, setArtistsPastEvents] = useState([])

  /******************Configure Events***************/
  useEffect(() => {
    if (!bookings) return
    // Get upcoming events for the current artist.
    let artistsFutureEvents = bookings.filter(
      booking =>
        booking.status === 'approved' &&
        booking.artistID === artist._id &&
        new Date(booking.dateTimeRequested) > new Date().getDate()
    )
    // .sort((a, b) => a.dateTimeRequested - b.dateTimeRequested)
    setArtistsUpcomingEvents(artistsFutureEvents.slice(0, numberOfUpcomingEvents))

    // Get past events for the current artist.
    let artistsPastEvents = bookings
      .filter(
        booking =>
          booking.status === 'approved' &&
          booking.artistID === artist._id &&
          new Date(booking.dateTimeRequested) < new Date().getDate()
      )
      .reverse()
    setArtistsPastEvents(artistsPastEvents.slice(0, numberOfPastEvents))
  }, [bookings, numberOfUpcomingEvents, numberOfPastEvents])

  /******************Configure Tab ***************/
  const tabConfig = {
    'Upcoming Events': (
      <EventsTable
        artist={artist}
        artistEvents={artistsUpcomingEvents}
        setArtistsUpcomingEvents={setArtistsUpcomingEvents}
        onLoadMore={handleLoadMoreUpcomingEvents}
        title={'Upcoming Events'}
        numberOfEvents={numberOfUpcomingEvents}
      />
    ),
    'Past Events': (
      <EventsTable
        artist={artist}
        artistEvents={artistsPastEvents}
        setArtistsPastEvents={setArtistsPastEvents}
        onLoadMore={handleLoadMorePastEvents}
        title={'Past Events'}
        numberOfEvents={numberOfPastEvents}
      />
    )
  }

  function handleLoadMoreUpcomingEvents() {
    //Add Conditionals for a dding more depending on artist details length
    setNumberOfUpcomingEvents(current => current + 5)
  }
  function handleLoadMorePastEvents() {
    //Add Conditionals for a dding more depending on artist details length
    setNumberOfPastEvents(current => current + 5)
  }

  return (
    <section className={styles['events-section']}>
      <Card className={styles['events-card']}>
        <TabView config={tabConfig} />
      </Card>

      <div className={styles['divider']}></div>
      <div className={styles['videos-block']}>
        <VideoItem artist={artist} />
      </div>
    </section>
  )
}

export const VideoItem = ({ artist }) => {
  const [artistVideoGallery, setArtistVideoGallery] = useState([])
  const { bookings } = useBookings()
  useEffect(() => {}, [])

  if (artist) {
    return (
      <>
        {artist.gallery.map((gallery, index) => (
          <div className={styles['video-item']} key={index}>
            <div key={index}>
              <PlayCircle size={80} className={styles['play-icon']} color='white' />
              <div className={styles.videoImage}>{gallery}</div>
              {/* <img src={gallery.urls.regular} alt='event-video' /> */}
            </div>
          </div>
        ))}
      </>
    )
  } else {
    return (
      <>
        <p>No videos available for this artist.</p>
        <div className={styles['video-item']}>
          <PlayCircle size={80} className={styles['play-icon']} color='white' />
          <Skeleton
            variant='rounded'
            animation='wave'
            height={300}
            sx={{ borderRadius: '21px' }}
            className={styles.videoImage}
          />
        </div>
      </>
    )
  }
}

const TabView = ({ config }) => {
  const [currentIndex, setCurrentIndex] = useState(0)

  return (
    <div className={styles['tab-container']}>
      <div className={styles['tab-menu']}>
        <div className={styles['tab-menu-wrapper']}>
          {Object.keys(config).map((item, index) => (
            <div
              onClick={() => setCurrentIndex(index)}
              key={`tab-item-${index}`}
              data-active={currentIndex === index}
              className={styles['tab-item']}
            >
              {item}
            </div>
          ))}
        </div>
      </div>
      <div className={styles['tab-content-wrapper']}>{Object.values(config)[currentIndex]}</div>
    </div>
  )
}

const ArtisteProfileSection = ({ artist, user, logout }) => {
  const [open, setOpen] = useState(false)

  const handleOpenBookingCard = () => {
    if (user) {
      setOpen(true)
    } else {
      logout()
    }
  }

  return (
    <section>
      <Card className={styles['profile-card']}>
        <div className={styles['avatar-container']}>
          {artist ? (
            <Image
              // className={styles['evt-img']}
              src={artist.profilePhoto ? artist.profilePhoto : '/images/artist-1.jpg'}
              alt='artistImg'
              loading='eager'
              fill
            />
          ) : (
            <Skeleton
              animation='wave'
              variant='rounded'
              height={100}
              sx={{ borderRadius: '50%' }}
              className={styles['skeletonImg']}
            />
          )}
        </div>
        <h5 id={styles['username']}>{artist ? `${artist.firstName} ${artist.lastName}` : 'Unknown Artist'}</h5>
        <div className={styles['tags-container']}>
          {artist && artist.genre.length > 0 ? (
            artist.genre.map((g, index) => <Tag key={`${g} index`}>{g}</Tag>)
          ) : (
            <Tag>No genre provided yet.</Tag>
          )}
        </div>
        <div className={styles['button-container']}>
          <TransitionsModal
            open={open}
            setOpen={setOpen}
            btnClassName={styles['side-drawer-button']}
            modalContent={<BookingCard open={open} setOpen={setOpen} artist={artist} />}
          />
        </div>
        <div className={styles['bio-container']}>
          <p className={styles['title']}>Biography</p>
          <p className={styles['body']}>{artist.bio ? artist.bio : 'No bio provided yet!'}</p>
        </div>
      </Card>
    </section>
  )
}

const EventsTable = ({ artist, artistEvents, title, onLoadMore, numberOfEvents }) => {
  if (!artistEvents.length) return <p>No {title} to display for this artist now.</p>
  return (
    <>
      <div className={styles['events-table']}>
        {artistEvents.map((event, index) => (
          <div key={`event-tile-${index}`} className={styles['event-tile']}>
            <div className={styles['date']}>
              <p>{dateTimeFormat(event.dateTimeRequested, 'month')}</p>
              <h5>{dateTimeFormat(event.dateTimeRequested, 'day')}</h5>
            </div>
            <div className={styles['event-name']}>
              <div className={styles['name']}>
                <h5 className={styles['event-text']}>{event.eventTitle}</h5>
                <img src='https://source.unsplash.com/3tYZjGSBwbk' alt='' />
              </div>
              <p className={styles['location-name']}>{event.locationVenue}</p>
            </div>
            <div className={styles['event-location']}>
              <Link href='#' className={styles.openMap}>
                Open Map <ExportSquare size={13} />
              </Link>
              <p className={styles['event-text']}>
                {event.streetAddress} <Location variant='Bold' size={12} />
              </p>
              <p className={styles['event-text']}>
                {dateTimeFormat(event.startTime, 'UTCHours')}:{dateTimeFormat(event.startTime, 'UTCMinutes')} -{' '}
                {dateTimeFormat(event.endTime, 'UTCHours')}:{dateTimeFormat(event.endTime, 'UTCMinutes')}{' '}
                <Clock size={12} variant='Bold' />
              </p>
            </div>
          </div>
        ))}
      </div>
      {numberOfEvents === artistEvents.length && (
        <div onClick={onLoadMore} className={styles.moreBtn}>
          More
        </div>
      )}
    </>
  )
}

const PastEventsTable = ({ artist, artistsPastEvents, handleLoadPastEvents }) => {
  if (artistsPastEvents === null) return <div>No Past Events to display for this artist.</div>
  return (
    <>
      <div className={styles['events-table']}>
        {artistsPastEvents.map((num, index) => (
          <div key={`event-tile-${index}`} className={styles['event-tile']}>
            <div className={styles['date']}>
              <p>Dec</p>
              <h5>18</h5>
            </div>
            <div className={styles['event-name']}>
              <div className={styles['name']}>
                <h5 className={styles['event-text']}>
                  {artist.firstName} {artist.lastName}
                </h5>
                <img src='https://source.unsplash.com/3tYZjGSBwbk' alt='' />
              </div>
              <p className={styles['location-name']}>Stockholm Music Stadium</p>
            </div>
            <div className={styles['event-location']}>
              <Link href='#' className={styles.openMap}>
                Open Map <ExportSquare size={13} />
              </Link>
              <p className={styles['event-text']}>
                Street address 18 <Location variant='Bold' size={12} />
              </p>
              <p className={styles['event-text']}>
                20:00 - 01:00 <Clock size={12} variant='Bold' />
              </p>
            </div>
          </div>
        ))}
      </div>
      <div onClick={handleLoadPastEvents} className={styles.moreBtn}>
        More
      </div>
    </>
  )
}

const Card = ({ children, className }) => {
  return <div className={`${styles['card']} ${className}`}>{children}</div>
}

export const SideDrawerButton = ({ openSideDrawer, openDrawer, setOpenSideDrawer, drawerState }) => {
  const [open, setOpen] = useState(false)

  useEffect(() => {
    if (openDrawer) {
      setOpen(true)
      drawerState(false)
    }
  })

  const [bookingCardType, setBookingCardType] = useState('schedule')
  const showDrawer = () => {
    setOpen(true)
  }
  const onClose = () => {
    setBookingCardType('schedule')
    setOpen(false)
  }

  return (
    <div>
      <ConfigProvider
        theme={{
          token: {
            paddingLG: '2rem',
            padding: '1rem',
            controlHeightLG: '8rem'
          }
        }}
      >
        <Drawer
          style={{ background: 'none', border: 'none' }}
          onClose={onClose}
          width={450}
          open={open}
          autoFocus
          closable={false}
          title={null}
        >
          <BookingCard setOpen={setOpen} bookingCardType={bookingCardType} setBookingCardType={setBookingCardType} />
        </Drawer>
      </ConfigProvider>
    </div>
  )
}

export const Tag = ({ children }) => {
  return (
    <div className={styles['tag']}>
      <span>{children}</span>
    </div>
  )
}

ArtistProfile.authGuard = false
ArtistProfile.guestGuard = false
ArtistProfile.acl = {
  action: 'manage',
  subject: 'all' // Adjust the permissions as per your application's ACL configuration
}
ArtistProfile.getLayout = page => <div>{page}</div>
