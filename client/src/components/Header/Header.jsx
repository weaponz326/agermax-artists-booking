import Navbar from '../Navbar/Navbar'
import HeaderCarouselContainer from '../HeaderCarouselContainer/HeaderCarouselContainer'
import styles from './header.module.css'
import TabButton from '../AdminPagesSharedComponents/ViewTab/TabButton'
import Link from 'next/link'
export default function Header({ artistsList, isLoggedIn, setIsLoggedIn }) {
  const renderedItem = !isLoggedIn ? (
    <Link href='/register'>
      <TabButton className={styles.joinAgermaxButton}>Join Agermax Today</TabButton>
    </Link>
  ) : (
    <div>
      <h2>Welcome, John Doe</h2>
      <p className={styles['greetings-message']}>Book amazing artists for your next events</p>
    </div>
  )

  return (
    <header className={styles['header']}>
      <div className={styles['header-background']}>
        <div className={styles['greetings']}>
          <div>{renderedItem}</div>
        </div>
      </div>
      <HeaderCarouselContainer
        layout={styles['header-carousel-layout']}
        className={styles['header-carousel']}
        artistsList={artistsList}
        // className={styles["header-carousel"]}
      />
    </header>
  )
}
