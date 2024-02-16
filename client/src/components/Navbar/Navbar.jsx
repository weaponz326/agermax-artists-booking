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

const disabledDate = current => {
  // Can not select days before today and today
  return current && current < dayjs().endOf('day')
}

export default function Navbar() {
  const [hideMenuItems, setHideMenuItems] = useState(true)

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
          <CustomizedDropdown className={styles.userActionsButtons} />
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
    console.log(dateInputRef.current)
    setActiveItem(dateInputRef.current)

    // setActiveTab(dateInputRef.current)
  }
  function switchToBookerDetails() {
    bookerInputRef.current.focus()
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
                onChange={handleDateChange}
                variant='borderless'
                size='small'
                disabledDate={disabledDate}
                onFocus={e => setActiveItem(dateInputRef.current)}
                aria-required='true'
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
                onClick={e => setActiveItem(getInTimeRef.current)}
                onFocus={e => setActiveItem(getInTimeRef.current)}
                ref={getInTimeRef}
                name='getInTime'
                placeholder='Get In Time'
                minuteStep={15}
                showNow={false}
                showSecond={false}
                format='HH:mm'
                defaultValue={formData.getInTime}
                onChange={handleChangeGetInTime}
                variant='borderless'
                size='small'
                aria-required='true'
              />
              <div className={styles['search-item-divider']}></div>

              <TimePicker
                className={`${styles.searchWrapper} ${checkStartTimeActiveClass}`}
                onClick={e => setActiveItem(startTimeRef.current)}
                onFocus={e => setActiveItem(startTimeRef.current)}
                ref={startTimeRef}
                name='startTime'
                placeholder='Start Time'
                minuteStep={15}
                showNow={false}
                showSecond={false}
                format='HH:mm'
                defaultValue={formData.startTime}
                onChange={handleChangeStartTime}
                variant='borderless'
                size='small'
                aria-required='true'
              />
              <div className={styles['search-item-divider']}></div>

              <TimePicker
                className={`${styles.searchWrapper} ${checkEndTimeActiveClass}`}
                onClick={e => setActiveItem(endTimeRef.current)}
                onFocus={e => setActiveItem(endTimeRef.current)}
                ref={endTimeRef}
                name='endTime'
                placeholder='End Time'
                minuteStep={15}
                showNow={false}
                showSecond={false}
                format='HH:mm'
                defaultValue={formData.endTime}
                onChange={handleChangeEndTime}
                variant='borderless'
                size='small'
                aria-required
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
  setFormData
}) => {
  const [options, setOptions] = useState([])
  const searchInputRef = useRef()
  // const { artists } = useArtists()

  useEffect(() => {
    //Get All Artists Lists
    if (artists) setOptions(artists)
  }, [artists])

  const handleChangeArtist = (artist, option) => {
    const { artistID } = option
    artist && setFormData({ ...formData, artistID: artistID })
    switchToDatePicker()
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

  return (
    <AutoComplete
      onClick={e => setActiveItem(searchInputRef.current)}
      onFocus={e => setActiveItem(searchInputRef.current)}
      ref={searchInputRef}
      className={`${styles.searchWrapper} ${checkSearchActiveClass}`}
      style={{
        width: 200
      }}
      autoFocus
      popupMatchSelectWidth={false}
      allowClear
      notFoundContent='Sorry, no artist found'
      variant='borderless'
      onSelect={handleChangeArtist}
      defaultValue={formData.artistID}
      options={options.map(artist => ({
        artistID: artist._id,
        value: `${artist.firstName} ${artist.lastName}`,
        label: artistsDropdownDisplay(artist)
      }))}
      placeholder='Search Artist'
      filterOption={filterOption}
    />
  )
}
