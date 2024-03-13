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
export default function Header() {
  const { user } = useAuth()
  const [displayedArtists, setDisplayedArtists] = useState([])
  const [performersList, setPerformersList] = useState([])
  const { artists } = useArtists()
  const options = [
    { value: 'Kofi', fullName: 'kofi' },
    { value: 'Ama', fullName: 'kofi' }
  ]

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
    console.log(performersList)
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
          <div>{renderedItem}</div>
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
              label: <PerformersDropdownDisplay artist={artist} />
            }))}
            placeholder='Search Performer'
            filterOption={filterOption}
            onSelect={performer => handleSelectPerformer(performer)}
            id={0}
            // onClear={handleClear}
            // ref={selectArtistRef}
          />
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
