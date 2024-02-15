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

import { GridFilterAltIcon } from '@mui/x-data-grid'
import { DatePicker, AutoComplete, TimePicker, ConfigProvider } from 'antd'

// import CalendarBookingCard from 'src/components/CalendarBookingCard/CalendarBookingCard'
import CustomFullCalendar from 'src/components/AdminPagesSharedComponents/CustomFullCalendar/CustomFullCalendar'
import { useArtists } from 'src/providers/ArtistsProvider'
import { useBookings } from 'src/providers/BookingsProvider'

//Import services
import { createBooking } from 'src/services/bookings'

const BookingPage = () => {
  const [activeEventsView, setActiveEventsView] = useState('ThreeDView')
  const { bookings } = useBookings()
  const { artists } = useArtists()

  if (activeEventsView === 'ListView') {
    return (
      <main className={styles.bookingsPage}>
        <AdminPagesNavBar activeEventsView={activeEventsView} setActiveEventsView={setActiveEventsView} />
        <EventsListView bookings={bookings} />
      </main>
    )
  } else if (activeEventsView === 'ThreeDView') {
    return (
      <main className={styles.bookingsPage}>
        <AdminPagesNavBar setActiveEventsView={setActiveEventsView} activeEventsView={activeEventsView} />
        <ThreeDView />
      </main>
    )
  } else if (activeEventsView === 'MonthView') {
    return (
      <main className={styles.bookingsPage}>
        <AdminPagesNavBar setActiveEventsView={setActiveEventsView} activeEventsView={activeEventsView} />
        <MonthView />
      </main>
    )
  } else if (activeEventsView === 'WeekView') {
    return (
      <main className={styles.bookingsPage}>
        <AdminPagesNavBar setActiveEventsView={setActiveEventsView} activeEventsView={activeEventsView} />
        <WeekView />
      </main>
    )
  }
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
  useEffect(() => {
    if (bookings) {
      const sortedBookingsByDate = bookings.sort(
        (a, b) => new Date(b.dateTimeRequested) - new Date(a.dateTimeRequested)
      )
      setEvents(sortedBookingsByDate)
    }
  }, [bookings])

  return (
    <section className={styles.bookingStatusSection}>
      <div className={styles.bookingStatus}>
        <TabButton className={styles.bookingStatusAllButton}>All</TabButton>
        <TabButton>
          Pending
          <div className={styles.statusCount}>6</div>
        </TabButton>
        <TabButton>Approved</TabButton>
        <TabButton>Canceled</TabButton>
      </div>
      <EventsList events={events} />

      {/* <EventsList month={'January'} />
      <EventsList month={'February'} />
      <EventsList month={'March'} /> */}
    </section>
  )
}
export const AdminPagesNavBar = ({ setActiveEventsView, activeEventsView }) => {
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
          <SearchBar />
        </div>
        <TabButton onClick={unhideModal} className={styles.addBookingsButton}>
          Add Bookings
        </TabButton>
        <SlideInModal
          openModal={openModal}
          unhideModal={unhideModal}
          hideModal={hideModal}
          modalContent={<BookingsModalContent />}
          SubmitButton={'Submit'}
        />
      </div>
    </nav>
  )
}

export const EventsList = ({ events }) => {
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
      </div>
    </section>
  )
}

export const EventsListItem = ({ event }) => {
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
          <div className={styles.eventArtist}>{event.artistID}</div>
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

export const BookingsModalContent = () => {
  const [options, setOptions] = useState([])
  const [artistsOptions, setArtistsOptions] = useState([])
  const { artists } = useArtists()
  const [formData, setFormData] = useState({
    // Initialize form data
    // Example:
    status: 'pending',
    organizerID: '',
    bookingID: '',
    firstName: '',
    lastName: '',
    lastName: '',
    dateTimeRequested: '',
    startTime: '',
    endTime: '',
    getInTime: '',
    numberOfGuests: '',
    ageRange: '',
    locationVenue: '',
    artistID: '',
    availableTechnology: '',
    otherComments: ''

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

  return (
    <form className={styles.modalCardContentUserDetails} onSubmit={handleSubmit}>
      <h3>Booker Details</h3>
      <input
        placeholder='First Name'
        className={styles.modalCardContentInputField}
        type='text'
        name='firstName'
        id='firstName'
        value={formData.firstName}
        onChange={handleChange}
        required
      />
      <input
        placeholder='Last Name'
        className={styles.modalCardContentInputField}
        type='text'
        name='lastName'
        id='lastName'
        value={formData.lastName}
        onChange={handleChange}
        required
      />
      <input
        placeholder='Admin ID'
        className={styles.modalCardContentInputField}
        type='text'
        name='organizerID'
        id='organizerID'
        value={formData.organizerID}
        onChange={handleChange}
        required
      />
      <input
        placeholder='Booking ID'
        className={styles.modalCardContentInputField}
        type='number'
        name='bookingID'
        id='bookingID'
        value={formData.bookingID}
        onChange={handleChange}
        required
      />

      <AutoComplete
        // style={{
        //   width: 200
        // }}

        onSelect={handleChangeArtist}
        defaultValue={formData.artistID}
        options={options.map(artist => ({
          artistID: artist.artistID,
          value: `${artist.firstName} ${artist.lastName}`,
          label: `${artist.firstName} ${artist.lastName}`
        }))}
        placeholder='Select Artist'
        filterOption={filterOption}
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
      />
      <input
        placeholder='Venue'
        className={styles.modalCardContentInputField}
        type='text'
        name='locationVenue'
        id='locationVenue'
        value={formData.locationVenue}
        onChange={handleChange}
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
      <TabButton className={styles.modalCardContentSaveButton}>Book Now</TabButton>
    </form>
  )
}

BookingPage.authGuard = false
BookingPage.guestGuard = false
BookingPage.acl = {
  action: 'manage',
  subject: 'all' // Adjust the permissions as per your application's ACL configuration
}
