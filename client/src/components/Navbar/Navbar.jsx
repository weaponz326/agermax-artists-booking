import { useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import styles from './navbar.module.css'
import { CSSTransition } from 'react-transition-group'
import { Dropdown, DatePicker, Space, AutoComplete, ConfigProvider } from 'antd'
import { DownOutlined } from '@ant-design/icons'

import CustomizedDropdown from '../Dropdown/CustomizedDropDown'
const { RangePicker, TimePicker } = DatePicker
import dayjs from 'dayjs'
import customParseFormat from 'dayjs/plugin/customParseFormat'
dayjs.extend(customParseFormat)
import TabButton from '../AdminPagesSharedComponents/ViewTab/TabButton'
import SearchBar from '../AdminPagesSharedComponents/SearchBar/SearchBar'
import { useArtists } from 'src/providers/ArtistsProvider'
import { createBooking } from 'src/services/bookings'
import CircularProgress from '@mui/material/CircularProgress'

import { useAuth } from 'src/hooks/useAuth'

const disabledDate = current => {
  // Can not select days before today and today
  return current && current < dayjs().endOf('day')
}

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
          <BookArtistPanel hideMenuItems={hideMenuItems} setHideMenuItems={setHideMenuItems} navBarRef={navBarRef} />
          {loading ? (
            <CircularProgress disableShrink />
          ) : (
            <CustomizedDropdown className={styles.userActionsButtons} user={user} logout={logout} />
          )}
        </div>
      </div>
    </nav>
  )
}

