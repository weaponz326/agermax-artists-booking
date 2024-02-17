// ** React Imports
import { useEffect, useState } from 'react'

//**Import Components */
import TabButton from 'src/components/AdminPagesSharedComponents/ViewTab/TabButton'
import SearchBar from 'src/components/AdminPagesSharedComponents/SearchBar/SearchBar'
import CalendarIcon from 'src/components/AdminPagesSharedComponents/CalendarIcon/CalendarIcon'
import React from 'react'
import SlideInModal from 'src/components/AdminPagesSharedComponents/SlidingModal/SlideInModal'

//**Import Custom Styles */
import styles from './bookings.module.css'

//**Import External Components */
import { GridFilterAltIcon } from '@mui/x-data-grid'
import { DatePicker, AutoComplete, TimePicker } from 'antd'
import dayjs from 'dayjs'

// import CalendarBookingCard from 'src/components/CalendarBookingCard/CalendarBookingCard'
import CustomFullCalendar from 'src/components/AdminPagesSharedComponents/CustomFullCalendar/CustomFullCalendar'

//Import services & Providers
import { useArtists } from 'src/providers/ArtistsProvider'
import { useBookings } from 'src/providers/BookingsProvider'
import { createBooking } from 'src/services/bookings'
import { ArrowBack } from '@material-ui/icons'
import UploadPictures from 'src/components/AdminPagesSharedComponents/UploadPictures/UploadPictures'

import { useAuth } from 'src/hooks/useAuth'

const BookingPage = () => {
  const [activeEventsView, setActiveEventsView] = useState('ThreeDView')
  const { bookings } = useBookings()
  const { artists } = useArtists()
  const { user, logout } = useAuth()

  return (
    <main className={styles.bookingsPage}>
      <AdminPagesNavBar user={user} activeEventsView={activeEventsView} setActiveEventsView={setActiveEventsView} />
      {activeEventsView === 'ListView' && <EventsListView bookings={bookings} />}
      {activeEventsView === 'ThreeDView' && <ThreeDView />}
      {activeEventsView === 'MonthView' && <MonthView />}
      {activeEventsView === 'WeekView' && <WeekView />}
    </main>
  )
}

export default BookingPage

export const ThreeDView = () => {
  return (
    <div className={styles.threeDCalendar}>
      <CustomFullCalendar view={'timeGridDay'} />
    </div>
  )
}

export const MonthView = () => {
  return (
    <div className={styles.threeDCalendar}>
      {/* <CalendarBookingCard /> */}
      <CustomFullCalendar view={'dayGridMonth'} />
    </div>
  )
}

export const WeekView = () => {
  return (
    <div className={styles.threeDCalendar}>
      <CustomFullCalendar view={'dayGridWeek'} />
    </div>
  )
}

