// ** React Imports
import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import Link from 'next/link'

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
import { Modal } from '@mui/base/Modal'

// import CalendarBookingCard from 'src/components/CalendarBookingCard/CalendarBookingCard'
import CustomFullCalendar from 'src/components/AdminPagesSharedComponents/CustomFullCalendar/CustomFullCalendar'

//Import services & Providers
import { useArtists } from 'src/providers/ArtistsProvider'
import { useBookings } from 'src/providers/BookingsProvider'
import { createBooking } from 'src/services/bookings'
import { ArrowBack } from '@material-ui/icons'
import UploadPictures from 'src/components/AdminPagesSharedComponents/UploadPictures/UploadPictures'

import { useAuth } from 'src/hooks/useAuth'
import Upload from '@mui/icons-material/Upload'
import LimitTags from './LimitTagComponent'
import { useOrganizers } from 'src/providers/OrganizersProvider'
import { createInvoice } from 'src/services/invoice'
import AntDesignDatePicker from 'src/components/AdminPagesSharedComponents/AntDesignDatePicker/AntDesignDatePicker'
import { getUserById } from 'src/services/users'
import { BiTrash } from 'react-icons/bi'
import ServerActionModal from 'src/components/ServerActionModal/ServerActionModal'
import useBookingFormData from 'src/hooks/useBookingFormData'
import { Snackbar, Alert } from '@mui/material'