const BookArtistPanel = ({ hideMenuItems, setHideMenuItems }) => {
  const [options, setOptions] = useState([])
  const { user, logout, loading } = useAuth()

  const { artists } = useArtists()
  const menuBarWrapper = useRef()
  const searchBarContainerRef = useRef()
  const [activeInputTab, setActiveInputTab] = useState(null)
  const [formData, setFormData] = useState({
    status: 'pending',
    organizerID: '',
    eventTitle: 'Not Provided yet.',
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
  })

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

  useEffect(() => {
    //Listen to a click event outside the searchBarContainer ref and set activeTab to null
    const handleClickOutsideSearch = event => {
      event.stopPropagation()
      const menuWrapper = event.target.closest('.menu-bar-wrapper')
      const antDropdown = event.target.closest('.ant-select-dropdown')
      const antDropdownPicker = event.target.closest('.ant-picker-dropdown')
      const antDropdownMenu = event.target.closest('.ant-dropdown-menu')

      // if (navBarRef.current) return
      if (antDropdown) return
      if (antDropdownMenu) return
      if (antDropdownPicker) return
      if (menuWrapper == null) {
        // setActiveTab(null)
        setHideMenuItems(true)
      }
    }
    document.addEventListener('click', handleClickOutsideSearch)
    return () => {
      document.removeEventListener('click', handleClickOutsideSearch)
    }
  }, [])

  const handleChangeArtist = value => {
    const artist = options.find(artist => `${artist.firstName} ${artist.lastName}` === value)
    handleSetFormData(0, 'artistID', artist._id)
    setFormData({ ...formData, organizerID: user._id })
  }

  //Handlers for Form Data Input
  // const handleDateChange = date => {
  //   date && setFormData({ ...formData, dateTimeRequested: date.toDate() })
  // }

  // const handleChangeGetInTime = (time, timeString) => {
  //   time && setFormData({ ...formData, getInTime: time.toDate() })
  // }

  // const handleChangeStartTime = (time, timeString) => {
  //   time && setFormData({ ...formData, startTime: time.toDate() })
  // }

  // const handleChangeEndTime = (time, timeString) => {
  //   time && setFormData({ ...formData, endTime: time.toDate() })
  // }

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

  //Handlers for Clicking Booking Panel Tabs
  function handleMenuClick() {
    // setActiveTab(null)
    setHideMenuItems(false)
  }

  function handleSetFormData(id, name, value) {
    const index = parseInt(id) + 1
    setActiveInputTab(index)
    setFormData(oldValue => ({ ...oldValue, [name]: value }))
  }

  const navMenu = (
    <ul className={styles['nav-menu-bar']}>
      <li className={styles['nav-menu-bar-item']}>
        <span>Artists</span>
      </li>
      <div className={styles['search-item-divider']}></div>

      <li className={styles['nav-menu-bar-item']}>
        <span>Anywhere</span>
      </li>
      <div className={styles['search-item-divider']}></div>

      <li className={styles['nav-menu-bar-item']}>
        <span>Anytime</span>
      </li>
    </ul>
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
                onClick={e => setActiveInputTab(0)}
                onFocus={e => setActiveInputTab(0)}
                className={`${styles.searchWrapper} ${checkActiveClass(0)}`}
                style={{
                  width: 200
                }}
                autoFocus={activeInputTab == 0}
                popupMatchSelectWidth={false}
                allowClear
                notFoundContent='Sorry, no artist found'
                variant='borderless'
                defaultValue={formData.artistID}
                options={options.map(artist => ({
                  artistID: artist._id,
                  value: `${artist.firstName} ${artist.lastName}`,
                  label: artistsDropdownDisplay(artist)
                }))}
                placeholder='Search Artist'
                filterOption={filterOption}
                open={activeInputTab == 0}
                onSelect={handleChangeArtist}
                // onChange={value => onSetFormData(0, 'artistID', value.artistID)}
                id={0}
                onBlur={() => setActiveInputTab(null)}
              />
              <div className={styles['search-item-divider']}></div>

              <DatePicker
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
              />
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

export const CustomDropdown = ({ hideMenuItems, bookerInputRef }) => {
  const [dropdownVisible, setDropdownVisible] = useState(false)
  const dropdownRef = useRef(null)

  useEffect(() => {
    const handleScroll = () => {
      // Check if the dropdown is open
      if (dropdownVisible) {
        // Close the dropdown
        setDropdownVisible(false)
      }
    }

    // Add scroll event listener to the document
    document.addEventListener('scroll', handleScroll)

    // Cleanup the event listener on component unmount
    return () => {
      document.removeEventListener('scroll', handleScroll)
    }
  }, [dropdownVisible])

  const items = [
    {
      label: (
        <input
          className={styles.dropdownInput}
          type='text'
          value=''
          placeholder='Your First Name'
          onClick={e => e.stopPropagation()}
        />
      ),
      key: '0'
    },
    {
      label: (
        <input
          className={styles.dropdownInput}
          type='text'
          value=''
          placeholder='Your Last Name'
          onClick={e => e.stopPropagation()}
        />
      ),
      key: '1'
    },
    // {
    //   type: 'divider'
    // },
    {
      label: (
        <input
          className={styles.dropdownInput}
          type='text'
          value=''
          placeholder='Your Contact'
          onClick={e => e.stopPropagation()}
        />
      ),
      key: '3'
    },
    {
      type: 'divider'
    },
    {
      label: <TabButton className={styles.dropdownInputButton}>Okay?</TabButton>,
      key: '4'
    }
  ]

  const handleVisibleChange = visible => {
    setDropdownVisible(visible)
  }

  return (
    <Dropdown
      open={dropdownVisible}
      onOpenChange={handleVisibleChange}
      menu={{
        items
      }}
      trigger={['click']}
      getPopupContainer={() => dropdownRef.current}
    >
      <Space>
        <TabButton className={styles.bookerDetailsButton}>Booker Details</TabButton>
        <DownOutlined />
      </Space>
    </Dropdown>
  )
}

// export const NavBarSearchBar = ({
//   dateInputRef,
//   artists,
//   switchToDatePicker,
//   setActiveItem,
//   activeTab,
//   formData,
//   setFormData,
//   isActive,
//   onSetFormData,
//   setActiveInputTab
// }) => {
//   const [options, setOptions] = useState([])
//   const searchInputRef = useRef()
//   // const { artists } = useArtists()

//   useEffect(() => {
//     //Get All Artists Lists
//     if (artists) setOptions(artists)
//   }, [artists])

//   const handleChangeArtist = value => {
//     const artist = options.find(artist => `${artist.firstName} ${artist.lastName}` === value)
//     onSetFormData(0, 'artistID', artist._id)
//   }

//   const checkSearchActiveClass = activeTab === searchInputRef.current ? styles.activeTab : null
//   const artistsDropdownDisplay = artist => (
//     <div className={styles.artistsListPreview}>
//       <div className={styles.searchInputFieldPictureContainer}>
//         <img className={styles.searchInputFieldPicture} src={artist.picture} alt='' />
//       </div>
//       <div>
//         <span>{artist.firstName}</span> <span>{artist.lastName}</span>
//         <div>{artist.genre}</div>
//       </div>
//     </div>
//   )
//   const filterOption = (inputValue, option) => {
//     // return option.label.toUpperCase().indexOf(inputValue.toUpperCase()) !== -1
//     return option.value.toLowerCase().includes(inputValue.toLowerCase())
//   }

//   const handleActiveInput = () => {
//     setActiveItem(searchInputRef.current)
//     setActiveInputTab(0)
//   }

//   return (
//     <AutoComplete
//       onClick={handleActiveInput}
//       onFocus={e => setActiveItem(searchInputRef.current)}
//       ref={searchInputRef}
//       className={`${styles.searchWrapper} ${checkSearchActiveClass}`}
//       style={{
//         width: 200
//       }}
//       autoFocus={isActive}
//       popupMatchSelectWidth={false}
//       allowClear
//       notFoundContent='Sorry, no artist found'
//       variant='borderless'
//       defaultValue={formData.artistID}
//       options={options.map(artist => ({
//         artistID: artist._id,
//         value: `${artist.firstName} ${artist.lastName}`,
//         // value: artist._id,

//         label: artistsDropdownDisplay(artist)
//       }))}
//       placeholder='Search Artist'
//       filterOption={filterOption}
//       open={isActive}
//       onSelect={handleChangeArtist}
//       // onChange={value => onSetFormData(0, 'artistID', value.artistID)}
//       id={0}
//       onBlur={() => setActiveInputTab(null)}
//     />
//   )
// }
