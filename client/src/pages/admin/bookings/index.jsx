// ** React Imports
import { useEffect, useState } from 'react'

//**Import Components */
import Tab from 'src/components/AdminPagesSharedComponents/ViewTab/Tab'
import Search from 'src/components/AdminPagesSharedComponents/Search/Search'

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

  return (
    <main className={styles.bookingsPage}>
      <nav className={styles.navigationPanel}>
        <div className={styles.calendarViewTabs}>
          <div className={styles.dateFilter}>
            <Tab className={styles.selectMonth}>
              <p>21 Mar</p>
            </Tab>
            <Tab className={styles.filterTab}>
              <p>Filter</p>
            </Tab>
          </div>
          <div className={styles.viewStylesTabs}>
            <Tab className={styles.threeDViewTab}>3D</Tab>
            <Tab className={styles.weekViewTab}>M</Tab>
            <Tab className={styles.weekViewTab}>W</Tab>
            <Tab className={`${styles.listViewTab} ${styles.activeTab}`}>List</Tab>
          </div>
          <div className={styles.searchBar}>
            <Search />
          </div>
        </div>
      </nav>
      <section className={styles.bookingStatusSection}>
        <div className={styles.bookingStatus}>
          <Tab>All</Tab>
          <Tab>Pending</Tab>
          <Tab>Approved</Tab>
          <Tab>Canceled</Tab>
        </div>
      </section>
      <section className={styles.monthlyLookaheadSection}>
        <div className={styles.monthLabel}>December</div>
        <div className={styles.allMonthEvents}>
          <div className={styles.monthEventListItem}>
            <div className={styles.statusInfo}>
              <div className={styles.statusIcon}></div>
              <div className={styles.calendarIcon}></div>
              <div className={styles.event}>
                <div className={styles.eventTitle}>Stockholm Music Festival</div>
                <div className={styles.eventArtist}>John Doe</div>
              </div>
            </div>

            <div className={styles.eventStatusButton}>
              <Tab>Details</Tab>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}

export default BookingPage

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
