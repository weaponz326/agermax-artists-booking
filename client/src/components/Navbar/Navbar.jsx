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
import { FaSpinner } from 'react-icons/fa'

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

const BookArtistPanel = ({ hideMenuItems, setHideMenuItems, navBarRef }) => {
  const [activeTab, setActiveTab] = useState(null)

  const { artists } = useArtists()
  const menuBarWrapper = useRef()
  const searchBarContainerRef = useRef()
  const dateInputRef = useRef(null)
  const dateRangePickerRef = useRef(null)
  const bookerInputRef = useRef(null)
  const getInTimeRef = useRef(null)
  const startTimeRef = useRef(null)
  const endTimeRef = useRef(null)
  const [activeInputTab, setActiveInputTab] = useState(null)
  const [formData, setFormData] = useState({
    // Initialize form data
    // Example:
    status: 'pending',
    organizerID: '65ca3d8256ec877c775dc0d4',
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

  //Effects from scroll and click events
  useEffect(() => {
    const handleScroll = () => {
      setHideMenuItems(true)
      setActiveTab(null)
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
        setActiveTab(null)
        setHideMenuItems(true)
      }
    }
    document.addEventListener('click', handleClickOutsideSearch)
    return () => {
      document.removeEventListener('click', handleClickOutsideSearch)
    }
  }, [])

  //Handlers for Form Data Input
  const handleDateChange = date => {
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

  //Handlers for Clicking Booking Panel Tabs
  function setActiveItem(item) {
    setActiveTab(item)
  }

  function handleMenuClick() {
    setActiveTab(null)
    setHideMenuItems(false)
  }
  function switchToDatePicker() {
    dateInputRef.current.focus()
    setActiveItem(dateInputRef.current)

    // setActiveTab(dateInputRef.current)
  }
  function handleSetFormData(id, name, value) {
    const index = parseInt(id) + 1
    console.log(index)
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

  // const handleActiveInput = index => {
  //   setActiveInputTab(index)
  // }

  ///Set Conditional Classes
  const checkDateActiveClass = activeTab === dateInputRef.current ? styles.activeTab : null
  const checkGetInTimeActiveClass = activeTab === getInTimeRef.current ? styles.activeTab : null
  const checkStartTimeActiveClass = activeTab === startTimeRef.current ? styles.activeTab : null
  const checkEndTimeActiveClass = activeTab === endTimeRef.current ? styles.activeTab : null
  const checkBookerActiveClass = activeTab === bookerInputRef.current ? styles.activeTab : null
  // const checkSearchBarActiveClass = activeTab === searchBarContainerRef.current ? styles.activeTab : null

  const noDisplayStyle = {
    display: 'none'
  }

  const displayStyle = {
    display: 'flex'
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
              <NavBarSearchBar
                placeholder={'Search Artist'}
                wrapperClassName={styles.searchWrapper}
                switchToDatePicker={switchToDatePicker}
                setActiveItem={setActiveItem}
                activeTab={activeTab}
                formData={formData}
                setFormData={setFormData}
                artists={artists}
                dateInputRef={dateInputRef}
                isActive={activeInputTab == 0}
                onSetFormData={handleSetFormData}
                setActiveInputTab={setActiveInputTab}
              />
              <div className={styles['search-item-divider']}></div>

              <DatePicker
                className={`${styles.searchWrapper} ${checkDateActiveClass}`}
                ref={dateInputRef}
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

              {/* <RangePicker
                  ref={dateRangePickerRef}
                  variant='borderless'
                  className={`${styles.rangePicker} dateRangePicker`}
                  showTime={{
                    format: 'HH:mm'
                  }}
                  format='YYYY-MM-DD HH:mm'
                  // onChange={onChange}
                  onOk={switchToBookerDetails}
                  minuteStep={15}
                /> */}
              {/* </div> */}
              <div className={styles['search-item-divider']}></div>

              <TimePicker
                className={`${styles.searchWrapper} ${checkGetInTimeActiveClass}`}
                onClick={e => setActiveInputTab(e.target.id)}
                onFocus={e => setActiveInputTab(e.target.id)}
                ref={getInTimeRef}
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
                className={`${styles.searchWrapper} ${checkStartTimeActiveClass}`}
                onClick={e => setActiveInputTab(e.target.id)}
                onFocus={e => setActiveInputTab(e.target.id)}
                ref={startTimeRef}
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
                open={activeInputTab === 3}
                onBlur={() => setActiveInputTab(null)}
                autoFocus={activeInputTab == 3}
              />
              <div className={styles['search-item-divider']}></div>

              <TimePicker
                className={`${styles.searchWrapper} ${checkEndTimeActiveClass}`}
                onClick={e => setActiveInputTab(e.target.id)}
                onFocus={e => setActiveInputTab(e.target.id)}
                ref={endTimeRef}
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

              {/* <div
                className={`${styles.searchWrapper} ${checkBookerActiveClass}`}
                onClick={e => setActiveItem(bookerInputRef.current)}
                onFocus={e => setActiveItem(bookerInputRef.current)}
                ref={bookerInputRef}
              >
                <CustomDropdown hideMenuItems={hideMenuItems} />
              </div>
              <div className={styles['search-item-divider']}></div> */}

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

export const NavBarSearchBar = ({
  dateInputRef,
  artists,
  switchToDatePicker,
  setActiveItem,
  activeTab,
  formData,
  setFormData,
  isActive,
  onSetFormData,
  setActiveInputTab
}) => {
  const [options, setOptions] = useState([])
  const searchInputRef = useRef()
  // const { artists } = useArtists()

  useEffect(() => {
    //Get All Artists Lists
    if (artists) setOptions(artists)
  }, [artists])

  const handleChangeArtist = value => {
    const artist = options.find(artist => `${artist.firstName} ${artist.lastName}` === value)
    console.log(artist)
    onSetFormData(0, 'artistID', artist._id)
  }

  const checkSearchActiveClass = activeTab === searchInputRef.current ? styles.activeTab : null
  const artistsDropdownDisplay = artist => (
    <div className={styles.artistsListPreview}>
      <div className={styles.searchInputFieldPictureContainer}>
        <img className={styles.searchInputFieldPicture} src={artist.picture} alt='' />
      </div>
      <div>
        <span>{artist.firstName}</span> <span>{artist.lastName}</span>
        <div>{artist.genre}</div>
      </div>
    </div>
  )
  const filterOption = (inputValue, option) => {
    // return option.label.toUpperCase().indexOf(inputValue.toUpperCase()) !== -1
    return option.value.toLowerCase().includes(inputValue.toLowerCase())
  }

  const handleActiveInput = () => {
    setActiveItem(searchInputRef.current)
    setActiveInputTab(0)
  }

  return (
    <AutoComplete
      onClick={handleActiveInput}
      onFocus={e => setActiveItem(searchInputRef.current)}
      ref={searchInputRef}
      className={`${styles.searchWrapper} ${checkSearchActiveClass}`}
      style={{
        width: 200
      }}
      autoFocus={isActive}
      popupMatchSelectWidth={false}
      allowClear
      notFoundContent='Sorry, no artist found'
      variant='borderless'
      defaultValue={formData.artistID}
      options={options.map(artist => ({
        artistID: artist._id,
        value: `${artist.firstName} ${artist.lastName}`,
        // value: artist._id,

        label: artistsDropdownDisplay(artist)
      }))}
      placeholder='Search Artist'
      filterOption={filterOption}
      open={isActive}
      onSelect={handleChangeArtist}
      // onChange={value => onSetFormData(0, 'artistID', value.artistID)}
      id={0}
      onBlur={() => setActiveInputTab(null)}
    />
  )
}
