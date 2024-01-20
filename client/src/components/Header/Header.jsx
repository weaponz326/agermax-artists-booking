import Navbar from '../Navbar/Navbar'
import HeaderCarouselContainer from '../HeaderCarouselContainer/HeaderCarouselContainer'
import styles from './header.module.css'
export default function Header({ artistsList }) {
  if (!artistsList.length) return null
  return (
    <header className={styles['header']}>
      <div className={styles['header-background']}>
        <div className={styles['greetings']}>
          <div>
            <p className={styles['greetings-hi']}>Hey John!&nbsp;&nbsp;👋</p>
            <p className={styles['greetings-message']}>Book amazing artists for your next events</p>
          </div>
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
