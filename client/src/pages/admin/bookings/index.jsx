// ** React Imports
import { useEffect, useState } from 'react'

//**Import Components */
import TabButton from 'src/components/AdminPagesSharedComponents/ViewTab/TabButton'
import SearchBar from 'src/components/AdminPagesSharedComponents/SearchBar/SearchBar'
import CalendarIcon from 'src/components/AdminPagesSharedComponents/CalendarIcon/CalendarIcon'

//**Import Custom Styles */
import styles from './bookings.module.css'

// ** MUI Imports
import Box from '@mui/material/Box'
import useMediaQuery from '@mui/material/useMediaQuery'

// ** Redux Imports
import { useDispatch, useSelector } from 'react-redux'

// ** Hooks
import { useSettings } from 'src/@core/hooks/useSettings'

// ** FullCalendar & App Components Imports
import Calendar from 'src/views/apps/calendar/Calendar'
import SidebarLeft from 'src/views/apps/calendar/SidebarLeft'
import CalendarWrapper from 'src/@core/styles/libs/fullcalendar'
import AddEventSidebar from 'src/views/apps/calendar/AddEventSidebar'

// ** Actions
import {
  addEvent,
  fetchEvents,
  deleteEvent,
  updateEvent,
  handleSelectEvent,
  handleAllCalendars,
  handleCalendarsUpdate
} from 'src/store/apps/calendar'
import { GridFilterAltIcon } from '@mui/x-data-grid'
import { DatePicker } from 'antd'
import { ListItemIcon } from '@material-ui/core'

// ** CalendarColors
const calendarsColor = {
  Personal: 'error',
  Business: 'primary',
  Family: 'warning',
  Holiday: 'success',
  ETC: 'info'
}

const BookingPage = () => {
  // ** States
  const [calendarApi, setCalendarApi] = useState(null)
  const [leftSidebarOpen, setLeftSidebarOpen] = useState(false)
  const [addEventSidebarOpen, setAddEventSidebarOpen] = useState(false)

  // ** Hooks
  const { settings } = useSettings()
  const dispatch = useDispatch()
  const store = useSelector(state => state.calendar)

  // ** Vars
  const leftSidebarWidth = 300
  const addEventSidebarWidth = 400
  const { skin, direction } = settings
  const mdAbove = useMediaQuery(theme => theme.breakpoints.up('md'))
  useEffect(() => {
    dispatch(fetchEvents(store.selectedCalendars))
  }, [dispatch, store.selectedCalendars])
  const handleLeftSidebarToggle = () => setLeftSidebarOpen(!leftSidebarOpen)
  const handleAddEventSidebarToggle = () => setAddEventSidebarOpen(!addEventSidebarOpen)

  const listOfEvents = []
  return (
    <main className={styles.bookingsPage}>
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
            <TabButton className={styles.threeDViewTab}>3D</TabButton>
            <TabButton className={styles.weekViewTab}>M</TabButton>
            <TabButton className={styles.weekViewTab}>W</TabButton>
            <TabButton className={`${styles.listViewTab} ${styles.activeTab}`}>List</TabButton>
          </div>
          <div className={styles.searchBar}>
            <SearchBar />
          </div>
        </div>
      </nav>
      <section className={styles.bookingStatusSection}>
        <div className={styles.bookingStatus}>
          <TabButton className={styles.bookingStatusAllButton}>All</TabButton>
          <TabButton>
            Pending <div className={styles.statusCount}>6</div>
          </TabButton>
          <TabButton>Approved</TabButton>
          <TabButton>Canceled</TabButton>
        </div>
      </section>
      <section className={styles.monthlyLookaheadSection}>
        <EventsList month={'December'} listOfEvents={listOfEvents} />
        <EventsList month={'January'} listOfEvents={listOfEvents} />
        <EventsList month={'February'} listOfEvents={listOfEvents} />
        <EventsList month={'March'} listOfEvents={listOfEvents} />
      </section>
    </main>
  )
}

export default BookingPage

export const EventsList = ({ month, listOfEvents }) => {
  return (
    <>
      <div className={styles.monthLabel}>{month}</div>
      <div className={styles.allEventsInMonth}>
        <EventsListItem />
        <EventsListItem />
        <EventsListItem approvalStatus={'pending'} />
      </div>
    </>
  )
}

export const EventsListItem = ({ approvalStatus }) => {
  const eventStatus = {
    buttonStyle: {
      background: approvalStatus === 'pending' ? 'Black' : 'White',
      color: approvalStatus === 'pending' ? 'White' : 'Black',
      fontSize: '0.81rem'
    },
    buttonText: approvalStatus === 'pending' ? 'Approve' : 'Details'
  }
  return (
    <div className={styles.monthEventListItem}>
      <div className={styles.statusInfo}>
        <div className={styles.statusIcon}></div>
        <CalendarIcon />
        <div className={styles.event}>
          <div className={styles.eventTitle}>Stockholm Music Festival</div>
          <div className={styles.eventArtist}>John Doe</div>
        </div>
      </div>

      <div className={styles.eventStatusButton}>
        <TabButton buttonStyle={eventStatus.buttonStyle}>{eventStatus.buttonText}</TabButton>
      </div>
    </div>
  )
}

// <CalendarWrapper
//   className='app-calendar'
//   sx={{
//     // boxShadow: skin === 'bordered' ? 0 : 6,
//     ...(skin === 'bordered' && { border: theme => `1px solid ${theme.palette.divider}` })
//   }}
// >
//   <SidebarLeft
//     store={store}
//     mdAbove={mdAbove}
//     dispatch={dispatch}
//     calendarApi={calendarApi}
//     calendarsColor={calendarsColor}
//     leftSidebarOpen={leftSidebarOpen}
//     leftSidebarWidth={leftSidebarWidth}
//     handleSelectEvent={handleSelectEvent}
//     handleAllCalendars={handleAllCalendars}
//     handleCalendarsUpdate={handleCalendarsUpdate}
//     handleLeftSidebarToggle={handleLeftSidebarToggle}
//     handleAddEventSidebarToggle={handleAddEventSidebarToggle}
//   />
//   <Box
//     sx={{
//       p: 6,
//       pb: 0,
//       flexGrow: 1,
//       borderRadius: 1,
//       boxShadow: 'none',
//       backgroundColor: 'background.paper',
//       ...(mdAbove ? { borderTopLeftRadius: 0, borderBottomLeftRadius: 0 } : {})
//     }}
//   >
//     <Calendar
//       store={store}
//       dispatch={dispatch}
//       direction={direction}
//       updateEvent={updateEvent}
//       calendarApi={calendarApi}
//       calendarsColor={calendarsColor}
//       setCalendarApi={setCalendarApi}
//       handleSelectEvent={handleSelectEvent}
//       handleLeftSidebarToggle={handleLeftSidebarToggle}
//       handleAddEventSidebarToggle={handleAddEventSidebarToggle}
//     />
//   </Box>
//   <AddEventSidebar
//     store={store}
//     dispatch={dispatch}
//     addEvent={addEvent}
//     updateEvent={updateEvent}
//     deleteEvent={deleteEvent}
//     calendarApi={calendarApi}
//     drawerWidth={addEventSidebarWidth}
//     handleSelectEvent={handleSelectEvent}
//     addEventSidebarOpen={addEventSidebarOpen}
//     handleAddEventSidebarToggle={handleAddEventSidebarToggle}
//   />
// </CalendarWrapper>
