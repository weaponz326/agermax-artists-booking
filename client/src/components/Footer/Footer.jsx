import Link from 'next/link'
import { MdFacebook, MdRefresh } from 'react-icons/md'
import { FaInstagram, FaTwitter } from 'react-icons/fa'
import { useEffect } from 'react'

const Footer = () => {
  const currentYear = new Date().getFullYear()
  return (
    <footer>
      <div className='links'>
        <Link href='/' className='logo'>
          <img src='/images/logo.png' alt='AgerMax Logo' />
          <div className='logo-text'>AGERMAX</div>
        </Link>
        <div className='footer-nav'>
          <Link href='/'>Home</Link>
          <Link href='/about'>About Us</Link>
          <Link href=''>Contact</Link>
          <Link href=''>Newsletter</Link>
        </div>
        <div className='social-media'>
          <Link href='#' className='fab fa-facebook-f'>
            <MdFacebook />
          </Link>
          <Link href='#' className='fab fa-twitter'>
            <FaTwitter />
          </Link>
          <Link href='#' className='fab fa-instagram'>
            <FaInstagram />
          </Link>
        </div>
      </div>
      <div className='copyright-terms'>
        <div className='copyright'>@Copyright Agermax {currentYear}</div>
        <div className='terms-privacy'>
          <Link href=''>Terms</Link>
          <Link href=''>Privacy Policy</Link>
          <Link href=''>Cookies</Link>
        </div>
      </div>
    </footer>
  )
}

export default Footer
