import { FaSearch } from 'react-icons/fa'
import { IconContext } from 'react-icons'
import { useRef, useState } from 'react'

export default function Navbar() {
  const [navItemsOpen, setNavItemsOpen] = useState(false)
  const [selectNavItem, setSelectNavItem] = useState('')

  const displayNavItems = () => {
    setNavItemsOpen(true)
    setActiveNavItem('Search')
  }

  const setActiveNavItem = activeNavItem => {
    setSelectNavItem(activeNavItem)
  }

  const showNavItems = navItemsOpen ? (
    <NavItems setActiveNavItem={setActiveNavItem} />
  ) : (
    <Search displayNavItems={displayNavItems} />
  )

  function switchNavItemDetails() {
    if (selectNavItem === 'Search') {
      {
        return <Search displayNavItems={displayNavItems} />
      }
    } else if (selectNavItem === 'Events') {
      return (
        <div className='nav-item-detail'>
          Events Coming Soon
          <br />
          Stay Tuned!
        </div>
      )
    } else if (selectNavItem === 'Articles') {
      return (
        <div className='nav-item-detail'>
          Articles also Coming Soon
          <br />
          Stay Tuned!
        </div>
      )
    }
  }

  return (
    <nav className='header-navbar'>
      <nav className='top-bar nav-bar'>
        <div className='logo first-img'>
          <img className='logo-img ' alt='App dark' src='/images/logo.png' />
        </div>
        {showNavItems}
        <div className='logo last-img'>
          <img className='logo-img ' alt='Ellipse' src='/images/ellipse-121.png' />
        </div>
      </nav>
      {switchNavItemDetails()}
    </nav>
  )
}

export const NavItems = ({ setActiveNavItem }) => {
  return (
    <div className='nav-items'>
      <Performers setActiveNavItem={setActiveNavItem} />
      <Events setActiveNavItem={setActiveNavItem} />
      <Articles setActiveNavItem={setActiveNavItem} />
    </div>
  )
}

export const Performers = ({ setActiveNavItem }) => {
  return (
    <span className='nav-item' onClick={() => setActiveNavItem('Search')}>
      Performers
    </span>
  )
}
export const Events = ({ setActiveNavItem }) => {
  return (
    <span className='nav-item' onClick={() => setActiveNavItem('Events')}>
      Events
    </span>
  )
}
export const Articles = ({ setActiveNavItem }) => {
  return (
    <span className='nav-item' onClick={() => setActiveNavItem('Articles')}>
      Articles{' '}
    </span>
  )
}

const Search = ({ displayNavItems }) => {
  const [openMenu, setOpenMenu] = useState(false)
  const inputRef = useRef()

  function handleClick() {
    displayNavItems()
  }

  return (
    <div className='search-bar'>
      <input type='search' name='' id='' placeholder='Find amazing artists' ref={inputRef} onClick={handleClick} />
      <IconContext.Provider value={{ color: 'white', size: '1.2rem' }}>
        <div className='search-icon'>
          <FaSearch />
        </div>
      </IconContext.Provider>
    </div>
  )
}
