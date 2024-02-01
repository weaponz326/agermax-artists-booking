import { useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import styles from './navbar.module.css'
import { CSSTransition } from 'react-transition-group'
import { menuConfig } from './NavbarData'
import { Dropdown, Menu, Form, Input, Button, Date, DatePicker, Space, Dow, AutoComplete, ConfigProvider } from 'antd'
import { DownOutlined } from '@ant-design/icons'

import CustomizedDropdown from '../Dropdown/CustomizedDropDown'
const { RangePicker } = DatePicker
import TabButton from '../AdminPagesSharedComponents/ViewTab/TabButton'
import usersData from './Music Artists Data'

export default function Navbar() {
  const [navItemsOpen, setNavItemsOpen] = useState(false)
  const [selectNavItem, setSelectNavItem] = useState('')
  const [navItemsDetails, setNavItemsDetails] = useState(null)
  const navBarRef = useRef()
  const [form] = Form.useForm()

  return (
    <nav className={styles['header-navbar']} ref={navBarRef}>
      <nav className={`${styles['top-bar']} ${styles['nav-bar']}`}>
        <div className={styles.agermaxLogoContainer}>
          <Link href='/'>
            <img className={styles['logo-img ']} alt='App dark' src='/images/logo.png' />
          </Link>
        </div>
        <Search />
        <CustomizedDropdown className={styles.userActionsButtons} />
      </nav>
      {navItemsDetails}
    </nav>
  )
}

const Search = ({ displayNavItems, navItemsOpen }) => {
  const [isScrolled, setIsScrolled] = useState(false)
  const [hideMenuItems, setHideMenuItems] = useState(false)
  const [activeTab, setActiveTab] = useState(null)
  const searchBarContainerRef = useRef()
  const dateInputRef = useRef()
  const bookerInputRef = useRef()

  useEffect(() => {
    const handleScroll = () => {
      setHideMenuItems(true)
      setActiveTab(null)
    }
    window.addEventListener('scroll', handleScroll)
    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [isScrolled, hideMenuItems])

  useEffect(() => {
    //Listen to a click event outside the searchBarContainer ref and set activeTab to null
    const handleClickOutsideSearch = event => {
      if (!hideMenuItems) {
        if (!searchBarContainerRef.current.contains(event.target)) {
          setActiveTab(null)
          setHideMenuItems(true)
        }
      }
    }
    document.addEventListener('click', handleClickOutsideSearch)
    return () => {
      document.removeEventListener('click', handleClickOutsideSearch)
    }
  }, [activeTab])

  function setActiveItem(item) {
    setActiveTab(item)
  }

  const navMenu = (
    <ul className={styles['nav-menu-bar']} onClick={() => setHideMenuItems(false)}>
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

  const showNavMenu = hideMenuItems ? null : navMenu

  ///Set Conditional Classes
  const checkDateActiveClass = activeTab === dateInputRef.current ? styles.activeTab : null
  const checkBookerActiveClass = activeTab === bookerInputRef.current ? styles.activeTab : null
  const checkSearchBarActiveClass = activeTab === searchBarContainerRef.current ? styles.activeTab : null

  if (hideMenuItems) {
    return <>{navMenu}</>
  } else {
    return (
      //Apply transition effect to the Nav search bar
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
        <nav className={styles['main-nav-search-bar']}>
          {showNavMenu}
          <ConfigProvider
            theme={{
              token: {
                colorTextPlaceholder: 'rgb(0, 0, 0, 0.5)'
              }
            }}
          >
            <form className={styles['search-bar']} onSubmit={e => e.preventDefault()} ref={searchBarContainerRef}>
              <NavBarSearchBar
                placeholder={'Search Artist'}
                wrapperClassName={styles.searchWrapper}
                usersData={usersData}
                dateInputRef={dateInputRef.current}
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
                  variant='borderless'
                  className={styles.rangePicker}
                  showTime={{
                    format: 'HH:mm'
                  }}
                  format='YYYY-MM-DD HH:mm'
                  // onChange={onChange}
                  // onOk={onOk}
                />
              </div>
              <div className={styles['search-item-divider']}></div>
              <div
                className={`${styles.searchWrapper} ${checkBookerActiveClass}`}
                onClick={e => setActiveItem(bookerInputRef.current)}
                onFocus={e => setActiveItem(bookerInputRef.current)}
                ref={bookerInputRef}
              >
                <CustomDropdown />
              </div>
              <div className={styles['search-item-divider']}></div>

              <TabButton className={styles.bookNowButton}>Book Now!</TabButton>
            </form>
          </ConfigProvider>
        </nav>
      </CSSTransition>
    )
  }
}

export const Backdrop = ({ handleModalEffect }) => {
  return <div className={styles['backdrop']} onClick={() => handleModalEffect()}></div>
}

export const CustomDropdown = () => {
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
  return (
    <Dropdown
      menu={{
        items
      }}
      trigger={['click']}
    >
      <Space>
        <TabButton className={styles.bookerDetailsButton}>Booker Details</TabButton>
        <DownOutlined />
      </Space>
    </Dropdown>
  )
}

export const NavBarSearchBar = ({
  usersData,
  className,
  placeholder,
  wrapperClassName,
  dateInputRef,
  setActiveItem,
  activeTab
}) => {
  const [query, setQuery] = useState('')
  const [artistsList, setArtistsList] = useState([])
  const [filteredArtistsList, setFilteredArtistsList] = useState([])
  const [options, setOptions] = useState([])
  const searchInputRef = useRef()

  useEffect(() => {
    const filteredArtistsList = usersData.filter(user => user.type === 'Artist')
    setArtistsList(filteredArtistsList)
    setFilteredArtistsList(filteredArtistsList)
  }, [usersData])

  useEffect(() => {
    const newOptions = filteredArtistsList.map(artist => ({
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
    }))

    setOptions(newOptions)
  }, [filteredArtistsList])

  const handleQueryChange = value => {
    setQuery(value)

    const filteredList = artistsList.filter(
      artist =>
        artist.firstName.toLowerCase().includes(value.toLowerCase()) ||
        artist.lastName.toLowerCase().includes(value.toLowerCase())
    )

    setFilteredArtistsList(filteredList)

    // if (onSelect) {
    //   const selectedArtist = filteredList.find(
    //     artist => `${artist.firstName} ${artist.lastName}`.toLowerCase() === value.toLowerCase()
    //   )
    //   onSelect(selectedArtist)
    // }
  }

  const handleSelectQuery = e => {
    console.log(activeTab)
    const filteredList = artistsList.filter(
      artist =>
        artist.firstName.toLowerCase().includes(query.toLowerCase()) ||
        artist.lastName.toLowerCase().includes(query.toLowerCase())
    )

    setFilteredArtistsList(filteredList)
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
        options={options}
        autoClearSearchValue={true}
        popupMatchSelectWidth={false}
        // notFoundContent='Sorry, Artist not found!'
        onSelect={e => handleSelectQuery(e)}
        onSearch={handleQueryChange}
        onChange={handleQueryChange} // Add onChange to handle controlled input
        className={styles.searchInputField}
        placeholder={placeholder ? placeholder : 'Search Artist'}
        value={query}
        variant='borderless'
        style={{
          width: 160,
          height: 50
        }}
      />
    </div>
  )
}
