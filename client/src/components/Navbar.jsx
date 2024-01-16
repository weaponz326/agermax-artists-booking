import { FaSearch } from 'react-icons/fa'
import { IconContext } from 'react-icons'
import { useEffect, useRef, useState } from 'react'
import Link from 'next/link'

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
            <div className='page-nav-item-detail'>Events Coming Soon. Stay Tuned!</div>
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
            <div className='page-nav-item-detail'>Very soon, this will come also. Stay tuned!</div>
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
    <nav className='header-navbar' ref={navBarRef}>
      <nav className='top-bar nav-bar'>
        <div className='logo first-img'>
          <Link href='/'>
            <img className='logo-img ' alt='App dark' src='/images/logo.png' />
          </Link>
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
    <div className='page-nav-items'>
      <Performers setActiveNavItem={setActiveNavItem} activeNavItem={activeNavItem} />
      <Events setActiveNavItem={setActiveNavItem} activeNavItem={activeNavItem} />
      <Articles setActiveNavItem={setActiveNavItem} activeNavItem={activeNavItem} />
    </div>
  )
}

export const Performers = ({ setActiveNavItem, activeNavItem }) => {
  const setActiveClass = activeNavItem === 'Performers' ? 'page-nav-item active-page-nav-item' : 'page-nav-item'

  return (
    <span className={setActiveClass} onClick={e => setActiveNavItem(e.target.textContent)}>
      Performers
    </span>
  )
}
export const Events = ({ setActiveNavItem, activeNavItem }) => {
  const setActiveClass = activeNavItem === 'Events' ? 'page-nav-item active-page-nav-item' : 'page-nav-item'

  return (
    <span className={setActiveClass} onClick={e => setActiveNavItem(e.target.textContent)}>
      Events
    </span>
  )
}
export const Articles = ({ setActiveNavItem, activeNavItem }) => {
  const setActiveClass = activeNavItem === 'Articles' ? 'page-nav-item active-page-nav-item' : 'page-nav-item'

  return (
    <span className={setActiveClass} onClick={e => setActiveNavItem(e.target.textContent)}>
      Articles
    </span>
  )
}

const Search = ({ displayNavItems, navItemsOpen }) => {
  function handleClick() {
    displayNavItems()
  }

  return (
    <div className='search-bar'>
      <input
        type='search'
        name=''
        id=''
        placeholder='Find amazing artists'
        onClick={handleClick}
        autoFocus={navItemsOpen}
      />
      <IconContext.Provider value={{ color: 'white', size: '1.2rem' }}>
        <div className='search-icon'>
          <FaSearch />
        </div>
      </IconContext.Provider>
    </div>
  )
}

export const Backdrop = ({ handleModalEffect, navbarHeight }) => {
  return <div className='backdrop' onClick={() => handleModalEffect()}></div>
}
