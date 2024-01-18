import Link from 'next/link'
import styles from './AirbnbCloneNavBar.module.css' // Create this file for styling

const AirbnbCloneNavBar = () => {
  return (
    <nav className={styles.navbar}>
      <div className={styles.logo}>
        <Link href='/'>
          <p>Airbnb</p>
        </Link>
      </div>
      <div className={styles.links}>
        <Link href='/explore'>
          <p>Explore</p>
        </Link>
        <Link href='/host'>
          <p>Host</p>
        </Link>
        {/* Add more links as needed */}
      </div>
    </nav>
  )
}

export default AirbnbCloneNavBar
