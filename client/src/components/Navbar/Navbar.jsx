import { useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import styles from './navbar.module.css'
import { CSSTransition } from 'react-transition-group'
import { Dropdown, DatePicker, Space, AutoComplete, ConfigProvider } from 'antd'

import CustomizedDropdown from '../Dropdown/CustomizedDropDown'
const { RangePicker, TimePicker } = DatePicker
import dayjs from 'dayjs'
import customParseFormat from 'dayjs/plugin/customParseFormat'
dayjs.extend(customParseFormat)
import TabButton from '../AdminPagesSharedComponents/ViewTab/TabButton'
import SearchBar from '../AdminPagesSharedComponents/SearchBar/SearchBar'
import CircularProgress from '@mui/material/CircularProgress'
import TextField from '@mui/material/TextField'

import { createBooking } from 'src/services/bookings'
import { useArtists } from 'src/providers/ArtistsProvider'
import { useAuth } from 'src/hooks/useAuth'
import BookingCard from '../BookingCard/BookingCard'

// const disabledDate = current => {
//   // Can not select days before today and today
//   return current && current < dayjs().endOf('day')
// }

export default function Navbar() {
  const [hideMenuItems, setHideMenuItems] = useState(true)
  const { user, logout, loading } = useAuth()

  const navBarRef = useRef()

  return (
    <nav className={styles['header-navbar']} ref={navBarRef}>
      <div className={styles.navBarContainer}>
        <div className={`${styles['top-bar']} ${styles['nav-bar']}`}>
          <div className={styles.agermaxLogoContainer}>
            <Link href='/'>
              <img className={styles['logo-img ']} alt='App dark' src='/images/logo.png' />
            </Link>
          </div>
          <BookArtistPanel
            hideMenuItems={hideMenuItems}
            setHideMenuItems={setHideMenuItems}
            navBarRef={navBarRef}
            user={user}
            logout={logout}
          />
          {loading ? (
            <div className={styles.userActionsButtons}>
              <CircularProgress disableShrink />
            </div>
          ) : (
            <CustomizedDropdown className={styles.userActionsButtons} user={user} logout={logout} />
          )}
        </div>
      </div>
    </nav>
  )
}

const BookArtistPanel = ({ hideMenuItems, setHideMenuItems, user, logout }) => {
  const [options, setOptions] = useState([])
  const [selectedArtist, setSelectedArtist] = useState({})

  const { artists } = useArtists()
  const menuBarWrapper = useRef()
  const searchBarContainerRef = useRef()
  const [activeInputTab, setActiveInputTab] = useState(null)
  // const [formData, setFormData] = useState({
  //   status: 'pending',
  //   organizerID: '',
  //   eventTitle: 'Not Provided yet.',
  //   dateTimeRequested: '',
  //   startTime: '',
  //   endTime: '',
  //   getInTime: '',
  //   numberOfGuests: '',
  //   ageRange: '',
  //   locationVenue: '',
  //   artistID: '',
  //   availableTechnology: '',
  //   otherComments: '',
  //   gallery: []
  // })

  const datePickerRef = useRef(null)
  const getInTimeRef = useRef(null)
  const startTimeRef = useRef(null)
  const endTimeRef = useRef(null)

  useEffect(() => {
    // if (activeInputTab == 1) datePickerRef.current.focus()
    // if (activeInputTab == 2) getInTimeRef.current.focus()
    // if (activeInputTab == 3) startTimeRef.current.focus()
    // if (activeInputTab == 4) endTimeRef.current.focus()
  }, [activeInputTab])

  useEffect(() => {
    //Get All Artists Lists
    if (artists) setOptions(artists)
  }, [artists])

  //Effects from scroll and click events
  useEffect(() => {
    const handleScroll = () => {
      setHideMenuItems(true)
      // setActiveTab(null)
    }
    window.addEventListener('scroll', handleScroll)
    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [hideMenuItems])

  //*********** */
  //Click Event handler
  // useEffect(() => {
  //   //Listen to a click event outside the searchBarContainer ref and set activeTab to null
  //   const handleClickOutsideSearch = event => {
  //     event.stopPropagation()
  //     const menuWrapper = event.target.closest('.menu-bar-wrapper')
  //     const antDropdown = event.target.closest('.ant-select-dropdown')
  //     const antDropdownPicker = event.target.closest('.ant-picker-dropdown')
  //     const antDropdownMenu = event.target.closest('.ant-dropdown-menu')
  //     const bookingCardWrapper = event.target.closest('.bookingCardWrapper')

  //     // if (navBarRef.current) return
  //     if (antDropdown) return
  //     if (antDropdownMenu) return
  //     if (antDropdownPicker) return
  //     if (bookingCardWrapper) return
  //     if (menuWrapper == null) {
  //       // setActiveTab(null)
  //       setHideMenuItems(true)
  //     }
  //   }
  //   document.addEventListener('click', handleClickOutsideSearch)
  //   return () => {
  //     document.removeEventListener('click', handleClickOutsideSearch)
  //   }
  // }, [])
  //************** */
  const handleChangeArtist = value => {
    setActiveInputTab(10)
    const artist = options.find(artist => `${artist.firstName} ${artist.lastName}` === value)
    handleSetFormData(0, 'artistID', artist._id)
    setSelectedArtist(artist)
  }

  function handleSetFormData(id, name, value) {
    const index = parseInt(id) + 1
    setActiveInputTab(index)
    // setFormData(oldValue => ({ ...oldValue, [name]: value, organizerID: user._id }))
  }

  const handleSubmit = async e => {
    e.preventDefault()
    if (!user) {
      logout()
    } else {
      try {
        const newBooking = await createBooking(formData)
        console.log('New booking created: ', newBooking)
        // Optionally, you can redirect or perform any other action after successful booking creation
      } catch (error) {
        console.error('Error creating booking: ', error)
        // Handle error, e.g., display an error message to the user
      }
    }
  }

  //Handlers for Clicking Booking Panel Tabs
  function handleMenuClick() {
    // setActiveTab(null)
    setHideMenuItems(false)
  }

  const navMenu = (
    <h3 className={styles['nav-menu-bar']}>Booking Entertainment</h3>
    // <ul className={styles['nav-menu-bar']}>
    //   <li className={styles['nav-menu-bar-item']}>
    //     <span>Artists</span>
    //   </li>
    //   <div className={styles['search-item-divider']}></div>

    //   <li className={styles['nav-menu-bar-item']}>
    //     <span>Anywhere</span>
    //   </li>
    //   <div className={styles['search-item-divider']}></div>

    //   <li className={styles['nav-menu-bar-item']}>
    //     <span>Anytime</span>
    //   </li>
    // </ul>
  )
  const artistsDropdownDisplay = artist => (
    <div className={styles.artistsListPreview}>
      <div className={styles.searchInputFieldPictureContainer}>
        <img className={styles.searchInputFieldPicture} src={artist.picture} alt='' />
      </div>
      <div className={styles.dropdownLabelWrapper}>
        <span className={styles.dropdownLabelName}>
          {artist.firstName} {artist.lastName}
        </span>
        <div className={styles.dropdownLabelGenreWrapper}>
          {artist.genre.map((g, index) => (
            <span key={index}>{g}</span>
          ))}
        </div>
      </div>
    </div>
  )

  ///Set Conditional Classes
  const checkActiveClass = id => {
    if (activeInputTab == id) return styles.activeTab
    return null
  }

  const noDisplayStyle = {
    display: 'none'
  }

  const displayStyle = {
    display: 'flex'
  }

  const filterOption = (inputValue, option) => {
    return option.value.toLowerCase().includes(inputValue.toLowerCase())
  }

  return (
    <CSSTransition
      timeout={40}
      classNames={{
        enter: styles['fade-enter'],
        enterActive: styles['fade-enter-active'],
        enterDone: styles['fade-enter-done'],

        exit: styles['fade-exit'],
        exitActive: styles['fade-exit-active'],
        exitDone: styles['fade-exit-done']
      }}
      in={hideMenuItems}
    >
      <nav className={`${styles['main-nav-search-bar']} menu-bar-wrapper`} ref={menuBarWrapper}>
        <SearchBar
          style={!hideMenuItems ? noDisplayStyle : displayStyle}
          wrapperClassName={styles.collapsedStateSearchBarWrapper}
          className={styles.collapsedStateSearchInput}
          placeholder='Find & Book your Artist here....'
          onClickWrapper={handleMenuClick}
          onChange={handleMenuClick}
        />
        <ConfigProvider
          theme={{
            token: {
              colorTextPlaceholder: 'rgb(0, 0, 0, 0.5)'
            }
          }}
        >
          <div className={styles.searchFormWrapper} style={hideMenuItems ? noDisplayStyle : displayStyle}>
            {navMenu}
            <form className={styles['search-bar']} onSubmit={handleSubmit} ref={searchBarContainerRef}>
              <AutoComplete
                // onClick={e => setActiveInputTab(0)}
                onFocus={e => setActiveInputTab(0)}
                className={`${styles.searchWrapper} ${checkActiveClass(0)}`}
                style={{
                  width: 200
                }}
                // autoFocus={activeInputTab == 0}
                popupMatchSelectWidth={false}
                allowClear
                notFoundContent='Sorry, no artist found'
                variant='borderless'
                // defaultValue={formData.artistID}
                options={options.map(artist => ({
                  artistID: artist._id,
                  value: `${artist.firstName} ${artist.lastName}`,
                  label: artistsDropdownDisplay(artist)
                }))}
                placeholder='Search Entertainer'
                filterOption={filterOption}
                // open={activeInputTab == 0}
                onSelect={handleChangeArtist}
                // onChange={value => onSetFormData(0, 'artistID', value.artistID)}
                id={0}
                onBlur={() => setActiveInputTab(null)}
              />
              <div className={styles['search-item-divider']}></div>
              <CustomDropdown
                activeInputTab={activeInputTab}
                checkActiveClass={checkActiveClass}
                label={'Date & Time'}
                ref={datePickerRef}
                slot={<BookingCard artist={selectedArtist} allowCancel={false} />}
              />
              <div className={styles['search-item-divider']}></div>

              <CustomDropdown
                checkActiveClass={checkActiveClass}
                activeInputTab={activeInputTab}
                label='Your Details'
                ref={datePickerRef}
                slot={<UserDetailsForm />}
                popUpWidth={'250px'}
              />

              {/* <DatePicker
                className={`${styles.searchWrapper} ${checkActiveClass(1)}`}
                format='YYYY-MM-DD'
                placeholder='Select Date'
                showNow={false}
                minuteStep={15}
                name='dateTimeRequested'
                defaultValue={formData.dateTimeRequested}
                onSelect={e => handleSetFormData(1, 'dateTimeRequested', e.toDate())}
                variant='borderless'
                id={1}
                size='small'
                disabledDate={disabledDate}
                onClick={e => setActiveInputTab(1)}
                onFocus={e => setActiveInputTab(1)}
                aria-required='true'
                open={activeInputTab == 1}
                onBlur={() => setActiveInputTab(null)}
                autoFocus={activeInputTab == 1}
                // disabled={activeInputTab != 1}
                ref={datePickerRef}
              />

              <div className={styles['search-item-divider']}></div>

              <TimePicker
                className={`${styles.searchWrapper} ${checkActiveClass(2)}`}
                onClick={e => setActiveInputTab(e.target.id)}
                onFocus={e => setActiveInputTab(e.target.id)}
                name='getInTime'
                placeholder='Get In Time'
                minuteStep={15}
                showNow={false}
                showSecond={false}
                format='HH:mm'
                defaultValue={formData.getInTime}
                onOk={e => handleSetFormData(2, 'getInTime', e.toDate())}
                variant='borderless'
                size='small'
                id={2}
                aria-required='true'
                open={activeInputTab == 2}
                onBlur={() => setActiveInputTab(null)}
                autoFocus={activeInputTab == 2}
                ref={getInTimeRef}
                // disabled={activeInputTab != 2}
              />
              <div className={styles['search-item-divider']}></div>

              <TimePicker
                className={`${styles.searchWrapper} ${checkActiveClass(3)}`}
                onClick={e => setActiveInputTab(e.target.id)}
                onFocus={e => setActiveInputTab(e.target.id)}
                name='startTime'
                placeholder='Start Time'
                minuteStep={15}
                showNow={false}
                showSecond={false}
                format='HH:mm'
                defaultValue={formData.startTime}
                variant='borderless'
                size='small'
                onOk={e => handleSetFormData(3, 'startTime', e.toDate())}
                id={3}
                aria-required='true'
                open={activeInputTab == 3}
                onBlur={() => setActiveInputTab(null)}
                autoFocus={activeInputTab == 3}
                ref={startTimeRef}
                // disabled={activeInputTab != 3}
              />
              <div className={styles['search-item-divider']}></div>

              <TimePicker
                className={`${styles.searchWrapper} ${checkActiveClass(4)}`}
                onClick={e => setActiveInputTab(e.target.id)}
                onFocus={e => setActiveInputTab(e.target.id)}
                name='endTime'
                placeholder='End Time'
                minuteStep={15}
                showNow={false}
                showSecond={false}
                format='HH:mm'
                defaultValue={formData.endTime}
                onOk={e => handleSetFormData(4, 'endTime', e.toDate())}
                id={4}
                variant='borderless'
                size='small'
                aria-required
                open={activeInputTab == 4}
                onBlur={() => setActiveInputTab(null)}
                autoFocus={activeInputTab == 4}
                ref={endTimeRef}

                // disabled={activeInputTab != 4}
              /> */}
              <div className={styles['search-item-divider']}></div>
              <TabButton className={styles.bookNowButton}>Book Now!</TabButton>
            </form>
          </div>
        </ConfigProvider>
      </nav>
    </CSSTransition>
  )
}
// }

export const Backdrop = ({ handleModalEffect }) => {
  return <div className={styles['backdrop']} onClick={() => handleModalEffect()}></div>
}

export const CustomDropdown = ({ checkActiveClass, slot, label, popUpWidth, activeInputTab, artist }) => {
  const [open, setOpen] = useState(false)
  const datePickerRef = useRef(null)
  useEffect(() => {
    // if (activeInputTab == 1) datePickerRef.current.focus()
  }, [activeInputTab])

  // useEffect(() => {
  //   const handleScroll = () => {
  //     // Check if the dropdown is open
  //     if (dropdownVisible) {
  //       // Close the dropdown
  //       setDropdownVisible(false)
  //     }
  //   }

  //   // Add scroll event listener to the document
  //   document.addEventListener('scroll', handleScroll)

  //   // Cleanup the event listener on component unmount
  //   return () => {
  //     document.removeEventListener('scroll', handleScroll)
  //   }
  // }, [dropdownVisible])

  const items = [
    {
      label: <div style={{ width: popUpWidth ? popUpWidth : '450px' }}>{slot}</div>,

      key: '0'
    }
  ]

  const handleVisibleChange = visible => {
    setOpen(visible)
  }

  const handleOpenChange = (nextOpen, info) => {
    if (info.source === 'trigger' || nextOpen) {
      setOpen(nextOpen)
    }
  }

  const handleMenuClick = e => {
    if (e.key != '0') {
      setOpen(false)
    }
  }

  return (
    <Dropdown
      // disabled={open}
      open={open}
      onOpenChange={handleOpenChange}
      menu={{
        items,
        onClick: handleMenuClick
      }}
      trigger={['click']}
      getPopupContainer={() => datePickerRef.current}
      placement='bottom'
      arrow={{
        pointAtCenter: true
      }}
    >
      <div
        className={`${styles.searchWrapper} ${checkActiveClass(1)}`}
        onClick={handleVisibleChange}
        ref={datePickerRef}
      >
        {label}
      </div>
    </Dropdown>
  )
}

export const UserDetailsForm = () => {
  return (
    <div className={styles.userDetailForm}>
      <TextField
        placeholder='First Name'
        className={styles.bookerDetailsInputField}
        type='text'
        name='firstName'
        id='firstName'
        // value={formData.firstName}
        // onChange={handleChange}
        required
        variant='outlined'
        label='First Name'
        size='small'
      />
      <TextField
        placeholder='Last Name'
        className={styles.bookerDetailsInputField}
        type='text'
        name='lastName'
        id='lastName'
        // value={formData.lastName}
        // onChange={handleChange}
        required
        variant='outlined'
        label='Last Name'
        size='small'
      />
      <TextField
        placeholder='Email'
        className={styles.bookerDetailsInputField}
        type='email'
        name='email'
        id='email'
        // value={formData.email}
        // onChange={handleChange}
        required
        variant='outlined'
        label='Email ID'
        size='small'
      />
      <TextField
        placeholder='Phone'
        className={styles.bookerDetailsInputField}
        type='tel'
        name='phoneContact'
        id='phoneContact'
        // value={formData.phoneContact}
        // onChange={handleChange}
        required
        variant='outlined'
        label='Phone'
        size='small'
      />
    </div>
  )
}
