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
  const [currentItem, setCurrentItem] = useState(null)

  useEffect(() => {
    const handleScroll = () => {
      setHideMenuItems(true)
    }
    window.addEventListener('scroll', handleScroll)
    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [isScrolled, hideMenuItems])

  function handleClick() {
    displayNavItems()
  }

  function setActiveItem(item) {
    setCurrentItem(item)
  }

  const showNavMenu = hideMenuItems ? null : (
    <ul className={styles['nav-menu-bar']}>
      <li className={styles['nav-menu-bar-item']}>
        <span>Artists</span>
      </li>
      <li className={styles['nav-menu-bar-item']}>
        <span>Events</span>
      </li>
      <li className={styles['nav-menu-bar-item']}>
        <span>Articles</span>
      </li>
    </ul>
  )

  const menuSetting = !hideMenuItems ? { width: '60%', textAlign: 'center' } : null
  const activeItem = styles['active-search-item']

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
          <form className={styles['search-bar']} onSubmit={e => e.preventDefault()}>
            <NavBarSearchBar
              placeholder={'Search Artist'}
              wrapperClassName={styles.searchWrapper}
              usersData={usersData}
            />
            <div className={styles['search-item-divider']}></div>

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
            <div className={styles['search-item-divider']}></div>

            <CustomDropdown />
            <div className={styles['search-item-divider']}></div>

            <TabButton className={styles.bookNowButton}>Book Now!</TabButton>
          </form>
        </ConfigProvider>
      </nav>
    </CSSTransition>
  )
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

export const NavBarSearchBar = ({ usersData, className, placeholder, wrapperClassName, onSelect }) => {
  const [query, setQuery] = useState('')
  const [artistsList, setArtistsList] = useState([])
  const [filteredArtistsList, setFilteredArtistsList] = useState([])
  const [options, setOptions] = useState([])

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

    if (onSelect) {
      const selectedArtist = filteredList.find(
        artist => `${artist.firstName} ${artist.lastName}`.toLowerCase() === value.toLowerCase()
      )
      onSelect(selectedArtist)
    }
  }

  return (
    <div className={wrapperClassName ? wrapperClassName : styles.wrapperClass}>
      <AutoComplete
        options={options}
        autoFocus
        popupMatchSelectWidth={false}
        // notFoundContent='Sorry, Artist not found!'
        onSelect={handleQueryChange}
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