export const EventsListView = ({ bookings }) => {
  const [events, setEvents] = useState([])
  const [eventsStatusView, setEventsStatusView] = useState('all')

  useEffect(() => {
    if (bookings) {
      //First Sort the bookings Ascending
      // const sortedBookingsByDate = bookings.sort(
      //   (a, b) => new Date(a.dateTimeRequested) - new Date(b.dateTimeRequested)
      // )
      //Use the buttons and filter and show the sorted bookings
      if (eventsStatusView === 'all') {
        setEvents(bookings)
      }
      if (eventsStatusView === 'pending') {
        setEvents(bookings.filter(booking => booking.status === 'pending'))
      }
      if (eventsStatusView === 'approved') {
        setEvents(bookings.filter(booking => booking.status === 'approved'))
      }
      if (eventsStatusView === 'cancelled') {
        setEvents(bookings.filter(booking => booking.status === 'cancelled'))
      }
    }
  }, [bookings, eventsStatusView])

  return (
    <section className={styles.bookingStatusSection}>
      <div className={styles.bookingStatus}>
        <TabButton
          onClick={() => setEventsStatusView('all')}
          className={eventsStatusView === 'all' ? `${styles.bookingStatusActiveButton}` : styles.listViewTab}
        >
          All
        </TabButton>
        <TabButton
          onClick={() => setEventsStatusView('pending')}
          className={eventsStatusView === 'pending' ? `${styles.bookingStatusActiveButton}` : styles.listViewTab}
        >
          Pending
          <div className={styles.statusCount}>6</div>
        </TabButton>
        <TabButton
          onClick={() => setEventsStatusView('approved')}
          className={eventsStatusView === 'approved' ? `${styles.bookingStatusActiveButton}` : styles.listViewTab}
        >
          Approved
        </TabButton>
        <TabButton
          onClick={() => setEventsStatusView('cancelled')}
          className={eventsStatusView === 'cancelled' ? `${styles.bookingStatusActiveButton}` : styles.listViewTab}
        >
          Cancelled
        </TabButton>
      </div>
      <EventsList events={events} eventsStatusView={eventsStatusView} />
    </section>
  )
}
export const AdminPagesNavBar = ({ setActiveEventsView, activeEventsView, user }) => {
  const [openModal, setOpenModal] = useState(false)

  function unhideModal() {
    setOpenModal(true)
  }

  function hideModal() {
    setOpenModal(false)
  }

  function handleTabSelection(e) {
    setActiveEventsView(e.target.id)
  }
  return (
    <nav className={styles.navigationPanel}>
      <div className={styles.calendarViewTabs}>
        <div className={styles.dateFilter}>
          <TabButton className={styles.selectMonth}>
            <div className={styles.selectMonthContent}>
              <DatePicker style={{ border: 'none' }} />
            </div>
          </TabButton>
          <TabButton className={styles.filterTab}>
            <div className={styles.filterTabContent}>
              <GridFilterAltIcon />
              <span>Filter</span>
            </div>
          </TabButton>
        </div>
        <div className={styles.viewStylesTabs}>
          <TabButton
            id={'ThreeDView'}
            onClick={e => handleTabSelection(e)}
            className={
              activeEventsView === 'ThreeDView' ? `${styles.listViewTab} ${styles.activeTab}` : styles.listViewTab
            }
          >
            3D
          </TabButton>
          <TabButton
            id={'MonthView'}
            onClick={e => handleTabSelection(e)}
            className={
              activeEventsView === 'MonthView' ? `${styles.listViewTab} ${styles.activeTab}` : styles.listViewTab
            }
          >
            M
          </TabButton>
          <TabButton
            id={'WeekView'}
            onClick={e => handleTabSelection(e)}
            className={
              activeEventsView === 'WeekView' ? `${styles.listViewTab} ${styles.activeTab}` : styles.listViewTab
            }
          >
            W
          </TabButton>
          <TabButton
            id={'ListView'}
            onClick={e => handleTabSelection(e)}
            className={
              activeEventsView === 'ListView' ? `${styles.listViewTab} ${styles.activeTab}` : styles.listViewTab
            }
          >
            List
          </TabButton>
        </div>
        <div className={styles.searchBar}>
          <SearchBar placeholder={'Search bookings ...'} />
        </div>
        <TabButton onClick={unhideModal} className={styles.addBookingsButton}>
          Add Bookings
        </TabButton>
        <SlideInModal
          openModal={openModal}
          unhideModal={unhideModal}
          hideModal={hideModal}
          modalContent={<BookingsModalContent user={user} />}
          SubmitButton={'Submit'}
        />
      </div>
    </nav>
  )
}

