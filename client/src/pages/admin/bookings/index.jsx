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
import dayjs from 'dayjs'

//Import from Material UI Components
import TextField from '@mui/material/TextField'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import { DatePicker } from '@mui/x-date-pickers/DatePicker'
import { TimePicker } from '@mui/x-date-pickers/TimePicker'
import Autocomplete from '@mui/material/Autocomplete'
import { Select } from '@mui/base/Select'
import { Option } from '@mui/base/Option'

// import CalendarBookingCard from 'src/components/CalendarBookingCard/CalendarBookingCard'
import CustomFullCalendar from 'src/components/AdminPagesSharedComponents/CustomFullCalendar/CustomFullCalendar'

//Import services & Providers
import { useArtists } from 'src/providers/ArtistsProvider'
import { useBookings } from 'src/providers/BookingsProvider'
import { createBooking, updateBooking } from 'src/services/bookings'
import { ArrowBack } from '@material-ui/icons'
import UploadPictures from 'src/components/AdminPagesSharedComponents/UploadPictures/UploadPictures'

import { useAuth } from 'src/hooks/useAuth'
import Upload from '@mui/icons-material/Upload'
import LimitTags from './LimitTagComponent'
import { useOrganizers } from 'src/providers/OrganizersProvider'
import { createInvoice } from 'src/services/invoice'

