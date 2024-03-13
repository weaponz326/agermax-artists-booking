import HeaderCarouselContainer from '../HeaderCarouselContainer/HeaderCarouselContainer'
import styles from './header.module.css'
import TabButton from '../AdminPagesSharedComponents/ViewTab/TabButton'
import Link from 'next/link'
import { getAllArtists } from 'src/services/artists'
import { useArtists } from 'src/providers/ArtistsProvider'
import { useAuth } from 'src/hooks/useAuth'
import { useEffect, useState } from 'react'
export default function Header() {
  const { user } = useAuth()
  const [displayedArtists, setDisplayedArtists] = useState(null)
  const { artists } = useArtists()

  useEffect(() => {
    if (!artists) {
      return // No need to proceed if artists array is empty
    }

    // Shuffle the artists array
    const shuffledArtists = [...artists].sort(() => Math.random() - 0.5)

    // Select the first 6 items
    const selectedItems = shuffledArtists.slice(0, 6)

    setDisplayedArtists(selectedItems)
  }, [artists])

  const renderedItem = !user ? (
    <Link href='/register'>
      <TabButton className={styles.joinAgermaxButton}>Join Agermax Today</TabButton>
    </Link>
  ) : (
    <div>
      <h2>
        Welcome, {user?.firstName || 'Friend'} {user?.lastName || ''}
      </h2>
      <p className={styles['greetings-message']}>Book amazing Performers for your next events.</p>
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
        artists={displayedArtists}
      />
    </header>
  )
}
