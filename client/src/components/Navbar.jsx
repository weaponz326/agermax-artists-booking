import { FaSearch } from 'react-icons/fa'
import { IconContext } from 'react-icons'
import { useEffect, useRef, useState } from 'react'

export default function Navbar() {
  const [navItemsOpen, setNavItemsOpen] = useState(false)
  const [selectNavItem, setSelectNavItem] = useState('')
  const [navItemsDetails, setNavItemsDetails] = useState(null)
  const navBarRef = useRef()

  useEffect(() => {
    const handleClickOutside = e => {
      if (navBarRef.current && !navBarRef.current.contains(e.target)) {
        setNavItemsOpen(false)
        setNavItemsDetails(null)
        setSelectNavItem('')

        console.log(navBarRef.current)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)

    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [navBarRef])

  useEffect(() => {
    if (selectNavItem === 'Events') {
      setNavItemsDetails(() => {
        return <div className='nav-item-detail'>Events Coming Soon. Stay Tuned!</div>
      })
    } else if (selectNavItem === 'Performers') {
      setNavItemsDetails(currentItem => {
        return <Search displayNavItems={displayNavItems} />
      })
    } else if (selectNavItem === 'Articles') {
      setNavItemsDetails(() => {
        return <div className='nav-item-detail'>Very soon, this will come also. Stay tuned!</div>
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
    <nav className='header-navbar' ref={navBarRef}>
      <nav className='top-bar nav-bar'>
        <div className='logo first-img'>
          <img className='logo-img ' alt='App dark' src='/images/logo.png' />
        </div>
        {showNavItems}
        <div className='logo last-img'>
          <img className='logo-img ' alt='Ellipse' src='/images/ellipse-121.png' />
        </div>
      </nav>
      {navItemsDetails}
    </nav>
  )
}

export const NavItems = ({ setActiveNavItem, activeNavItem }) => {
  return (
    <div className='nav-items'>
      <Performers setActiveNavItem={setActiveNavItem} activeNavItem={activeNavItem} />
      <Events setActiveNavItem={setActiveNavItem} activeNavItem={activeNavItem} />
      <Articles setActiveNavItem={setActiveNavItem} activeNavItem={activeNavItem} />
    </div>
  )
}

export const Performers = ({ setActiveNavItem, activeNavItem }) => {
  const setActiveClass = activeNavItem === 'Performers' ? 'nav-item active-nav-item' : 'nav-item'

  return (
    <span className={setActiveClass} onClick={e => setActiveNavItem(e.target.textContent)}>
      Performers
    </span>
  )
}
export const Events = ({ setActiveNavItem, activeNavItem }) => {
  const setActiveClass = activeNavItem === 'Events' ? 'nav-item active-nav-item' : 'nav-item'

  return (
    <span className={setActiveClass} onClick={e => setActiveNavItem(e.target.textContent)}>
      Events
    </span>
  )
}
export const Articles = ({ setActiveNavItem, activeNavItem }) => {
  const setActiveClass = activeNavItem === 'Articles' ? 'nav-item active-nav-item' : 'nav-item'

  return (
    <span className={setActiveClass} onClick={e => setActiveNavItem(e.target.textContent)}>
      Articles
    </span>
  )
}

const Search = ({ displayNavItems }) => {
  function handleClick() {
    displayNavItems()
  }

  return (
    <div className='search-bar'>
      <input type='search' name='' id='' placeholder='Find amazing artists' autoFocus onClick={handleClick} />
      <IconContext.Provider value={{ color: 'white', size: '1.2rem' }}>
        <div className='search-icon'>
          <FaSearch />
        </div>
      </IconContext.Provider>
    </div>
  )
}
