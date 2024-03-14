import Link from 'next/link'
import { MdFacebook } from 'react-icons/md'
import { FaInstagram, FaTwitter } from 'react-icons/fa'
import styles from './footer.module.css'

const Footer = () => {
  const currentYear = new Date().getFullYear()
  return (
    <footer className={styles['footer']}>
      <div className={styles.footerContent}>
        <div className={styles['links']}>
          <Link href='/' className={styles['logo']}>
            <img src='/images/logo.png' alt='AgerMax Logo' />
            <div className={styles['logo-text']}>AGERMAX</div>
          </Link>
          <div className={styles['footer-nav']}>
            <Link href='/'>Home</Link>
            <Link href='/about'>About</Link>
            <Link href='/artists'>Entertainers</Link>
            <Link href='/events'>Events</Link>
            <Link href=''>Contact</Link>
          </div>
          <div className={styles['social-media']}>
            <Link href='#'>
              <span style={{ fontSize: '1.5rem' }}>
                <MdFacebook />
              </span>
            </Link>
            <Link href='#' className={styles['fab fa-twitter']}>
              <span style={{ fontSize: '1.5rem' }}>
                <FaTwitter />
              </span>
            </Link>
            <Link href='/instagram' className={styles['fab fa-instagram']}>
              <span style={{ fontSize: '1.5rem' }}>
                <FaInstagram />
              </span>
            </Link>
          </div>
        </div>
        <div className={styles['copyright-terms']}>
          <div className={styles['copyright']}>@Copyright Agermax {currentYear}</div>
          <div className={styles['terms-privacy']}>
            <Link href=''>Terms</Link>
            <Link href=''>Privacy Policy</Link>
            <Link href=''>Cookies</Link>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
