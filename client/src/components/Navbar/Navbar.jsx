import { useEffect, useRef, useState } from 'react'
import React from 'react'
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
import Snackbar from '@mui/material/Snackbar'
import Alert from '@mui/material/Alert'

import { createBooking } from 'src/services/bookings'
import { useArtists } from 'src/providers/ArtistsProvider'
import { useAuth } from 'src/hooks/useAuth'
import NavBarBookingCard from '../BookingCard/NavBarBookingCard'

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
  const [openDropdown, setOpenDropdown] = useState(false)
  const [options, setOptions] = useState([])
  const [selectedArtist, setSelectedArtist] = useState(null)
  const [activeInputTab, setActiveInputTab] = useState(0)

  const { artists } = useArtists()
  const menuBarWrapper = useRef()
  const searchBarContainerRef = useRef()

  /************************Form Data ************************** */
  const [formData, setFormData] = useState({
    // Initialize form data
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
    gallery: [],
    genre: []
  })

  /****************Snack Bar***************/
  const [open, setOpen] = useState(false)
  const handleClick = () => {
    setOpen(true)
  }

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return
    }

    setOpen(false)
  }

  const datePickerRef = useRef(null)
  const getInTimeRef = useRef(null)
  const startTimeRef = useRef(null)
  const endTimeRef = useRef(null)
  const selectArtistRef = useRef(null)

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

  useEffect(() => {
    console.log(formData)
  }, [formData])

  const [submittable, setSubmittable] = useState(false)

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
    console.log(index)
  }

  const handleSubmit = async e => {
    e.preventDefault()
    if (!user) {
      logout()
    } else if (submittable) {
      try {
        const newBooking = await createBooking(formData)
        console.log('New booking created: ', newBooking)
        // Optionally, you can redirect or perform any other action after successful booking creation
      } catch (error) {
        console.error('Error creating booking: ', error)
        // Handle error, e.g., display an error message to the user
      }
    } else {
      return
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
                autoFocus
                // onClick={e => setActiveInputTab(0)}
                // onChange={e => setActiveInputTab(1)}
                onFocus={e => setActiveInputTab(0)}
                className={`${styles.searchWrapper} ${checkActiveClass(0)}`}
                style={{
                  width: 250
                }}
                popupMatchSelectWidth={false}
                allowClear
                notFoundContent='Sorry, no artist found'
                variant='borderless'
                options={options.map(artist => ({
                  artistID: artist._id,
                  value: `${artist.firstName} ${artist.lastName}`,
                  label: artistsDropdownDisplay(artist)
                }))}
                placeholder='Search Entertainer'
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

              <TabButton className={styles.bookNowButton} onClick={() => setOpen(true)}>
                Book Now
              </TabButton>
            </form>
            <Snackbar
              open={open}
              autoHideDuration={6000}
              onClose={handleClose}
              anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
            >
              <Alert
                onClose={handleClose}
                severity={submittable === true ? 'success' : 'error'}
                variant='filled'
                sx={{ width: '100%' }}
              >
                {!submittable ? 'Please Provide all necessary info for the booking' : 'Booking Successful!'}
              </Alert>
            </Snackbar>
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

      // if (navBarRef.current) return
      if (antDropdown) return
      if (antDropdownMenu) return
      if (antDropdownPicker) return
      if (bookingCardWrapper) return
      if (muiPickersLayout) return
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
      label: <div style={{ width: popUpWidth ? popUpWidth : '550px' }}>{slot}</div>,
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
    if (e.key !== '0' && open) setActiveInputTab(null)
    return
  }

  return (
    // <Dropdown
    //   menu={{
    //     items
    //   }}
    //   dropdownRender={menu => (
    //     <div>
    //       {React.cloneElement(menu, {
    //         style: { boxShadow: 'none' }
    //       })}

    //       <Space
    //         style={{
    //           padding: 8
    //         }}
    //       ></Space>
    //     </div>
    //   )}
    // >
    //   <a onClick={e => e.preventDefault()}>
    //     <Space>Hover me</Space>
    //   </a>
    // </Dropdown>
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
        required
        variant='outlined'
        label='Phone'
        size='small'
      />
    </div>
  )
}
