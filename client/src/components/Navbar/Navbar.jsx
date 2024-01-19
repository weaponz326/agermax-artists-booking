import { FaSearch } from 'react-icons/fa'
import { IconContext } from 'react-icons'
import { useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import styles from './navbar.module.css'
import { width } from '@mui/system'
import { CSSTransition, TransitionGroup, Transition } from 'react-transition-group'

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
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMenuItemActive, setIsMenuItemActive] = useState(true)

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY

      // Check if the user is scrolling down
      const scrolledDown = currentScrollY > 0

      // Check if the user is at the top of the screen
      const isAtTop = currentScrollY === 0

      // Update state based on scrolling direction and position
      setIsScrolled(scrolledDown && !isAtTop)
      setIsMenuItemActive(isAtTop)

      // Save the current scroll position for the next scroll event
    }

    // Attach the scroll event listener
    window.addEventListener('scroll', handleScroll)

    // Cleanup the event listener on component unmount
    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [isScrolled, isMenuItemActive]) // Empty dependency array ensures the effect runs only once on mount

  function handleClick() {
    displayNavItems()
  }

  const showNavMenu = isScrolled ? null : (
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

  const menuConfig = !isMenuItemActive ? { width: '60%', textAlign: 'center' } : null

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
      in={isScrolled}
      c
    >
      <nav className={styles['main-nav-search-bar']}>
        {showNavMenu}
        <div style={menuConfig} className={styles['search-bar']}>
          <div className={`${styles['search-item']} ${styles['first-item']}`}>
            <div className={styles['search-item-detail']}>
              {isMenuItemActive ? (
                <span>
                  <p>Who</p>
                  <p>Amazing Artists</p>
                </span>
              ) : (
                <span>
                  <p>Amazing Artists</p>
                </span>
              )}
            </div>
          </div>
          <div className={styles['search-item-divider']}></div>
          <div className={`${styles['search-item']} ${styles['second-item']}`}>
            <div className={styles['search-item-detail']}>
              {isMenuItemActive ? (
                <span>
                  <p>Where</p>
                  <p>Events Venue</p>
                </span>
              ) : (
                <span>
                  <p>Anywhere</p>
                </span>
              )}
            </div>
          </div>

          <div className={styles['search-item-divider']}></div>
          <div className={`${styles['search-item']} ${styles['third-item']}`}>
            <div className={styles['search-item-detail']}>
              {isMenuItemActive ? (
                <span>
                  <p>When</p>
                  <p>Timelines</p>
                </span>
              ) : (
                <span>
                  <p>Anytime</p>
                </span>
              )}
            </div>
          </div>

          <div className={styles['search-item-divider']}></div>
          <div className={`${styles['search-item']} ${styles['fourth-item']}`}>
            <div className={styles['search-item-detail']}>
              {isMenuItemActive ? (
                <span>
                  <p>Guests</p>
                  <p>Guests Artists</p>
                </span>
              ) : (
                <span>
                  <p>Any Guests</p>
                </span>
              )}
            </div>
          </div>
          <div className={`${styles['search-item']} ${styles['fifth-item']}`}>
            <div className={styles['search-item-detail']}>
              <button className={styles['search-btn']} type='submit'>
                <span>
                  <FaSearch />
                </span>
              </button>
            </div>
          </div>
        </div>
      </nav>
    </CSSTransition>
  )
}

export const Backdrop = ({ handleModalEffect }) => {
  return <div className={styles['backdrop']} onClick={() => handleModalEffect()}></div>
}