const BookingPage = () => {
  const [activeEventsView, setActiveEventsView] = useState('ListView')
  const { bookings } = useBookings()
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
        logout={logout}
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
  logout,
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
    // if (user) {
    setOpenModal(true)
    // } else {
    //   logout()
    // }
  }

  function hideModal() {
    setOpenModal(false)
  }

  function handleTabSelection(e) {
    setActiveEventsView(e.target.id)
  }

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <nav className={styles.navigationPanel}>
        <div className={styles.calendarViewTabs}>
          <div className={styles.dateFilter}>
            <TabButton className={styles.selectMonth}>
              {/* <div className={styles.selectMonthContent}>
                <DatePicker style={{ border: 'none' }} />
              </div> */}
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
  const [openModal, setOpenModal] = useState(false)

  useEffect(() => {
    if (artists && event) {
      const artist = artists.find(a => a._id === event.artistID)
      const artistFullName = artist ? `${artist.firstName} ${artist.lastName}` : 'Unknown Artist'
      setArtistName(artistFullName)
    }
  }, [event, artists])

  /************* */
  //Modal Functions
  function unhideModal() {
    // if (user) {
    setOpenModal(true)
    // } else {
    //   logout()
    // }
  }

  function hideModal() {
    setOpenModal(false)
  }
  /************* */

  const eventStatusStyle = () => {
    if (event.status === 'pending') {
      return { background: 'Black', color: 'White', fontSize: '0.81rem' }
    }
    if (event.status === 'approved') {
      return { background: 'white', color: 'black', fontSize: '0.81rem' }
    }
    if (event.status === 'cancelled') {
      return { background: 'gray', color: 'white', fontSize: '0.81rem' }
    }
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
        {/* {event.status === 'pending' && <TabButton buttonStyle={eventStatus.buttonStyle}>Approve</TabButton>} */}
        {event.status && (
          <TabButton onClick={unhideModal} buttonStyle={eventStatusStyle()}>
            Details
          </TabButton>
        )}
        {/* {event.status === 'cancelled' && <TabButton buttonStyle={eventStatus.buttonStyle}>Cancelled</TabButton>} */}
      </div>
      <SlideInModal
        openModal={openModal}
        unhideModal={unhideModal}
        hideModal={hideModal}
        modalContent={<BookingsModalContent booking={event} />}
        SubmitButton={'Submit'}
      />
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

export const BookingsModalContent = ({ booking }) => {
  /****************Generic States***************/
  const [artistsOptions, setArtistsOptions] = useState([])
  const [organizersOptions, setOrganizersOptions] = useState([])
  const { artists } = useArtists()
  const { organizers } = useOrganizers()
  const [modalContentView, setModalContentView] = useState('details')
  const [bookingOrganizer, setBookingOrganizer] = useState('')

  /****************Form Data***************/
  const [formData, setFormData] = useState({
    // Initialize form data
    _id: booking && booking._id,
    status: booking?.status || 'pending',
    organizerID: booking?.organizerID || '',
    eventTitle: booking?.eventTitle || '',
    dateTimeRequested: booking ? dayjs(booking.dateTimeRequested) : '',
    startTime: booking ? dayjs(booking.startTime) : '',
    endTime: booking ? dayjs(booking.endTime) : '',
    getInTime: booking ? dayjs(booking.getInTime) : '',
    numberOfGuests: booking?.numberOfGuests || '',
    ageRange: booking?.ageRange || '',
    locationVenue: booking?.locationVenue || '',
    artistID: booking?.artistID || '',
    availableTechnology: booking?.availableTechnology || '',
    otherComments: booking?.otherComments || '',
    gallery: booking?.gallery || [],
    genre: booking?.genre || []
  })

  /****************Gallery***************/
  const [fileList, setFileList] = useState(formData.gallery)

  /****************Invoice Data***************/
  const [invoiceData, setInvoiceData] = useState({
    booking: booking && booking._id,
    amount: booking?.amount || 0,
    tax: booking?.tax || 0,
    email: booking?.email || 'tobeLinked@gmail.com',
    status: booking?.status || '',
    invoiceDate: dayjs(booking?.invoiceDate) || '',
    paymentDueDate: dayjs(booking?.paymentDueDate) || ''
  })

  const handleCreateInvoice = async e => {
    e.preventDefault()
    try {
      const newInvoice = await createInvoice(invoiceData)
      console.log('Invoice created Successfully! : ', newInvoice)
      // Optionally, you can redirect or perform any other action after successful booking creation
    } catch (error) {
      console.error('Error creating invoice: ', error)
      // Handle error, e.g., display an error message to the user
    }
  }

  /****************Both Invoice & FormData Actions***************/
  useEffect(() => {
    if (!artists && !organizers) return
    setArtistsOptions(artists)
    setOrganizersOptions(organizers)
  }, [artists, organizers])

  const handleChange = e => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = async e => {
    e.preventDefault()
    if (!booking) {
      try {
        const newBooking = await createBooking(formData)
        console.log('New booking created: ', newBooking)
        // Optionally, you can redirect or perform any other action after successful booking creation
      } catch (error) {
        console.error('Error creating booking: ', error)
        // Handle error, e.g., display an error message to the user
      }
    } else {
      try {
        const newBooking = await updateBooking(formData)
        console.log('Booking Updated Successfully! : ', newBooking)
        // Optionally, you can redirect or perform any other action after successful booking creation
      } catch (error) {
        console.error('Error updating booking: ', error)
        // Handle error, e.g., display an error message to the user
      }
    }
  }

  const handleRejectBooking = async e => {
    e.preventDefault()
    try {
      const newBooking = await updateBooking(formData)
      console.log('Booking Updated Successfully! : ', newBooking)
      // Optionally, you can redirect or perform any other action after successful booking creation
    } catch (error) {
      console.error('Error updating booking: ', error)
      // Handle error, e.g., display an error message to the user
    }
  }

  const handleBackToDetails = () => {
    setModalContentView('details')
    // setFormData({ ...formData, gallery: fileList })
  }

  const onReject = () => {
    setFormData({ ...formData, status: 'cancelled' })
  }

  /*****************Rendering***************/
  if (modalContentView === 'details') {
    return (
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <form className={styles.modalCardContentUserDetails} onSubmit={handleSubmit}>
          <h3 style={{ margin: '0' }}>Booking Details</h3>
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
            spellCheck
          />
          <Autocomplete
            className={styles.modalCardContentInputField}
            onChange={(event, organizer) => {
              if (organizer) setFormData({ ...formData, organizerID: organizer._id })
            }}
            id='organizerID'
            options={organizersOptions}
            getOptionLabel={option => option.fullName}
            renderInput={params => <TextField {...params} label='Organizer' required />}
            size='small'
            sx={{ padding: '0' }}
            value={organizersOptions.find(opt => opt._id === formData.organizerID) || null}
          />
          <Autocomplete
            className={styles.modalCardContentInputField}
            onChange={(event, artist) => {
              if (artist) setFormData({ ...formData, artistID: artist._id })
            }}
            id='artistID'
            options={artistsOptions}
            getOptionLabel={option => option.fullName}
            renderInput={params => <TextField {...params} label='Artist' required />}
            size='small'
            sx={{ padding: '0' }}
            value={artistsOptions.find(opt => opt._id === formData.artistID) || null}
          />
          <DatePicker
            className={styles.modalCardContentInputField}
            label='Select Event Date'
            value={formData.dateTimeRequested}
            onChange={date => setFormData({ ...formData, dateTimeRequested: dayjs(date) })}
            slots={params => <TextField {...params} required />}
            disablePast
          />
          <TimePicker
            className={styles.modalCardContentInputField}
            label='Get In Time'
            value={formData.getInTime}
            onChange={time => setFormData({ ...formData, getInTime: time })}
            minutesStep={15}
          />
          <TimePicker
            className={styles.modalCardContentInputField}
            label='Event Start Time'
            value={formData.startTime}
            onChange={time => setFormData({ ...formData, startTime: dayjs(time) })}
            minutesStep={15}
            slots={params => <TextField {...params} required />}
          />
          <TimePicker
            className={styles.modalCardContentInputField}
            label='Event End Time'
            value={formData.startTime}
            onChange={time => setFormData({ ...formData, endTime: dayjs(time) })}
            slots={params => <TextField {...params} required />}
            minutesStep={15}
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
            name='numberOfGuests'
            id='numberOfGuests'
            value={formData.numberOfGuests}
            onChange={handleChange}
            label='Number of Guests'
            size='small'
          />
          <LimitTags formData={formData} setFormData={setFormData} />
          <textarea
            className={styles.modalCardContentInputField}
            name='otherComments'
            id='otherComments'
            placeholder='Any Comments...'
            onChange={handleChange}
            value={formData.otherComments}
          />
          <button type='button' className={styles.addGalleryButton} onClick={() => setModalContentView('gallery')}>
            Add Gallery <Upload />
          </button>
          {booking.status === 'cancelled' && (
            <select
              className={styles.modalCardContentInputField}
              name='status'
              id='status'
              value={formData.status}
              onChange={e => setFormData({ ...formData, status: e.target.value })}
            >
              <option value='cancelled' selected>
                Cancelled
              </option>
              <option value='pending'>Pending</option>
            </select>
          )}
          <TabButton className={styles.modalCardContentSaveButton}>{booking ? 'Update' : 'Book Now'}</TabButton>
        </form>

        {/* Conditional Rendering for different bookings Status */}
        {booking.status === 'pending' && (
          <div className={styles.bookingActionButtons}>
            <form action='/admin/admin/finance' onSubmit={handleCreateInvoice}>
              <TabButton className={styles.modalCardContentSaveButton}>Create Invoice 👍</TabButton>
            </form>
            <form onSubmit={handleRejectBooking}>
              <TabButton onClick={onReject} className={`${styles.modalCardContentSaveButton} ${styles.rejectButton}`}>
                Reject Booking 👎
              </TabButton>
            </form>
          </div>
        )}
      </LocalizationProvider>
    )
  } else if (modalContentView === 'gallery') {
    return (
      <div className={styles.addGalleryContainer}>
        <p>Your Gallery</p>
        <UploadPictures formData={formData} setFormData={setFormData} fileList={fileList} setFileList={setFileList} />
        <button type='button' className={styles.backToDetailsButton} onClick={handleBackToDetails}>
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
