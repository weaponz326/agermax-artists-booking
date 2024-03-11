import { FaSearch } from 'react-icons/fa'
import { useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import styles from './navbar.module.css'
import { CSSTransition } from 'react-transition-group'
import { menuConfig } from './NavbarData'
export default function Navbar() {
  const [navItemsOpen, setNavItemsOpen] = useState(false)
  const [selectNavItem, setSelectNavItem] = useState('')
  const [navItemsDetails, setNavItemsDetails] = useState(null)
  const navBarRef = useRef()

  return (
    <nav className={styles['header-navbar']} ref={navBarRef}>
      <nav className={`${styles['top-bar']} ${styles['nav-bar']}`}>
        <Link href='/'>
          <div className={`${styles['logo']} ${styles['first-img']}`}>
            <img className={styles['logo-img ']} alt='App dark' src='/images/logo.png' />
          </div>
        </Link>
        <Search />
        <div className={`${styles['logo']} ${styles['last-img']}`}>
          <img className={styles['logo-img ']} alt='Ellipse' src='/images/ellipse-121.png' />
        </div>
      </nav>
      {navItemsDetails}
    </nav>
  )
}

const Search = ({ displayNavItems, navItemsOpen }) => {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMenuItemActive, setIsMenuItemActive] = useState(true)
  const [currentItem, setCurrentItem] = useState(null)

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY
      const scrolledDown = currentScrollY > 0
      const isAtTop = currentScrollY === 0
      setIsScrolled(scrolledDown && !isAtTop)
      setIsMenuItemActive(isAtTop)
    }
    window.addEventListener('scroll', handleScroll)
    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [isScrolled, isMenuItemActive])

  function handleClick() {
    displayNavItems()
  }

  function setActiveItem(item) {
    setCurrentItem(item)
    console.log(currentItem)
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

  const menuSetting = !isMenuItemActive ? { width: '60%', textAlign: 'center' } : null
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
      in={isScrolled}
    >
      <nav className={styles['main-nav-search-bar']}>
        {showNavMenu}
        <div className={styles['search-bar']}>
          <div
            className={`${styles['search-item']} ${styles['first-item']} `}
            // onClick={e => setActiveItem('searchItemInput')}
          >
            <div className={styles['search-item-detail']}>
              {isMenuItemActive ? (
                <form>
                  <label htmlFor='search-artist'>
                    Who
                    <input
                      className={styles['search-artist']}
                      type='text'
                      name='search-artist'
                      placeholder='Search Artists'
                      id='search-artist'
                    />
                  </label>
                </form>
              ) : (
                <span>
                  <p>Hot Performers</p>
                </span>
              )}
            </div>
          </div>
          <div className={styles['search-item-divider']}></div>
          <div className={`${styles['search-item']} ${styles['second-item']}`}>
            <div className={styles['search-item-detail']}>
              {isMenuItemActive ? menuConfig[1].config : menuConfig[1].altConfig}
            </div>
          </div>

          <div className={styles['search-item-divider']}></div>
          <div className={`${styles['search-item']} ${styles['third-item']}`}>
            <div className={styles['search-item-detail']}>
              {isMenuItemActive ? menuConfig[2].config : menuConfig[2].altConfig}
            </div>
          </div>

          <div className={styles['search-item-divider']}></div>
          <div className={`${styles['search-item']} ${styles['fourth-item']}`}>
            <div className={styles['search-item-detail']}>
              {isMenuItemActive ? menuConfig[3].config : menuConfig[3].altConfig}
            </div>
          </div>
          <div className={`${styles['search-item']} ${styles['fifth-item']}`}>
            <div className={styles['search-item-detail']}>
              <button className={styles['search-btn']} type='submit'>
                <span>Book Now!</span>
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
