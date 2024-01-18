import { FaSearch } from 'react-icons/fa'
import { IconContext } from 'react-icons'
import { useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import styles from './navbar.module.css'

export default function Navbar() {
  const [navItemsOpen, setNavItemsOpen] = useState(false)
  const [selectNavItem, setSelectNavItem] = useState('')
  const [navItemsDetails, setNavItemsDetails] = useState(null)
  const navBarRef = useRef()

  const handleModalEffect = () => {
    setNavItemsOpen(false)
    setNavItemsDetails(null)
    setSelectNavItem('')
  }

  useEffect(() => {
    if (selectNavItem === 'Events') {
      setNavItemsDetails(() => {
        return (
          <>
            <div className={styles['page-nav-item-detail']}>Events Coming Soon. Stay Tuned!</div>
            <Backdrop handleModalEffect={handleModalEffect} />
          </>
        )
      })
    } else if (selectNavItem === 'Performers') {
      setNavItemsDetails(currentItem => {
        return (
          <>
            <Search displayNavItems={displayNavItems} navItemsOpen={navItemsOpen} />
            <Backdrop handleModalEffect={handleModalEffect} />
          </>
        )
      })
    } else if (selectNavItem === 'Articles') {
      setNavItemsDetails(() => {
        return (
          <>
            <div className={styles['page-nav-item-detail']}>Very soon, this will come also. Stay tuned!</div>
            <Backdrop handleModalEffect={handleModalEffect} />
          </>
        )
      })
    }
  }, [selectNavItem])

  const displayNavItems = () => {
    setNavItemsOpen(true)
    setSelectNavItem('Performers')
  }

  const setActiveNavItem = activeNavItem => {
    setSelectNavItem(activeNavItem)
  }

  const showNavItems = navItemsOpen ? (
    <NavItems setActiveNavItem={setActiveNavItem} activeNavItem={selectNavItem} />
  ) : (
    <Search displayNavItems={displayNavItems} />
  )

  return (
    <nav className={styles['header-navbar']} ref={navBarRef}>
      <nav className={`${styles['top-bar']} ${styles['nav-bar']}`}>
        <Link href='/'>
          <div className={`${styles['logo']} ${styles['first-img']}`}>
            <img className={styles['logo-img ']} alt='App dark' src='/images/logo.png' />
          </div>
        </Link>
        {showNavItems}
        <div className={`${styles['logo']} ${styles['last-img']}`}>
          <img className={styles['logo-img ']} alt='Ellipse' src='/images/ellipse-121.png' />
        </div>
      </nav>
      {navItemsDetails}
    </nav>
  )
}

export const NavItems = ({ setActiveNavItem, activeNavItem }) => {
  return (
    <div className={styles['page-nav-items']}>
      <Performers setActiveNavItem={setActiveNavItem} activeNavItem={activeNavItem} />
      <Events setActiveNavItem={setActiveNavItem} activeNavItem={activeNavItem} />
      <Articles setActiveNavItem={setActiveNavItem} activeNavItem={activeNavItem} />
    </div>
  )
}

export const Performers = ({ setActiveNavItem, activeNavItem }) => {
  const setActiveClass = activeNavItem === 'Performers' ? 'active-page-nav-item' : 'page-nav-item'

  return (
    <span
      className={`${styles[setActiveClass]} ${styles['page-nav-item']}`}
      onClick={e => setActiveNavItem(e.target.textContent)}
    >
      Performers
    </span>
  )
}
export const Events = ({ setActiveNavItem, activeNavItem }) => {
  const setActiveClass = activeNavItem === 'Events' ? 'active-page-nav-item' : 'page-nav-item'

  return (
    <span
      className={`${styles[setActiveClass]} ${styles['page-nav-item']}`}
      onClick={e => setActiveNavItem(e.target.textContent)}
    >
      Events
    </span>
  )
}
export const Articles = ({ setActiveNavItem, activeNavItem }) => {
  const setActiveClass = activeNavItem === 'Articles' ? 'active-page-nav-item' : 'page-nav-item'

  return (
    <span
      className={`${styles[setActiveClass]} ${styles['page-nav-item']}`}
      onClick={e => setActiveNavItem(e.target.textContent)}
    >
      Articles
    </span>
  )
}

const Search = ({ displayNavItems, navItemsOpen }) => {
  function handleClick() {
    displayNavItems()
  }

  return (
    <div className={styles['search-bar']}>
      <div className={styles['search-item']}>
        <div className={styles['search-item-detail']}>
          <p>Where</p>
          <p>Search Event Venue</p>
        </div>
      </div>
      <div className={styles['search-item-divider']}></div>
      <div className={styles['search-item']}>
        <div className={styles['search-item-detail']}>
          <p>When</p>
          <p>Search Event Schedule</p>
        </div>
      </div>
      <div className={styles['search-item-divider']}></div>

      <div className={styles['search-item']}>
        <div className={styles['search-item-detail']}>
          <p>Who</p>
          <p>Search Event Artists</p>
        </div>
      </div>
      <div className={styles['search-item-divider']}></div>

      <div className={styles['search-item']}>
        <div className={styles['search-item-detail']}>
          <p>Guest</p>
          <p>Guest Artists</p>
        </div>
      </div>
      <div className={styles['search-item-divider']}></div>

      <div className={styles['search-item']}>
        <div className={styles['search-item-detail']}>
          <button className={styles['search-btn']} type='submit'>
            <span>
              <FaSearch />
            </span>
          </button>
        </div>
      </div>
      {/* <input
        type='search'
        name=''
        id=''
        placeholder='Find Incredible artists'
        onClick={handleClick}
        autoFocus={navItemsOpen}
      />
      <IconContext.Provider value={{ color: 'white', size: '1.2rem' }}>
        <div className={styles['search-icon']}>
          <FaSearch />
        </div>
      </IconContext.Provider> */}
    </div>
  )
}

export const Backdrop = ({ handleModalEffect }) => {
  return <div className={styles['backdrop']} onClick={() => handleModalEffect()}></div>
}
