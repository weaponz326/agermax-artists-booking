import HeaderCarouselContainer from '../HeaderCarouselContainer/HeaderCarouselContainer'
import styles from './header.module.css'
import TabButton from '../AdminPagesSharedComponents/ViewTab/TabButton'
import Link from 'next/link'
import { getAllArtists } from 'src/services/artists'
import { useArtists } from 'src/providers/ArtistsProvider'
import { useAuth } from 'src/hooks/useAuth'
import { useEffect, useState } from 'react'
import SearchBar from '../AdminPagesSharedComponents/SearchBar/SearchBar'
import { AutoComplete } from 'antd'
import { PerformersDropdownDisplay } from '../Navbar/Navbar'
import { useRouter } from 'next/router'
export default function Header() {
  const router = useRouter()
  const { user } = useAuth()
  const [displayedArtists, setDisplayedArtists] = useState([])
  const [performersList, setPerformersList] = useState([])
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
    setPerformersList(shuffledArtists)
  }, [artists])

  const handleSelectPerformer = performer => {
    console.log(performer)
  }

  const filterOption = (inputValue, option) => {
    return option.value.toLowerCase().includes(inputValue.toLowerCase())
  }
  return (
    <header className={styles['header']}>
      <div className={styles['header-background']}>
        <div className={styles['greetings']}>
          {!user ? (
            <div className={styles.greetingsWrapper}>
              <h4 className={styles.headerMessage}>Welcome to Agermax.</h4>
              <h2 className={styles.headerMessage}>Everything you need for entertainment, now in one place.</h2>
              <p className={styles.headerMessage}>
                Take control of your entertainment management with our cutting-edge portal.
              </p>
              <Link href='/register'>
                <TabButton className={styles.joinAgermaxButton}>Join now-it’s FREE</TabButton>
              </Link>
            </div>
          ) : (
            <div className={styles.greetingsWrapper}>
              <h2>
                Welcome, {user?.firstName || 'Friend'} {user?.lastName || ''}
              </h2>
              <p className={styles.headerMessage}>Book amazing Performers for your next events.</p>
            </div>
          )}
        </div>
        <AutoComplete
          autoFocus
          // onClick={e => setActiveInputTab(0)}
          // onChange={e => setActiveInputTab(1)}
          className={`${styles.collapsedStateSearchBarWrapper} `}
          popupMatchSelectWidth={false}
          allowClear
          notFoundContent='Sorry, no performers found'
          variant='borderless'
          options={performersList.map(artist => ({
            artistID: artist._id,
            value: `${artist.firstName} ${artist.lastName}`,
            label: <PerformersDropdownDisplay artist={artist} onClick={() => router.push(`/artists/${artist._id}`)} />
          }))}
          placeholder='Search Performer'
          filterOption={filterOption}
          onSelect={performer => handleSelectPerformer(performer)}
          id={0}
          // onClear={handleClear}
          // ref={selectArtistRef}
        />
      </div>
      <HeaderCarouselContainer
        layout={styles['header-carousel-layout']}
        className={styles['header-carousel']}
        artists={displayedArtists}
      />
    </header>
  )
}
