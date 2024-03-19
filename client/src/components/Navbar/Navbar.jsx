import { useEffect, useRef, useState } from 'react'
import React from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
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
import Snackbar from '@mui/material/Snackbar'
import Alert from '@mui/material/Alert'

import { createBooking } from 'src/services/bookings'
import { useArtists } from 'src/providers/ArtistsProvider'
import { useAuth } from 'src/hooks/useAuth'
import NavBarBookingCard from '../BookingCard/NavBarBookingCard'
import useBookingFormData from 'src/hooks/useBookingFormData'
import MobileNav from './MobileNavBar'
import {
  BiBadge,
  BiCalendar,
  BiHome,
  BiSolidDashboard,
  BiSolidGroup,
  BiSolidHelpCircle,
  BiSolidHome,
  BiSolidMusic,
  BiSolidUser,
  BiSolidUserAccount,
  BiUserVoice,
  BiUserX
} from 'react-icons/bi'
import { useRouter } from 'next/router'
import { ro } from 'date-fns/locale'
import { useBookings } from 'src/providers/BookingsProvider'

// const disabledDate = current => {
//   // Can not select days before today and today
//   return current && current < dayjs().endOf('day')
// }

export default function Navbar() {
  const [hideMenuItems, setHideMenuItems] = useState(true)
  const { user, logout, loading, isUserUpdated } = useAuth()
  const router = useRouter()

  const navBarRef = useRef()

  return (
    <nav className={styles['header-navbar']} ref={navBarRef}>
      <div className={styles.navBarContainer}>
        <div className={`${styles['top-bar']} ${styles['nav-bar']}`}>
          <div className={styles.agermaxLogoContainer}>
            <img
              className={styles.agermaxLogo}
              alt='App dark'
              src='/images/logo.png'
              onClick={() => router.push('/')}
            />
          </div>
          <BookArtistPanel
            hideMenuItems={hideMenuItems}
            setHideMenuItems={setHideMenuItems}
            navBarRef={navBarRef}
            user={user}
            logout={logout}
            isUserUpdated={isUserUpdated}
          />
          {loading ? (
            <div className={styles.userActionsButtons}>
              <CircularProgress disableShrink />
            </div>
          ) : (
            <CustomizedDropdown
              className={styles.userActionsButtons}
              user={user}
              logout={logout}
              isUserUpdated={isUserUpdated}
            />
          )}
        </div>
      </div>
      <MobileNavBar />
    </nav>
  )
}