const BookingPage = () => {
  const [activeEventsView, setActiveEventsView] = useState('ListView')
  const { bookings } = useBookings()
  const { user, logout } = useAuth()
  const [events, setEvents] = useState([])
  const [eventsStatusView, setEventsStatusView] = useState('all')
  const [pendingCount, setPendingCount] = useState(null)
  const [approvedCount, setApprovedCount] = useState(null)
  const [cancelledCount, setCancelledCount] = useState(null)

  /****************Booking States Depending Different Users************/
  const [userBookings, setUserBookings] = useState([])

  useEffect(() => {
    if (bookings && user) {
      if (user.role === 'admin') {
        setUserBookings(bookings)
      } else if (user.role === 'organizer') {
        const userBookings = bookings.filter(booking => booking.organizerID === user._id)
        setUserBookings(userBookings)
      } else if (user.role === 'artist') {
        const userBookings = bookings.filter(booking => booking.artistID === user._id)
        setUserBookings(userBookings)
      }
    }
  }, [bookings, user])

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
        bookings={userBookings}
        logout={logout}
      />
      {activeEventsView === 'ListView' && (
        <EventsListView
          bookings={userBookings}
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
      <div className={styles.threeDCalendar}>
        {activeEventsView === 'ThreeDView' && <CustomFullCalendar view={'timeGridDay'} userBookings={userBookings} />}
        {activeEventsView === 'MonthView' && <CustomFullCalendar view={'dayGridMonth'} userBookings={userBookings} />}
        {activeEventsView === 'WeekView' && <CustomFullCalendar view={'dayGridWeek'} userBookings={userBookings} />}
      </div>
    </main>
  )
}

export default BookingPage

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
          {pendingCount && <div className={styles.statusCount}>{pendingCount}</div>}
        </TabButton>
        <TabButton
          onClick={() => setEventsStatusView('approved')}
          className={eventsStatusView === 'approved' ? `${styles.bookingStatusActiveButton}` : styles.listViewTab}
        >
          Approved
          {/* {events && <div className={styles.statusCount}>{approvedCount}</div>} */}
        </TabButton>
        <TabButton
          onClick={() => setEventsStatusView('cancelled')}
          className={eventsStatusView === 'cancelled' ? `${styles.bookingStatusActiveButton}` : styles.listViewTab}
        >
          Cancelled
          {/* {events && <div className={styles.statusCount}>{cancelledCount}</div>} */}
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

  /****************SnackBar Options***************/
  const [snackbarOpen, setSnackbarOpen] = useState(false)
  const [snackbarMessage, setSnackbarMessage] = useState('')
  const [snackbarSeverity, setSnackbarSeverity] = useState('info')
  const handleCloseSnackbar = (event, reason) => {
    if (reason === 'clickaway') {
      return
    }
    setSnackbarOpen(false)
  }

  //Search
  const [query, setQuery] = useState('')

  // Function to handle query changes
  function handleQuery(e) {
    const value = e.target.value
    setQuery(value)

    // Filter bookings based on the query
    if (!value.trim()) {
      // If query is empty, show all bookings
      setEvents(bookings)
    } else {
      // Otherwise, filter bookings based on the query
      const filteredList = bookings.filter(booking => booking.eventTitle.toLowerCase().includes(value.toLowerCase()))
      setEvents(filteredList)
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
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <nav className={styles.navigationPanel}>
        <div className={styles.calendarViewTabs}>
          <div className={styles.dateFilter}>
            <TabButton className={styles.selectMonth}>
              <div className={styles.selectMonthContent}>
                <AntDesignDatePicker />
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
            <SearchBar placeholder='Search bookings ...' value={query} onChange={handleQuery} />
          </div>
          {user && user.role != 'artist' && (
            <TabButton onClick={unhideModal} className={styles.addBookingsButton}>
              Add Bookings
            </TabButton>
          )}
          <SlideInModal
            openModal={openModal}
            unhideModal={unhideModal}
            hideModal={hideModal}
            modalContent={
              <BookingsModalContent
                user={user}
                setSnackbarMessage={setSnackbarMessage}
                setSnackbarOpen={setSnackbarOpen}
                setSnackbarSeverity={setSnackbarSeverity}
                hideModal={hideModal}
                unhideModal={unhideModal}
              />
            }
            SubmitButton={'Submit'}
          />
          <Snackbar
            open={snackbarOpen}
            autoHideDuration={6000}
            onClose={handleCloseSnackbar}
            hideModal={hideModal}
            anchorOrigin={{ vertical: 'down', horizontal: 'center' }}
          >
            <Alert onClose={handleCloseSnackbar} severity={snackbarSeverity} sx={{ width: '100%' }} variant='filled'>
              {snackbarMessage}
            </Alert>
          </Snackbar>
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

  /****************SnackBar Options***************/
  const [snackbarOpen, setSnackbarOpen] = useState(false)
  const [snackbarMessage, setSnackbarMessage] = useState('')
  const [snackbarSeverity, setSnackbarSeverity] = useState('info')
  const handleCloseSnackbar = (event, reason) => {
    if (reason === 'clickaway') {
      return
    }
    setSnackbarOpen(false)
  }

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
    setOpenModal(true)
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
          <div className={styles.eventTitle}>{event.eventTitle}</div>
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
      </div>
      <SlideInModal
        openModal={openModal}
        unhideModal={unhideModal}
        hideModal={hideModal}
        modalContent={
          <BookingsModalContent
            booking={event}
            hideModal={hideModal}
            unhideModal={unhideModal}
            setSnackbarMessage={setSnackbarMessage}
            setSnackbarOpen={setSnackbarOpen}
            setSnackbarSeverity={setSnackbarSeverity}
          />
        }
        SubmitButton={'Submit'}
      />
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
        hideModal={hideModal}
        anchorOrigin={{ vertical: 'down', horizontal: 'center' }}
      >
        <Alert onClose={handleCloseSnackbar} severity={snackbarSeverity} sx={{ width: '100%' }} variant='filled'>
          {snackbarMessage}
        </Alert>
      </Snackbar>
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

export const BookingsModalContent = ({
  booking,
  hideModal,
  setSnackbarMessage,
  setSnackbarOpen,
  setSnackbarSeverity
}) => {
  const router = useRouter()
  const { user } = useAuth()

  /****************Generic States***************/
  const [artistsOptions, setArtistsOptions] = useState([])
  const [organizersOptions, setOrganizersOptions] = useState([])
  const { artists } = useArtists()
  const { organizers } = useOrganizers()
  const [modalContentView, setModalContentView] = useState('details')
  const [bookingOrganizer, setBookingOrganizer] = useState([])
  const { updateBooking, deleteBooking, loading } = useBookings()
  const [open, setOpen] = useState(false)
  const [invoicedState, setInvoicedState] = useState(false)

  /****************Form Data***************/
  const { formData, setFormData, handleChangeFormData, handleChangeWithEvent } = useBookingFormData(booking)

  /****************Gallery********************/
  const [fileList, setFileList] = useState(formData.gallery)

  /****************Save Button Text********************/
  const [saveButtonText, setSaveButtonText] = useState('')
  useEffect(() => {
    if (booking === undefined) {
      setSaveButtonText('Create Booking')
    } else if ((booking != undefined && user && user.role === 'admin') || 'organizer') {
      setSaveButtonText('Update')
    } else if (booking != undefined && user && user.role === 'artist') {
      setSaveButtonText('Accept & Submit for Approval')
    }
    console.log('booking is: ', booking)
  }, [user, booking])

  /****************Invoice Data***************/
  const [invoiceData, setInvoiceData] = useState({
    booking: booking,
    amount: 0,
    tax: 0,
    email: '',
    status: 'unpaid',
    invoiceDate: dayjs(),
    paymentDueDate: dayjs().add(14, 'day')
  })

  useEffect(() => {
    if (!booking) return
    const fetchOrgData = async () => {
      const booker = await getUserById(booking.organizerID)
      setBookingOrganizer(booker)
      setInvoiceData({ ...invoiceData, email: booker.email })
    }
    fetchOrgData()
  }, [booking])

  const handleCreateInvoice = async e => {
    e.preventDefault()

    // Update formData with invoiced: true
    const updatedFormData = { ...formData, invoiced: true }

    try {
      // Update the booking first
      const updatedBooking = await updateBooking(updatedFormData)
      console.log('Booking invoiced Successfully! : ', updatedBooking)

      // If the booking is successfully updated, proceed to create the invoice
      const newInvoice = await createInvoice(invoiceData)
      console.log('Invoice created Successfully! : ', newInvoice)
      setSnackbarMessage('Booking invoiced Successfully! Redirecting to invoice details..')
      setSnackbarSeverity('success')
      setSnackbarOpen(true)

      router.push({ pathname: `/admin/finance/admin/details/${newInvoice._id}`, query: { type: 'invoice' } })
    } catch (error) {
      console.error('Error creating invoice: ', error)
      setSnackbarMessage('Booking invoicing failed!')
      setSnackbarSeverity('error')
      setSnackbarOpen(true)
      // Handle error, e.g., display an error message to the user
    }
  }

  /****************Both Invoice & FormData Actions***************/
  useEffect(() => {
    if (!artists && !organizers) return
    setArtistsOptions(artists)
    setOrganizersOptions(organizers)
  }, [artists, organizers])

  const handleSubmit = async e => {
    e.preventDefault()
    if (!booking) {
      try {
        const newBooking = await createBooking(formData)
        setSnackbarMessage('New Booking Created Successfully!')
        setSnackbarSeverity('success')
        setSnackbarOpen(true)
        console.log('New booking created: ', newBooking)
        hideModal()

        // Optionally, you can redirect or perform any other action after successful booking creation
      } catch (error) {
        // Handle error, e.g., display an error message to the user
        console.error('Error creating booking: ', error)
        setSnackbarMessage('Error creating booking!')
        setSnackbarSeverity('error')
        setSnackbarOpen(true)
      }
    } else {
      try {
        const newBooking = await updateBooking(formData)
        console.log('Booking Updated Successfully! : ', newBooking)
        setSnackbarMessage('Booking Updated Successfully!')
        setSnackbarSeverity('success')
        setSnackbarOpen(true)
        hideModal()

        // Optionally, you can redirect or perform any other action after successful booking creation
      } catch (error) {
        console.error('Error updating booking: ', error)
        // Handle error, e.g., display an error message to the user
        setSnackbarMessage('Error updating booking!')
        setSnackbarSeverity('error')
        setSnackbarOpen(true)
      }
    }
  }

  const handleRejectBooking = async e => {
    e.preventDefault()
    try {
      const newBooking = await updateBooking(formData)
      console.log('Booking Updated Successfully! : ', newBooking)
      setSnackbarMessage('Booking rejected successfully and set to cancelled!')
      setSnackbarSeverity('success')
      setSnackbarOpen(true)
      hideModal()

      // Optionally, you can redirect or perform any other action after successful booking creation
    } catch (error) {
      console.error('Error updating booking: ', error)
      // Handle error, e.g., display an error message to the user
      setSnackbarMessage('Error rejecting booking!')
      setSnackbarSeverity('error')
      setSnackbarOpen(true)
    }
  }

  const confirmDelete = () => {
    if (!loading) {
      setOpen(false)
      hideModal()
    }
  }

  const handleDelete = async booking => {
    try {
      const newBooking = await deleteBooking(booking)
      console.log('Booking deleted Successfully! : ', newBooking)
      setSnackbarMessage('Booking deleted permanently success!')
      setSnackbarSeverity('success')
      setSnackbarOpen(true)
      confirmDelete()

      // Optionally, you can redirect or perform any other action after successful booking creation
    } catch (error) {
      console.error('Error deleting booking: ', error)
      // Handle error, e.g., display an error message to the user
      setSnackbarMessage('Error deleting booking!')
      setSnackbarSeverity('error')
      setSnackbarOpen(true)
    }
  }

  const handleBackToDetails = () => {
    setModalContentView('details')
    // setFormData({ ...formData, gallery: fileList })
  }

  const onReject = () => {
    setFormData({ ...formData, status: 'cancelled' })
  }

  /*********************Rendering**********************/
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
            onChange={handleChangeWithEvent}
            required
            label="Event's Title"
            size='small'
            spellCheck
            disabled={user && user.role === 'artist'}
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
            readOnly={user && user.role === 'artist'}
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
            readOnly={user && user.role === 'artist'}
          />
          <DatePicker
            className={styles.modalCardContentInputField}
            label='Select Event Date'
            value={formData.dateTimeRequested}
            onChange={date => setFormData({ ...formData, dateTimeRequested: dayjs(date) })}
            slots={params => <TextField {...params} required />}
            disablePast
            readOnly={user && user.role === 'artist'}
          />
          <TimePicker
            className={styles.modalCardContentInputField}
            label='Get In Time'
            value={formData.getInTime}
            // onChange={time => setFormData({ ...formData, getInTime: time })}
            onChange={time => handleChangeFormData('getInTime', time)}
            minutesStep={15}
            format='HH:mm'
            ampm={false}
            skipDisabled
            disabled={!formData.dateTimeRequested}
            readOnly={user && user.role === 'artist'}
            name='getInTIme'
          />
          <TimePicker
            className={styles.modalCardContentInputField}
            label='Event Start Time'
            value={formData.startTime}
            // onChange={time => setFormData({ ...formData, startTime: dayjs(time) })}
            onChange={time => handleChangeFormData('startTime', time)}
            minutesStep={15}
            slots={params => <TextField {...params} required />}
            minTime={formData.getInTime ? dayjs(formData.getInTime).add(15, 'minute') : undefined}
            format='HH:mm'
            ampm={false}
            skipDisabled
            disabled={!formData.dateTimeRequested || !formData.getInTime}
            readOnly={user && user.role === 'artist'}
            name='startTime'
          />
          <TimePicker
            className={styles.modalCardContentInputField}
            label='Event End Time'
            value={formData.endTime}
            // onChange={time => setFormData({ ...formData, endTime: dayjs(time) })}
            onChange={time => handleChangeFormData('endTime', time)}
            slots={params => <TextField {...params} required />}
            minutesStep={15}
            minTime={formData.startTime ? dayjs(formData.startTime).add(30, 'minute') : undefined}
            format='HH:mm'
            ampm={false}
            skipDisabled
            disabled={!formData.startTime}
            readOnly={user && user.role === 'artist'}
            name='endTime'
          />

          <TextField
            placeholder='City/Venue'
            className={styles.modalCardContentInputField}
            type='text'
            name='locationVenue'
            id='locationVenue'
            value={formData.locationVenue}
            // onChange={handleChange}
            onChange={handleChangeWithEvent}
            // onChange={venue => handleChangeFormData('locationVenue', venue)}
            required
            variant='outlined'
            label='City/Venue'
            size='small'
            disabled={user && user.role === 'artist'}
          />
          <TextField
            placeholder='Street Address'
            className={styles.modalCardContentInputField}
            type='text'
            name='streetAddress'
            id='streetAddress'
            value={formData.streetAddress}
            // onChange={address => handleChangeFormData('streetAddress', address)}
            onChange={handleChangeWithEvent}
            required
            variant='outlined'
            label='Street Address'
            size='small'
            disabled={user && user.role === 'artist'}
          />
          <TextField
            placeholder='Expected Number of Guests'
            className={styles.modalCardContentInputField}
            type='number'
            name='numberOfGuests'
            id='numberOfGuests'
            value={formData.numberOfGuests}
            // onChange={guests => handleChangeFormData('numberOfGuests', guests)}
            onChange={handleChangeWithEvent}
            label='Number of Guests'
            size='small'
            disabled={user && user.role === 'artist'}
          />
          <LimitTags formData={formData} setFormData={setFormData} />
          <textarea
            className={styles.modalCardContentInputField}
            name='otherComments'
            id='otherComments'
            placeholder='Any Comments...'
            onChange={handleChangeWithEvent}
            value={formData.otherComments}
            rows={5}
          />

          {user && user.role != 'artist' && (
            <button
              disabled={user && user.role === 'artist'}
              type='button'
              className={styles.addGalleryButton}
              onClick={() => setModalContentView('gallery')}
            >
              Add Gallery <Upload />
            </button>
          )}

          {/* ****Conditional Rendering for different bookings Status ****/}
          {user && user.role === 'admin' && booking && booking.status === 'cancelled' && (
            <div>
              <label htmlFor='status'>Status:</label>
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
            </div>
          )}
          {/* ********************************** */}

          <TabButton className={styles.modalCardContentSaveButton}>{saveButtonText}</TabButton>
        </form>
        {user && user.role === 'admin' && booking && booking.status === 'cancelled' && (
          <div className={styles.bookingActionButtons}>
            <TabButton
              className={`${styles.modalCardContentSaveButton} ${styles.rejectButton}`}
              onClick={() => setOpen(true)}
            >
              Delete Booking Permanently <BiTrash />
            </TabButton>
            <ServerActionModal
              titleText={'Confirm Delete'}
              open={open}
              setOpen={setOpen}
              okText={'Yes, delete'}
              onOk={() => handleDelete(booking)}
              modalText={'You will not recover it again. Are you sure you want to delete this booking permanently? '}
            />
          </div>
        )}

        {/* *****Conditional Rendering for different bookings Status*** */}
        {booking && booking.status === 'pending' && (
          <div className={styles.bookingActionButtons}>
            {user && user.role === 'admin' && !booking.invoiced ? (
              <form
                // action={`/admin/finance/admin/details/${invoiceData._id}`}
                onSubmit={handleCreateInvoice}
              >
                <TabButton className={styles.modalCardContentSaveButton}>Create Invoice 👍</TabButton>
              </form>
            ) : (
              <div style={{ flex: 1 }}>
                <TabButton
                  // onClick={router.push({
                  //   pathname: `/admin/finance/admin/details/${newInvoice._id}`,
                  //   query: { type: 'invoice' }
                  // })}
                  className={`${styles.modalCardContentSaveButton} ${styles.modalCardContentInvoicedButton}`}
                  disabled={true}
                >
                  Invoiced! Awaiting Payment.👌
                </TabButton>
              </div>
            )}
            {!booking.invoiced && (
              <form onSubmit={handleRejectBooking}>
                <TabButton onClick={onReject} className={`${styles.modalCardContentSaveButton} ${styles.rejectButton}`}>
                  {user.role === 'admin' || 'artist' ? 'Reject Booking 👎' : 'Cancel Booking'}
                </TabButton>
              </form>
            )}
          </div>
        )}
        {/* ******************SnackBar****************/}
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