export const EventsList = ({ events, eventsStatusView }) => {
  const [groupedEvents, setGroupedEvents] = useState(null)

  useEffect(() => {
    if (events) {
      const groupedBookings = groupBookingsByMonth(events)
      const sortedGroups = sortGroupsByMonth(groupedBookings)
      setGroupedEvents(sortedGroups)
    }
  }, [events])

  // Function to group bookings by month and year
  const groupBookingsByMonth = bookings => {
    const groups = {}

    bookings.forEach(booking => {
      const date = new Date(booking.date)
      const year = date.getFullYear()
      const month = date.getMonth() + 1 // Adding 1 to get 1-based months

      const key = `${year}-${month.toString().padStart(2, '0')}` // Format: "YYYY-MM"

      if (!groups[key]) {
        groups[key] = []
      }
      groups[key].push(booking)
    })

    return groups
  }

  // Function to sort groups by month and year
  const sortGroupsByMonth = groups => {
    return Object.entries(groups).sort(([a], [b]) => {
      return new Date(a) - new Date(b)
    })
  }

  return (
    <section className={styles.monthlyLookaheadSection}>
      {/* <div className={styles.monthLabel}>{events.length}</div> */}
      <div className={styles.allEventsInMonth}>
        {events
          ? events.map(event => (
              <div key={event._id}>
                <EventsListItem event={event} />
              </div>
            ))
          : 'Loading...'}
        {events.length === 0 && `No ${eventsStatusView} events to display now.`}
      </div>
    </section>
  )
}

export const EventsListItem = ({ event }) => {
  const [artistName, setArtistName] = useState('')
  const { artists } = useArtists()
  useEffect(() => {
    if (artists && event) {
      const artist = artists.find(a => a._id === event.artistID)
      const artistFullName = artist ? `${artist.firstName} ${artist.lastName}` : 'Unknown Artist'
      setArtistName(artistFullName)
    }
  }, [event, artists])

  const eventStatus = {
    buttonStyle: {
      background: event.status === 'pending' ? 'Black' : 'White',
      color: event.status === 'pending' ? 'White' : 'Black',
      fontSize: '0.81rem'
    },
    buttonText: event.status === 'pending' ? 'Approve' : 'Details'
  }

  return (
    <div className={styles.monthEventListItem}>
      <div className={styles.statusInfo}>
        <EventStatusIcon event={event} />
        <CalendarIcon booking={event} />
        <div className={styles.event}>
          <div className={styles.eventTitle}>Stockholm Music Festival</div>
          <div className={styles.eventArtist}>{artistName}</div>
        </div>
      </div>

      <div className={styles.eventStatusButton}>
        {event.status === 'pending' && <TabButton buttonStyle={eventStatus.buttonStyle}>Approve</TabButton>}
        {event.status === 'approved' && <TabButton buttonStyle={eventStatus.buttonStyle}>Details</TabButton>}
        {event.status === 'cancelled' && <TabButton buttonStyle={eventStatus.buttonStyle}>Cancelled</TabButton>}
        {!event.status && <TabButton buttonStyle={eventStatus.buttonStyle}>N/A</TabButton>}
      </div>
    </div>
  )
}

export const EventStatusIcon = ({ style, className, event }) => {
  const statusIconColor = () => {
    switch (event.status) {
      case 'cancelled':
        return '#FF1E46'
      case 'approved':
        return '#27EC76'
      default:
        return '#FFD027'
    }
  }

  return <div style={{ background: statusIconColor() }} className={styles.statusIcon}></div>
}

