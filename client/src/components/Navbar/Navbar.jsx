import { useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import styles from './navbar.module.css'
import { CSSTransition } from 'react-transition-group'
import { Dropdown, DatePicker, Space, AutoComplete, ConfigProvider } from 'antd'
import { DownOutlined } from '@ant-design/icons'

import CustomizedDropdown from '../Dropdown/CustomizedDropDown'
const { RangePicker } = DatePicker
import TabButton from '../AdminPagesSharedComponents/ViewTab/TabButton'
import SearchBar from '../AdminPagesSharedComponents/SearchBar/SearchBar'
import { useArtists } from 'src/providers/ArtistsProvider'

export default function Navbar() {
  const [hideMenuItems, setHideMenuItems] = useState(true)
  const [activeTab, setActiveTab] = useState(null)

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
          <Search
            hideMenuItems={hideMenuItems}
            setHideMenuItems={setHideMenuItems}
            activeTab={activeTab}
            setActiveTab={setActiveTab}
          />
          <CustomizedDropdown className={styles.userActionsButtons} />
        </div>
      </div>
    </nav>
  )
}

const Search = ({ hideMenuItems, setHideMenuItems, activeTab, setActiveTab }) => {
  const menuBarWrapper = useRef()
  const searchBarContainerRef = useRef()
  const dateInputRef = useRef(null)
  const dateRangePickerRef = useRef(null)
  const bookerInputRef = useRef()

  useEffect(() => {
    const handleScroll = () => {
      setHideMenuItems(true)
      setActiveTab(null)
      // searchBarContainerRef.current.blur()
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

  function setActiveItem(item) {
    setActiveTab(item)
    item.focus()
  }

  function handleMenuClick() {
    setActiveTab(null)
    setHideMenuItems(false)
    const antDropdown = document.querySelector('.ant-select-selection-search-input')
  }
  function switchToDatePicker() {
    dateRangePickerRef.current.focus()
    console.log(dateRangePickerRef.current)
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
          onClick={handleMenuClick}
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
            <form className={styles['search-bar']} onSubmit={e => e.preventDefault()} ref={searchBarContainerRef}>
              <NavBarSearchBar
                placeholder={'Search Artist'}
                wrapperClassName={styles.searchWrapper}
                switchToDatePicker={switchToDatePicker}
                // dateInputRef={dateInputRef.current}
                setActiveItem={setActiveItem}
                activeTab={activeTab}
              />
              <div className={styles['search-item-divider']}></div>
              <div
                className={`${styles.searchWrapper} ${checkDateActiveClass}`}
                onClick={e => setActiveItem(dateInputRef.current)}
                onFocus={e => setActiveItem(dateInputRef.current)}
                ref={dateInputRef}
              >
                <RangePicker
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
                />
              </div>
              <div className={styles['search-item-divider']}></div>
              <div
                className={`${styles.searchWrapper} ${checkBookerActiveClass}`}
                onClick={e => setActiveItem(bookerInputRef.current)}
                onFocus={e => setActiveItem(bookerInputRef.current)}
                ref={bookerInputRef}
              >
                <CustomDropdown hideMenuItems={hideMenuItems} />
              </div>
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

export const NavBarSearchBar = ({ switchToDatePicker, placeholder, setActiveItem, activeTab }) => {
  const [query, setQuery] = useState('')
  const [artistsList, setArtistsList] = useState([])
  const [filteredArtistsList, setFilteredArtistsList] = useState([])
  const [options, setOptions] = useState([])
  const searchInputRef = useRef()
  const { artists } = useArtists()

  useEffect(() => {
    //Get All Artists Lists

    if (artists) setArtistsList(artists)
    if (artists) setFilteredArtistsList(artists)
  }, [])

  useEffect(() => {
    const newOptions = filteredArtistsList.map(
      artist => ({
        value: `${artist.firstName} ${artist.lastName}`,
        label: (
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
      }),
      [query]
    )

    setOptions(newOptions)
  }, [filteredArtistsList])

  const handleSelectQuery = e => {
    switchToDatePicker()
    if (artistsList.length != 0) {
      const filteredList = artistsList.filter(
        artist =>
          artist.firstName.toLowerCase().includes(query.toLowerCase()) ||
          artist.lastName.toLowerCase().includes(query.toLowerCase())
      )

      setFilteredArtistsList(filteredList)
    }
  }

  const checkSearchActiveClass = activeTab === searchInputRef.current ? styles.activeTab : null

  return (
    <div
      onClick={e => setActiveItem(searchInputRef.current)}
      onFocus={e => setActiveItem(searchInputRef.current)}
      ref={searchInputRef}
      className={`${styles.searchWrapper} ${checkSearchActiveClass}`}
      // className={`${styles.wrapperClass} ${checkActiveClass}`}
    >
      <AutoComplete
        allowClear
        // open={true}
        autoFocus
        options={options}
        popupMatchSelectWidth={false}
        popupClassName={styles.popup}
        notFoundContent='Sorry, Artist not found!'
        onSelect={e => handleSelectQuery(e)}
        className={styles.searchInputField}
        placeholder={placeholder ? placeholder : 'Search Artist'}
        // value={query}
        variant='borderless'
        style={{
          width: 185,
          height: 50
        }}
        filterOption={(inputValue, option) => option.value.toUpperCase().indexOf(inputValue.toUpperCase()) !== -1}
      />
    </div>
  )
}
