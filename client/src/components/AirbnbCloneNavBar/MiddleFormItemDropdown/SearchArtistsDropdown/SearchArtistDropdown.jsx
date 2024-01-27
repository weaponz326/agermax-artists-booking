import styles from './SearchArtistDropdown.module.css'
import React, { useState, useEffect } from 'react'
import { CircularProgress } from '@mui/material'
import MiddleFormItemDropdown from '../MiddleFormItemDropdown'

const useFetchArtists = filter => {
  const [isLoading, setIsLoading] = useState(false)
  const [artists, setArtists] = useState([])
  const [error, setError] = useState(null)
  let debounceKey = null

  useEffect(() => {
    const fetchArtists = async () => {
      try {
        setIsLoading(true)
        // use [filter] in your search query
        const result = await fetch(`https://api.mockaroo.com/api/7e49e110?count=100&key=15462290`)

        if (result.status === 200) {
          const artistsData = await result.json()
          setArtists(artistsData)
          setError(null)
        } else {
          setError('Failed to get artists')
        }
      } catch (error) {
        console.log(error)
        setError('Something went wrongs')
      }

      setIsLoading(false)
    }

    if (debounceKey) clearTimeout(debounceKey)

    debounceKey = setTimeout(fetchArtists, 1000)

    return () => clearTimeout(debounceKey)
  }, [filter])

  return [artists, isLoading, error]
}

const SearchArtistDropdown = ({ filter }) => {
  if (!filter) return <></>

  const [artists, isLoading, error] = useFetchArtists(filter)

  const renderContent = () => {
    if (isLoading) return <Loader />

    if (error) return <Error />

    return <Content />
  }

  const Error = () => {
    return <p className={styles.error}>{error}</p>
  }

  const Loader = () => {
    return (
      <div style={{ textAlign: 'center' }}>
        <CircularProgress size={20} />
      </div>
    )
  }

  const Content = () => {
    if (artists.length === 0) return <p className={styles.empty}>No artists found</p>

    return (
      <>
        {artists.map((artist, index) => (
          <ArtistListItem artist={artist} key={`artist-list-item-${index}`} />
        ))}
      </>
    )
  }

  return (
    <MiddleFormItemDropdown>
      <div className={styles.artistListWrapper}>
        <div className={styles.artistList}>{renderContent()}</div>
      </div>
    </MiddleFormItemDropdown>
  )
}

const ArtistListItem = ({ artist }) => {
  return (
    <div className={styles.artistListItemWrapper}>
      <div className={styles.artistListItem}>
        <div className={styles.artistListItemImg}>
          <img src={artist.picture} alt='' />
        </div>
        <div className={styles.artistListItemInfo}>
          <h3 className={styles.artistListItemName}>
            {artist.firstName} {artist.lastName}
          </h3>
          <div className={styles.artistListItemGenreWrapper}>
            {artist.genre &&
              artist.genre.split(',').map((genre, index) => (
                <span key={`artist-genre-${index}`} className={styles.artistListItemGenre}>
                  {genre}
                </span>
              ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default SearchArtistDropdown
