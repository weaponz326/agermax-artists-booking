import { useEffect, useState } from 'react'
import { Clock, ExportSquare, Location, PlayCircle } from 'iconsax-react'
import CustomPagesLayout from 'src/layouts/CustomPagesLayout'
import styles from './artist-profile.module.css'
import { Drawer, ConfigProvider } from 'antd'
import { useRouter } from 'next/router'
import BookingCard from 'src/components/BookingCard/BookingCard'
import Link from 'next/link'
import { getEventsPhotos } from 'src/services/FetchData'
import Skeleton from '@mui/material/Skeleton'
import TransitionsModal from 'src/components/TransitionModal/TransitionModal'

function ArtistProfile() {
  const router = useRouter()
  const [artistDetails, setArtistsDetails] = useState(router.query)
  const [openSideDrawer, setOpenSideDrawer] = useState(false)
  const [openDrawer, setOpenDrawer] = useState(false)
  function drawerState(value) {
    setOpenDrawer(value)
  }
  return (
    <CustomPagesLayout>
      <main>
        <div className={styles['page-layout']}>
          <ArtisteProfileSection
            openDrawer={openDrawer}
            openSideDrawer={openSideDrawer}
            setOpenSideDrawer={setOpenSideDrawer}
            drawerState={drawerState}
            artistDetails={artistDetails}
          />
          <EventsSection artistDetails={artistDetails} />
        </div>
      </main>
    </CustomPagesLayout>
  )
}

export default ArtistProfile

const EventsSection = ({ artistDetails }) => {
  const [numberOfUpcomingEvents, setNumberOfUpcomingEvents] = useState(2)
  const [numberOfPastEvents, setNumberOfPastEvents] = useState(2)
  const [artistsUpcomingEvents, setArtistsUpcomingEvents] = useState([])
  const [artistsPastEvents, setArtistsPastEvents] = useState([])

  useEffect(() => {
    setArtistsUpcomingEvents(Array.from({ length: numberOfUpcomingEvents }))
  }, [numberOfUpcomingEvents])

  useEffect(() => {
    setArtistsPastEvents(Array.from({ length: numberOfPastEvents }))
  }, [numberOfPastEvents])

  const tabConfig = {
    'Upcoming Events': (
      <UpcomingEventsTable
        artistDetails={artistDetails}
        artistsUpcomingEvents={artistsUpcomingEvents}
        setArtistsUpcomingEvents={setArtistsUpcomingEvents}
        handleLoadMoreUpcomingEvents={handleLoadMoreUpcomingEvents}
      />
    ),
    'Past Events': (
      <PastEventsTable
        artistDetails={artistDetails}
        artistsPastEvents={artistsPastEvents}
        setArtistsPastEvents={setArtistsPastEvents}
        handleLoadPastEvents={handleLoadPastEvents}
      />
    )
  }

  function handleLoadMoreUpcomingEvents() {
    //Add Conditionals for a dding more depending on artist details length
    setNumberOfUpcomingEvents(current => current + 5)
  }
  function handleLoadPastEvents() {
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
        <VideoItem />
      </div>
    </section>
  )
}

export const VideoItem = () => {
  const [photos, setPhotos] = useState([])
  useEffect(() => {
    const fetchData = async () => {
      const eventPhotos = await getEventsPhotos()
      if (eventPhotos) setPhotos(eventPhotos.slice(0, 5))
      console.log(photos)
      return
    }

    fetchData()
  }, [])

  if (photos.length) {
    return (
      <>
        {photos.map((photo, index) => (
          <div className={styles['video-item']} key={index}>
            <div key={index}>
              <PlayCircle size={80} className={styles['play-icon']} color='white' />
              <img src={photo.urls.regular} alt='event-video' className={styles.videoImage} />
            </div>
          </div>
        ))}
      </>
    )
  } else {
    return (
      <>
        {Array.from({ length: 1 }).map((event, index) => (
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
        ))}
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

const ArtisteProfileSection = ({ artistDetails }) => {
  const [open, setOpen] = useState(false)

  return (
    <section>
      <Card className={styles['profile-card']}>
        <div className={styles['avatar-container']}>
          {artistDetails.length ? (
            <img src={artistDetails.picture} alt='profile-image' />
          ) : (
            <Skeleton
              animation='wave'
              variant='rounded'
              height={80}
              sx={{ borderRadius: '50%' }}
              className={styles['skeletonImg']}
            />
          )}
        </div>
        <h5 id={styles['username']}>
          {artistDetails ? `${artistDetails.firstName} ${artistDetails.lastName}` : 'John Doe'}
        </h5>
        <div className={styles['tags-container']}>
          <Tag>Rock</Tag>
          <Tag>Trubadur</Tag>
        </div>
        <div className={styles['button-container']}>
          <TransitionsModal
            open={open}
            setOpen={setOpen}
            btnClassName={styles['side-drawer-button']}
            modalContent={<BookingCard open={open} setOpen={setOpen} />}
          />
        </div>
        <div className={styles['bio-container']}>
          <p className={styles['title']}>Biography</p>
          <p className={styles['body']}>{artistDetails.bio}</p>
        </div>
      </Card>
    </section>
  )
}

const UpcomingEventsTable = ({ artistDetails, artistsUpcomingEvents, handleLoadMoreUpcomingEvents }) => {
  return (
    <>
      <div className={styles['events-table']}>
        {artistsUpcomingEvents.map((num, index) => (
          <div key={`event-tile-${index}`} className={styles['event-tile']}>
            <div className={styles['date']}>
              <p>Dec</p>
              <h5>18</h5>
            </div>
            <div className={styles['event-name']}>
              <div className={styles['name']}>
                <h5 className={styles['event-text']}>
                  {artistDetails.firstName} {artistDetails.lastName}
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
      <div onClick={handleLoadMoreUpcomingEvents} className={styles.moreBtn}>
        More
      </div>
    </>
  )
}

const PastEventsTable = ({ artistDetails, artistsPastEvents, handleLoadPastEvents }) => {
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
                  {artistDetails.firstName} {artistDetails.lastName}
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