const BookArtistPanel = ({ hideMenuItems, setHideMenuItems, user, logout, isUserUpdated }) => {
  const [openDropdown, setOpenDropdown] = useState(false)
  const [options, setOptions] = useState([])
  const [selectedArtist, setSelectedArtist] = useState(null)
  const [activeInputTab, setActiveInputTab] = useState(0)
  const { setIsBookingsUpdated } = useBookings()
  const [submittable, setSubmittable] = useState(false)
  const [isScheduled, setIsScheduled] = useState(false)

  const router = useRouter()
  const [snackbarMessage, setSnackbarMessage] = useState('')
  const [snackbarOpen, setSnackbarOpen] = useState(false)
  const [snackbarSeverity, setSnackbarSeverity] = useState('')

  const handleCloseSnackbar = (event, reason) => {
    if (reason === 'clickaway') {
      return
    }
    setSnackbarOpen(false)
  }

  const { artists } = useArtists()
  const menuBarWrapper = useRef()
  const searchBarContainerRef = useRef()

  /************************Form Data ************************** */
  const { formData, setFormData } = useBookingFormData()

  /****************Snack Bar***************/
  const [open, setOpen] = useState(false)

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return
    }

    setOpen(false)
  }

  const selectArtistRef = useRef(null)

  useEffect(() => {
    //Get All Artists Lists
    if (artists) {
      setOptions(artists)
    }
  }, [artists, isUserUpdated])

  // *********** */
  // Click Event handler
  useEffect(() => {
    //Listen to a click event outside the searchBarContainer ref and set activeTab to null
    const handleClickOutsideSearch = event => {
      event.stopPropagation()
      const menuWrapper = event.target.closest('.menu-bar-wrapper')
      const antDropdown = event.target.closest('.ant-select-dropdown')
      const antDropdownPicker = event.target.closest('.ant-picker-dropdown')
      const antDropdownMenu = event.target.closest('.ant-dropdown-menu')
      const bookingCardWrapper = event.target.closest('.bookingCardWrapper')
      const muiButtonBase = event.target.closest('.MuiButtonBase-root')
      const muiTypography = event.target.closest('.MuiTypography-root')

      // if (navBarRef.current) return
      if (antDropdown) return
      if (antDropdownMenu) return
      if (antDropdownPicker) return
      if (bookingCardWrapper) return
      if (muiButtonBase) return
      if (muiTypography) return
      if (menuWrapper == null) {
        setActiveInputTab(null)
        setHideMenuItems(true)
      }
    }
    document.addEventListener('click', handleClickOutsideSearch)
    return () => {
      document.removeEventListener('click', handleClickOutsideSearch)
    }
  }, [])

  useEffect(() => {
    if (!formData.dateTimeRequested || !formData.endTime || !formData.startTime || !formData.getInTime) {
      setSubmittable(false)
    } else {
      setSubmittable(true)
    }
  }, [formData])

  /********** Functions *****************/
  const handleChangeArtist = value => {
    if (!user) return logout()
    const artist = options.find(artist => `${artist.firstName} ${artist.lastName}` === value)
    handleSetFormData(0, 'artistID', artist._id)
    setSelectedArtist(artist)
  }

  function handleSetFormData(id, name, value) {
    const index = parseInt(id) + 1
    setActiveInputTab(index)
    setFormData(oldValue => ({ ...oldValue, [name]: value, organizerID: user._id }))
  }

  const handleSubmit = async e => {
    e.preventDefault()
    if (!user) {
      setSnackbarMessage('Kindly Login first.')
      setSnackbarSeverity('error')
      setSnackbarOpen(true)
      router.push('/login')
    } else if (user && submittable) {
      try {
        const newBooking = await createBooking(formData)
        setIsBookingsUpdated(true)
        // setOpen(true)
        console.log('New booking created: ', newBooking)
        setSnackbarMessage('New Booking Created Successfully!')
        setSnackbarSeverity('success')
        setSnackbarOpen(true)
        setSelectedArtist(null)
        console.log('New booking created: ', newBooking)
        router.push(`admin/bookings/${user.role}`)
      } catch (error) {
        setSnackbarMessage('Error creating booking!')
        setSnackbarSeverity('error')
        setSnackbarOpen(true)
        console.error('Error creating booking: ', error)
        // Handle error, e.g., display an error message to the user
      } finally {
        setIsBookingsUpdated(false)
        setSubmittable(false)
      }
    } else {
      setSnackbarMessage('Set Artist, Date, Get-In, Start, End Times first.')
      setSnackbarSeverity('error')
      setSnackbarOpen(true)
      return
    }
  }

  //Handlers for Clicking Booking Panel Tabs
  function handleMenuClick() {
    // setActiveTab(null)
    setHideMenuItems(false)
  }

  const navMenu = <h3 className={styles['nav-menu-bar']}>Booking Entertainment</h3>
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

  const handleClear = () => {
    setSelectedArtist(null)
    setActiveInputTab(0)
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
          // style={!hideMenuItems ? noDisplayStyle : displayStyle}
          wrapperClassName={hideMenuItems ? styles.collapsedStateSearchBarWrapper : styles.noDisplayStyle}
          className={styles.collapsedStateSearchInput}
          placeholder='Find & Book A Performer here....'
          onClickWrapper={handleMenuClick}
          onChange={handleMenuClick}
        />
        <AutoComplete
          autoFocus
          // onClick={e => setActiveInputTab(0)}
          // onChange={e => setActiveInputTab(1)}
          className={`${styles.collapsedStateSearchBarWrapper} ${styles.mobileViewSearchBar}`}
          popupMatchSelectWidth={false}
          allowClear
          notFoundContent='Sorry, no performers found'
          variant='borderless'
          options={options.map(artist => ({
            artistID: artist._id,
            value: `${artist.firstName} ${artist.lastName}`,
            label: <PerformersDropdownDisplay artist={artist} onClick={() => router.push(`/artists/${artist._id}`)} />
          }))}
          placeholder='Search Performer'
          filterOption={filterOption}
          // onSelect={performer => handleSelectPerformer(performer)}
          id={0}
          // onClear={handleClear}
          // ref={selectArtistRef}
        />

        <ConfigProvider
          theme={{
            token: {
              colorTextPlaceholder: 'rgb(0, 0, 0, 0.5)'
            }
          }}
        >
          <div className={`${styles.searchFormWrapper} ${hideMenuItems && styles.noDisplayStyle}`}>
            {navMenu}
            <form className={styles['search-bar']} onSubmit={handleSubmit} ref={searchBarContainerRef}>
              <AutoComplete
                autoFocus
                // onClick={e => setActiveInputTab(0)}
                // onChange={e => setActiveInputTab(1)}
                onFocus={e => setActiveInputTab(0)}
                className={`${styles.searchWrapper} ${checkActiveClass(0)}`}
                style={{
                  width: 135
                }}
                popupMatchSelectWidth={false}
                allowClear
                notFoundContent='Sorry, no performers found'
                variant='borderless'
                options={options.map(artist => ({
                  artistID: artist._id,
                  value: `${artist.firstName} ${artist.lastName}`,
                  label: <PerformersDropdownDisplay artist={artist} />
                }))}
                placeholder='Search Performer'
                filterOption={filterOption}
                onSelect={handleChangeArtist}
                id={0}
                onClear={handleClear}
                ref={selectArtistRef}
              />
              <div className={styles['search-item-divider']}></div>
              <CustomDropdown
                id={1}
                activeInputTab={activeInputTab}
                checkActiveClass={checkActiveClass}
                label={'Date & Time'}
                setActiveInputTab={setActiveInputTab}
                slot={
                  <NavBarBookingCard
                    artist={selectedArtist}
                    allowCancel={false}
                    formData={formData}
                    setFormData={setFormData}
                    handleSetFormData={handleSetFormData}
                    selectedArtist={selectedArtist}
                    setSelectedArtist={setSelectedArtist}
                    onDone={() => setOpenDropdown(false)}
                    activeInputTab={activeInputTab}
                    setActiveInputTab={setActiveInputTab}
                    setIsScheduled={setIsScheduled}
                  />
                }
              />
              <div className={styles['search-item-divider']}></div>

              <CustomDropdown
                checkActiveClass={checkActiveClass}
                activeInputTab={activeInputTab}
                label='Your Details'
                slot={<UserDetailsForm user={user} logout={logout} />}
                popUpWidth={'250px'}
                id={2}
                setActiveInputTab={setActiveInputTab}
              />

              <TabButton className={styles.bookNowButton} onClick={handleSubmit}>
                Book Now
              </TabButton>
            </form>
            <Snackbar
              open={snackbarOpen}
              autoHideDuration={6000}
              onClose={handleCloseSnackbar}
              anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
            >
              <Alert onClose={handleCloseSnackbar} severity={snackbarSeverity} sx={{ width: '100%' }} variant='filled'>
                {snackbarMessage}
              </Alert>
            </Snackbar>
          </div>
        </ConfigProvider>
      </nav>
    </CSSTransition>
  )
}

