import Link from 'next/link'
import { MdFacebook, MdRefresh } from 'react-icons/md'
import { FaInstagram, FaTwitter } from 'react-icons/fa'

const Footer = () => {
  return (
    <footer>
      <div className='links'>
        <Link href='' className='logo'>
          <img src='/images/logo.png' alt='AgerMax Logo' />
          <div className='logo-text'>AGERMAX</div>
        </Link>
        <ul className='footer-nav'>
          <li>
            <Link href=''>Home</Link>
          </li>
          <li>
            <Link href=''>About Us</Link>
          </li>
          <li>
            <Link href=''>Contact</Link>
          </li>
          <li>
            <Link href=''>Newsletter</Link>
          </li>
        </ul>
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
        <div className='copyright'>@Copyright Agermax 2024</div>
        <ul className='terms-privacy'>
          <li>
            <Link href=''>Terms</Link>
          </li>
          <li>
            <Link href=''>Privacy Policy</Link>
          </li>
          <li>
            <Link href=''>Cookies</Link>
          </li>
        </ul>
      </div>
    </footer>
  )
}

export default Footer
