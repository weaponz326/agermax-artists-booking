import { blue } from '@mui/material/colors'
import { FaSearch } from 'react-icons/fa'
import { IconContext } from 'react-icons'
import { IoSearch } from 'react-icons/io5'

export default function Navbar() {
  return (
    <nav className='top-bar nav-bar'>
      <div className='logo first-img'>
        <img className='logo-img ' alt='App dark' src='/images/logo.png' />
      </div>
      <Search />
      <div className='logo last-img'>
        <img className='logo-img ' alt='Ellipse' src='/images/ellipse-121.png' />
      </div>
    </nav>
  )
}

const Search = () => {
  return (
    <div className='search-bar'>
      <input type='search' name='' id='' placeholder='Find amazing artists' />
      <IconContext.Provider value={{ color: 'white', size: '1.2rem' }}>
        <div className='search-icon'>
          <FaSearch />
        </div>
      </IconContext.Provider>
    </div>
  )
}