export const PerformersDropdownDisplay = ({ artist, onClick }) => {
  const router = useRouter()
  return (
    <div className={styles.artistsListPreview} onClick={onClick}>
      <div className={styles.searchInputFieldPictureContainer}>
        <img className={styles.searchInputFieldPicture} src={artist.profilePhoto} alt='' />
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
}

export const Backdrop = ({ handleModalEffect }) => {
  return <div className={styles['backdrop']} onClick={() => handleModalEffect()}></div>
}

export const CustomDropdown = ({
  user,
  checkActiveClass,
  slot,
  label,
  popUpWidth,
  activeInputTab,
  artist,
  openDropdown,
  id,
  setActiveInputTab
}) => {
  const [open, setOpen] = useState(false)

  // Click Event handler
  useEffect(() => {
    //Listen to a click event outside the searchBarContainer ref and set activeTab to null
    const handleClickOutsideSearch = event => {
      event.stopPropagation()
      const menuWrapper = event.target.closest('.menu-bar-wrapper')
      const antDropdown = event.target.closest('.ant-select-dropdown')
      const antDropdownPicker = event.target.closest('.ant-picker-dropdown')
      const antDropdownMenu = event.target.closest('.ant-dropdown-menu')
      const bookingCardWrapper = event.target.closest('.bookingCardWrapper')
      const muiPickersLayout = event.target.closest('.MuiPickersLayout-root')
      const muiTypography = event.target.closest('.MuiTypography-root')
      const muiButtonBase = event.target.closest('.MuiButtonBase-root')

      // if (navBarRef.current) return
      if (antDropdown) return
      if (antDropdownMenu) return
      if (antDropdownPicker) return
      if (bookingCardWrapper) return
      if (muiPickersLayout) return
      if (muiTypography) return
      if (muiButtonBase) return
      if (menuWrapper == null) {
        // setActiveTab(null)
        setActiveInputTab(null)
      }
    }
    document.addEventListener('click', handleClickOutsideSearch)
    return () => {
      document.removeEventListener('click', handleClickOutsideSearch)
    }
  }, [])

  const datePickerRef = useRef(null)
  useEffect(() => {
    if (activeInputTab === id) return setOpen(true)
    else setOpen(false)
  }, [activeInputTab])

  // useEffect(() => {
  //   setOpen(openDropdown)
  // }, [openDropdown])

  const items = [
    {
      label: <div style={{ width: popUpWidth && popUpWidth }}>{slot}</div>,
      key: '0'
    }
  ]

  const handleVisibleChange = visible => {
    // setOpen(visible)
    if (open) return
    setOpen(true)
    setActiveInputTab(id)
  }

  const handleOpenChange = (nextOpen, info) => {
    if (info.source === 'menu' && open) return
    // if (info.source !== 'menu' && open) setActiveInputTab(null)
  }

  const handleMenuClick = e => {
    console.log(e.key)
    // if (e.key !== '0' && open) setActiveInputTab(null)
    return
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
      id={id}
      autoAdjustOverflow
    >
      <div
        className={`${styles.searchWrapper} ${checkActiveClass(id)}`}
        onClick={handleVisibleChange}
        ref={datePickerRef}
      >
        {label}
      </div>
    </Dropdown>
  )
}

export const UserDetailsForm = ({ user, logout }) => {
  if (!user) return logout()
  return (
    <div className={styles.userDetailForm}>
      <TextField
        placeholder='First Name'
        className={styles.bookerDetailsInputField}
        type='text'
        name='firstName'
        id='firstName'
        value={user.firstName}
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
        value={user.lastName}
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
        value={user.email}
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
        name='contactPhone'
        id='contactPhone'
        value={user.contactPhone}
        // onChange={handleChange}
        // required
        variant='outlined'
        label='Phone'
        size='small'
      />
    </div>
  )
}

export const MobileNavBar = () => {
  const { user } = useAuth()
  const pathname = usePathname()
  const [selectedTab, setSelectedTab] = useState(null)
  const router = useRouter()

  useEffect(() => {
    setSelectedTab(pathname)
    console.log(pathname)
  }, [pathname])

  const handleTabClick = e => {
    setSelectedTab(e.target.name)
    router.push(e.target.id)
  }

  return (
    <nav className={styles.mobileNavBar}>
      <button
        onClick={handleTabClick}
        type='button'
        id='/'
        name='/'
        className={selectedTab === '/' ? styles.mobileNavActiveButton : `${styles.mobileNavButton} `}
      >
        <BiSolidHome className={styles.mobileNavIcon} /> Home
      </button>
      <button
        onClick={handleTabClick}
        type='button'
        id='/artists'
        name='/artists/'
        className={selectedTab === '/artists/' ? styles.mobileNavActiveButton : styles.mobileNavButton}
      >
        <BiSolidGroup className={styles.mobileNavIcon} /> Performers
      </button>
      <button
        onClick={handleTabClick}
        type='button'
        id='/events'
        name='/events/'
        className={selectedTab === '/events/' ? styles.mobileNavActiveButton : styles.mobileNavButton}
      >
        <BiCalendar className={styles.mobileNavIcon} /> Events
      </button>
      <button
        onClick={handleTabClick}
        type='button'
        id='/about'
        name='/about/'
        className={selectedTab === '/about/' ? styles.mobileNavActiveButton : styles.mobileNavButton}
      >
        <BiSolidHelpCircle className={styles.mobileNavIcon} /> About
      </button>
      <button
        onClick={handleTabClick}
        type='button'
        id={user ? `/admin/home/${user.role}` : 'login'}
        name='account'
        className={selectedTab === 'account' ? styles.mobileNavActiveButton : styles.mobileNavButton}
      >
        <BiSolidUserAccount className={styles.mobileNavIcon} /> Account
      </button>
    </nav>
  )
}
