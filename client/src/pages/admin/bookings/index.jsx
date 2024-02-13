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
import { DatePicker, Select, ConfigProvider } from 'antd'
// import CalendarBookingCard from 'src/components/CalendarBookingCard/CalendarBookingCard'
import CustomFullCalendar from 'src/components/AdminPagesSharedComponents/CustomFullCalendar/CustomFullCalendar'
import { useArtists } from 'src/providers/ArtistsProvider'
const BookingPage = () => {
  const [activeEventsView, setActiveEventsView] = useState('ThreeDView')

  if (activeEventsView === 'ListView') {
    return (
      <main className={styles.bookingsPage}>
        <AdminPagesNavBar activeEventsView={activeEventsView} setActiveEventsView={setActiveEventsView} />
        <EventsListView />
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

export const EventsListView = () => {
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
      <EventsList month={'December'} />
      <EventsList month={'January'} />
      <EventsList month={'February'} />
      <EventsList month={'March'} />
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
          saveButtonText={'Book Now'}
        />
      </div>
    </nav>
  )
}

export const EventsList = ({ month }) => {
  return (
    <section className={styles.monthlyLookaheadSection}>
      <div className={styles.monthLabel}>{month}</div>
      <div className={styles.allEventsInMonth}>
        <EventsListItem />
        <EventsListItem />
        <EventsListItem approvalStatus={'pending'} />
      </div>
    </section>
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
        <EventStatusIcon className={styles.statusIcon} />
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

export const EventStatusIcon = ({ style, className }) => {
  return <div style={style} className={className}></div>
}

export const BookingsModalContent = () => {
  const [options, setOptions] = useState([])
  const [artistsOptions, setArtistsOptions] = useState([])
  const { artists } = useArtists()

  useEffect(() => {
    const fetchArtists = async () => {
      // const artists = await getOnlyArtistsList()
      setArtistsOptions(artists)

      const newOptions = artists.map(artist => {
        const artistPicture = <img className={styles.optionsPicture} src={artist.picture} alt={artist.firstName} />
        return {
          label: (
            <div className={styles.optionsContainer}>
              {artistPicture}
              <span>
                {artist.firstName} {artist.lastName}
              </span>
            </div>
          ),
          value: `${artist.firstName}-${artist.lastName}`
        }
      })
      setOptions(newOptions)
    }
    fetchArtists()
  }, [])

  // const onSearch = value => {
  //   const newOptions = options.filter(artist => {
  //     if (artist.value.toLowerCase().includes(value)) {
  //       setOptions(artist)
  //     } else {
  //       return options
  //     }
  //   })
  // }

  const onChange = value => {
    // console.log(`selected ${value}`)
  }

  return (
    <div className={styles.modalCardContentUserDetails}>
      <h3>Booker Details</h3>
      <input
        placeholder='First Name'
        className={styles.modalCardContentInputField}
        type='text'
        name='first-name'
        id='first-name'
        required
      />
      <input
        placeholder='Last Name'
        className={styles.modalCardContentInputField}
        type='text'
        name='last-name'
        id='last-name'
        required
      />
      <input
        placeholder='Contact'
        className={styles.modalCardContentInputField}
        type='text'
        name='contact'
        id='contact'
        required
      />
      <input placeholder='Email Address' className={styles.modalCardContentInputField} type='text' name='' id='' />
      <ConfigProvider
        theme={{
          token: {
            controlPaddingHorizontalSM: '3rem'
          }
        }}
      >
        <ConfigProvider
          theme={{
            components: {
              Select: {
                selectorBg: '#f2f4f8',
                optionPadding: '0.5rem',
                dropdownBg: '#fff',
                // paddingSM: '3rem',
                paddingXS: '3rem'
              }
            }
          }}
        >
          <Select
            // showSearch
            className={styles.selectOptions}
            placeholder='Select An Artist'
            options={options}
            optionFilterProp='children'
            // onSearch={onSearch}
            onChange={onChange}
            allowClear
          />
        </ConfigProvider>
      </ConfigProvider>

      <DatePicker
        showTime={{
          format: 'HH:mm'
        }}
        format='YYYY-MM-DD HH:mm'
        placeholder='Select Start Date & Time'
        className={styles.modalCardContentInputField}
        showNow={false}
      />
      <DatePicker
        showTime={{
          format: 'HH:mm'
        }}
        format='YYYY-MM-DD HH:mm'
        placeholder='Select End Date & Time'
        className={styles.modalCardContentInputField}
        showNow={false}
      />
    </div>
  )
}

BookingPage.authGuard = false
BookingPage.guestGuard = false
BookingPage.acl = {
  action: 'manage',
  subject: 'all' // Adjust the permissions as per your application's ACL configuration
}
