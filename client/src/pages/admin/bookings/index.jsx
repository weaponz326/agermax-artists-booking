// ** React Imports
import { useEffect, useState } from 'react'

//**Import Components */
import TabButton from 'src/components/AdminPagesSharedComponents/ViewTab/TabButton'
import SearchBar from 'src/components/AdminPagesSharedComponents/SearchBar/SearchBar'
import CalendarIcon from 'src/components/AdminPagesSharedComponents/CalendarIcon/CalendarIcon'
import React from 'react'
import SlideInModal from 'src/components/AdminPagesSharedComponents/SlidingModal/SlideInModal'
import moment from 'moment' // Import moment library

//**Import Custom Styles */
import styles from './bookings.module.css'

//**Import External Components */
import { GridFilterAltIcon } from '@mui/x-data-grid'
// import { DatePicker, TimePicker } from 'antd'
import { ConfigProvider } from 'antd'
// import es from 'antd/locale/es_ES'
// import dayjs from 'dayjs'
// dayjs.locale('es')
// import 'dayjs/locale/es'

//Import from Material UI Components
import TextField from '@mui/material/TextField'
import Autocomplete from '@mui/material/Autocomplete'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import { DatePicker } from '@mui/x-date-pickers/DatePicker'
import { TimePicker } from '@mui/x-date-pickers/TimePicker'

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
  const [events, setEvents] = useState([])
  const [eventsStatusView, setEventsStatusView] = useState('all')
  const [pendingCount, setPendingCount] = useState(null)
  const [approvedCount, setApprovedCount] = useState(null)
  const [cancelledCount, setCancelledCount] = useState(null)

  return (
    <main className={styles.bookingsPage}>
      <AdminPagesNavBar
        events={events}
        setEvents={setEvents}
        user={user}
        activeEventsView={activeEventsView}
        setActiveEventsView={setActiveEventsView}
        eventsStatusView={eventsStatusView}
        setEventsStatusView={setEventsStatusView}
        bookings={bookings}
      />
      {activeEventsView === 'ListView' && (
        <EventsListView
          bookings={bookings}
          events={events}
          setEvents={setEvents}
          eventsStatusView={eventsStatusView}
          setEventsStatusView={setEventsStatusView}
          pendingCount={pendingCount}
          setPendingCount={setPendingCount}
          approvedCount={approvedCount}
          setApprovedCount={setApprovedCount}
          cancelledCount={cancelledCount}
          setCancelledCount={setCancelledCount}
        />
      )}
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

export const EventsListView = ({
  bookings,
  eventsStatusView,
  setEventsStatusView,
  pendingCount,
  setPendingCount,
  approvedCount,
  setApprovedCount,
  cancelledCount,
  setCancelledCount,
  events,
  setEvents
}) => {
  function groupBy(array, keyGetter) {
    const map = new Map()
    array.forEach(item => {
      const key = keyGetter(item)
      const collection = map.get(key)
      if (!collection) {
        map.set(key, [item])
      } else {
        collection.push(item)
      }
    })
    return map
  }

  useEffect(() => {
    if (bookings) {
      const monthNames = [
        'January',
        'February',
        'March',
        'April',
        'May',
        'June',
        'July',
        'August',
        'September',
        'October',
        'November',
        'December'
      ]
      const groupedByMonth = groupBy(bookings, booking => monthNames[new Date(booking.dateTimeRequested).getMonth()])

      const pendingBookings = bookings.filter(booking => booking.status === 'pending')
      setPendingCount(pendingBookings.length)

      const approvedBookings = bookings.filter(booking => booking.status === 'approved')
      setApprovedCount(approvedBookings.length)

      const cancelledBookings = bookings.filter(booking => booking.status === 'cancelled')
      setCancelledCount(cancelledBookings.length)

      if (eventsStatusView === 'all') {
        setEvents(bookings)
      }
      if (eventsStatusView === 'pending') {
        setEvents(pendingBookings)
      }
      if (eventsStatusView === 'approved') {
        setEvents(approvedBookings)
      }
      if (eventsStatusView === 'cancelled') {
        setEvents(cancelledBookings)
      }
    }
  }, [bookings, eventsStatusView, pendingCount, approvedCount, cancelledCount])

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
          {events && <div className={styles.statusCount}>{pendingCount}</div>}
        </TabButton>
        <TabButton
          onClick={() => setEventsStatusView('approved')}
          className={eventsStatusView === 'approved' ? `${styles.bookingStatusActiveButton}` : styles.listViewTab}
        >
          Approved
          {events && <div className={styles.statusCount}>{approvedCount}</div>}
        </TabButton>
        <TabButton
          onClick={() => setEventsStatusView('cancelled')}
          className={eventsStatusView === 'cancelled' ? `${styles.bookingStatusActiveButton}` : styles.listViewTab}
        >
          Cancelled
          {events && <div className={styles.statusCount}>{cancelledCount}</div>}
        </TabButton>
      </div>
      <EventsList events={events} eventsStatusView={eventsStatusView} />
    </section>
  )
}
export const AdminPagesNavBar = ({
  setActiveEventsView,
  activeEventsView,
  user,
  events,
  setEvents,
  eventsStatusView,
  setEventsStatusView,
  bookings
}) => {
  const [openModal, setOpenModal] = useState(false)

  //Search
  const [query, setQuery] = useState('')

  useEffect(() => {
    // if (events.length && query) {
    //   const filteredEventTitles = events.filter(event => {
    //     if (event.eventTitle) {
    //       return event.eventTitle.toLowerCase().includes(query.toLowerCase())
    //     }
    //   })
    //   setEvents(filteredEventTitles)
    // } else {
    //   setEvents(bookings)
    // }
    if (!query || query === '') {
      setEvents(bookings)
    } else {
    }
  }, [query])

  function handleQuery(e) {
    setQuery(e.target.value)
    setEventsStatusView('all')
    if (events) {
      if (!query || query === '') {
        setEvents(bookings)
      } else {
        const filteredList = events.filter(
          event => {
            if (event.eventTitle) event.eventTitle.toLowerCase().includes(query.toLowerCase())
          }
          //  || event.lastName.toLowerCase().includes(query.toLowerCase())
        )
        setEvents(filteredList)
      }
    }
  }

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
    <LocalizationProvider adapterLocale={AdapterDayjs}>
      <nav className={styles.navigationPanel}>
        <div className={styles.calendarViewTabs}>
          <div className={styles.dateFilter}>
            <TabButton className={styles.selectMonth}>
              <div className={styles.selectMonthContent}>{/* <DatePicker style={{ border: 'none' }} /> */}</div>
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
            <SearchBar placeholder='Search bookings ...' value={query} onChange={handleQuery} />
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
    </LocalizationProvider>
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
          <div className={styles.eventTitle}>
            {event.eventTitle ? event.eventTitle : 'Event Title Not Provided Yet'}
          </div>
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

const customLocale = {
  weekdays: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'] // Override the day abbreviations
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
    organizerID: '',
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
  const defaultValue = moment() // You can use any default date you want

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
    artist && setFormData({ ...formData, artistID: artistID, organizerID: user._id })
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
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <form className={styles.modalCardContentUserDetails} onSubmit={handleSubmit}>
          <div>Booking Details</div>
          <div>Organizer: {user ? `${user.firstName} ${user.lastName}` : ''}</div>
          <TextField
            placeholder='Event Title'
            className={styles.modalCardContentInputField}
            type='text'
            name='eventTitle'
            id='eventTitle'
            value={formData.eventTitle}
            onChange={handleChange}
            required
            label="Event's Title"
            size='small'
          />
          <Autocomplete
            disablePortal
            id='artistID'
            options={options.map(artist => ({
              artistID: artist._id,
              value: `${artist.firstName} ${artist.lastName}`,
              label: `${artist.firstName} ${artist.lastName}`
            }))}
            renderInput={params => <TextField {...params} label='Artist' />}
            size='small'
          />

          {/* <AutoComplete
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
          /> */}

          <DatePicker
            format='YYYY-MM-DD'
            placeholder='Select Date'
            className={styles.modalCardContentInputField}
            // showNow={false}
            name='dateTimeRequested'
            // defaultValue={formData.dateTimeRequested}
            value={formData.dateTimeRequested}
            onOk={handleChangeDate}
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
            // defaultValue={formData.startTime}
            onChange={handleChangeStartTime}
          />
          <TimePicker
            name='endTime'
            placeholder='End Time'
            minuteStep={15}
            showNow={false}
            showSecond={false}
            format='HH:mm'
            // defaultOpen={formData.endTime}
            onChange={handleChangeEndTime}
            aria-required
          />
          <TextField
            placeholder='Venue'
            className={styles.modalCardContentInputField}
            type='text'
            name='locationVenue'
            id='locationVenue'
            value={formData.locationVenue}
            onChange={handleChange}
            required
            variant='outlined'
            label='Venue'
            size='small'
          />
          <TextField
            placeholder='Expected Number of Guests'
            className={styles.modalCardContentInputField}
            type='number'
            step='1'
            min='1'
            name='numberOfGuests'
            id='numberOfGuests'
            value={formData.numberOfGuests}
            onChange={handleChange}
            helperText='Please enter a number greater than 0.'
            label='Number of Guests'
            size='small'
          />
          <button type='button' className={styles.addGalleryButton} onClick={() => setModalContentView('gallery')}>
            Add Gallery
          </button>
          <TabButton className={styles.modalCardContentSaveButton}>Book Now</TabButton>
        </form>
      </LocalizationProvider>
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
