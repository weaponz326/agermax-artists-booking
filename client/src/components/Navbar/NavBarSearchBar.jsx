import { useEffect, useRef, useState } from 'react'
import styles from './navbar.module.css'
import { AutoComplete } from 'antd'

export const NavBarSearchBar = ({ usersData, switchToDatePicker, placeholder, setActiveItem, activeTab }) => {
  const [query, setQuery] = useState('')
  const [artistsList, setArtistsList] = useState([])
  const [filteredArtistsList, setFilteredArtistsList] = useState([])
  const [options, setOptions] = useState([])
  const searchInputRef = useRef()

  useEffect(() => {
    const filteredArtistsList = usersData.filter(user => user.type === 'Artist')
    setArtistsList(filteredArtistsList)
    setFilteredArtistsList(filteredArtistsList)
  }, [usersData])

  useEffect(() => {
    const newOptions = filteredArtistsList.map(
      artist => ({
        value: `${artist.firstName} ${artist.lastName}`,
        label: (
          <div className={styles.artistsListPreview}>
            <div className={styles.searchInputFieldPictureContainer}>
              <img className={styles.searchInputFieldPicture} src={artist.picture} alt='' />
            </div>
            <div>
              <span>{artist.firstName}</span> <span>{artist.lastName}</span>
              <div>{artist.genre}</div>
            </div>
          </div>
        )
      }),
      [query]
    )

    setOptions(newOptions)
  }, [filteredArtistsList])

  const handleQueryChange = value => {
    setQuery(value)

    const filteredList = artistsList.filter(
      artist =>
        artist.firstName.toLowerCase().includes(value.toLowerCase()) ||
        artist.lastName.toLowerCase().includes(value.toLowerCase())
    )

    setFilteredArtistsList(filteredList)
  }

  const handleSelectQuery = e => {
    switchToDatePicker()
    const filteredList = artistsList.filter(
      artist =>
        artist.firstName.toLowerCase().includes(query.toLowerCase()) ||
        artist.lastName.toLowerCase().includes(query.toLowerCase())
    )

    setFilteredArtistsList(filteredList)
  }

  const checkSearchActiveClass = activeTab === searchInputRef.current ? styles.activeTab : null

  return (
    <div
      onClick={e => setActiveItem(searchInputRef.current)}
      onFocus={e => setActiveItem(searchInputRef.current)}
      ref={searchInputRef}
      className={`${styles.searchWrapper} ${checkSearchActiveClass}`}
    >
      <AutoComplete
        // allowClear
        // open={true}
        autoFocus
        options={options}
        popupMatchSelectWidth={false}
        popupClassName='popup'
        // notFoundContent='Sorry, Artist not found!'
        onSelect={e => handleSelectQuery(e)}
        onSearch={handleQueryChange}
        onChange={handleQueryChange} // Add onChange to handle controlled input
        className={styles.searchInputField}
        placeholder={placeholder ? placeholder : 'Search Artist'}
        value={query}
        variant='borderless'
        style={{
          width: 160,
          height: 50
        }}
      />
    </div>
  )
}
