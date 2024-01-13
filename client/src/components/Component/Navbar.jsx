import { FaSearch } from 'react-icons/fa'

export default function Navbar() {
  return (
    <div className='top-bar nav-bar'>
      <div className='logo first-img'>
        <img className='logo-img ' alt='App dark' src='/images/logo.png' />
      </div>
      <div className='search-component'>
        <FaSearch />
        <input className='search-field' type='search' name='' id='' placeholder='&#128269; Find amazing artist....' />
      </div>
      <div className='logo last-img'>
        <img className='logo-img ' alt='Ellipse' src='/images/ellipse-121.png' />
      </div>
    </div>
  )
}