export const BookingsModalContent = ({ user }) => {
  const [options, setOptions] = useState([])
  const [artistsOptions, setArtistsOptions] = useState([])
  const { artists } = useArtists()
  const [modalContentView, setModalContentView] = useState('details')
  const [formData, setFormData] = useState({
    // Initialize form data
    // Example:
    status: 'pending',
    organizerID: '65c9f17656ec877c775dc072',
    eventTitle: '',
    dateTimeRequested: '',
    startTime: '',
    endTime: '',
    getInTime: '',
    numberOfGuests: '',
    ageRange: '',
    locationVenue: '',
    artistID: '',
    availableTechnology: '',
    otherComments: '',
    gallery: []

    // Add other fields as needed
  })

  useEffect(() => {
    if (!artists) return
    setOptions(artists)
  }, [])

  const handleChange = e => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleChangeArtist = (artist, option) => {
    const { artistID } = option
    artist && setFormData({ ...formData, artistID: artistID })
  }

  const handleChangeDate = (date, dateString) => {
    date && setFormData({ ...formData, dateTimeRequested: date.toDate() })
  }

  const handleChangeGetInTime = (time, timeString) => {
    time && setFormData({ ...formData, getInTime: time.toDate() })
  }

  const handleChangeStartTime = (time, timeString) => {
    time && setFormData({ ...formData, startTime: time.toDate() })
  }

  const handleChangeEndTime = (time, timeString) => {
    time && setFormData({ ...formData, endTime: time.toDate() })
  }

  const handleSubmit = async e => {
    e.preventDefault()
    try {
      const newBooking = await createBooking(formData)
      console.log('New booking created: ', newBooking)
      // Optionally, you can redirect or perform any other action after successful booking creation
    } catch (error) {
      console.error('Error creating booking: ', error)
      // Handle error, e.g., display an error message to the user
    }
  }

  const filterOption = (inputValue, option) => {
    return option.label.toUpperCase().indexOf(inputValue.toUpperCase()) !== -1
  }

  const disabledDate = current => {
    // Can not select days before today and today
    return current && current < dayjs().endOf('day')
  }

  if (modalContentView === 'details') {
    return (
      <form className={styles.modalCardContentUserDetails} onSubmit={handleSubmit}>
        <h3>Booking Details</h3>
        <div>Organizer: {user ? `${user.firstName} ${user.lastName}` : ''}</div>
        <input
          placeholder='Event Title'
          className={styles.modalCardContentInputField}
          type='text'
          name='eventTitle'
          id='eventTitle'
          value={formData.eventTitle}
          onChange={handleChange}
          required
        />

        <AutoComplete
          onSelect={handleChangeArtist}
          defaultValue={formData.artistID}
          options={options.map(artist => ({
            artistID: artist._id,
            value: `${artist.firstName} ${artist.lastName}`,
            label: `${artist.firstName} ${artist.lastName}`
          }))}
          placeholder='Select Artist'
          filterOption={filterOption}
          allowClear
          aria-required
        />

        <DatePicker
          format='YYYY-MM-DD'
          placeholder='Select Date'
          className={styles.modalCardContentInputField}
          showNow={false}
          minuteStep={15}
          name='dateTimeRequested'
          defaultValue={formData.dateTimeRequested}
          onChange={handleChangeDate}
          disabledDate={disabledDate}
          aria-required
        />
        <TimePicker
          name='getInTime'
          placeholder='Get In Time'
          minuteStep={15}
          showNow={false}
          showSecond={false}
          format='HH:mm'
          defaultValue={formData.getInTime}
          onChange={handleChangeGetInTime}
        />
        <TimePicker
          name='startTime'
          placeholder='Start Time'
          minuteStep={15}
          showNow={false}
          showSecond={false}
          format='HH:mm'
          defaultValue={formData.startTime}
          onChange={handleChangeStartTime}
        />
        <TimePicker
          name='endTime'
          placeholder='End Time'
          minuteStep={15}
          showNow={false}
          showSecond={false}
          format='HH:mm'
          defaultOpen={formData.endTime}
          onChange={handleChangeEndTime}
          aria-required
        />
        <input
          placeholder='Venue'
          className={styles.modalCardContentInputField}
          type='text'
          name='locationVenue'
          id='locationVenue'
          value={formData.locationVenue}
          onChange={handleChange}
          required
        />
        <input
          placeholder='Expected Number of Guests'
          className={styles.modalCardContentInputField}
          type='number'
          step='1'
          min='1'
          name='numberOfGuests'
          id='numberOfGuests'
          value={formData.numberOfGuests}
          onChange={handleChange}
        />
        <button type='button' className={styles.addGalleryButton} onClick={() => setModalContentView('gallery')}>
          Add Gallery
        </button>
        <TabButton className={styles.modalCardContentSaveButton}>Book Now</TabButton>
      </form>
    )
  } else if (modalContentView === 'gallery') {
    return (
      <div>
        <p>Your Gallery</p>
        <UploadPictures />
        <button type='button' className={styles.addGalleryButton} onClick={() => setModalContentView('details')}>
          <ArrowBack />
          Back to details
        </button>
      </div>
    )
  }
}

BookingPage.authGuard = false
BookingPage.guestGuard = false
BookingPage.acl = {
  action: 'manage',
  subject: 'all' // Adjust the permissions as per your application's ACL configuration
}
