import React, { useRef, useState } from 'react'
import styles from './SearchBar.module.css'
import { GridSearchIcon } from '@mui/x-data-grid'

const SearchBar = ({ usersList, setUsersList, usersData, query, setQuery }) => {
  const searchInputRef = useRef()

  // Filter the list of users based on the query input by the user

  function handleQueryChange(e) {
    setQuery(e.target.value)
    if (query === '') {
      setUsersList(usersData)
    } else {
      const filteredList = usersData.filter(
        users =>
          users.firstName.toLowerCase().includes(query.toLocaleLowerCase()) ||
          users.lastName.toLowerCase().includes(query.toLocaleLowerCase())
      )
      setUsersList(filteredList)
    }
  }

  return (
    <div className={styles.searchBar}>
      <GridSearchIcon />
      <input
        onChange={handleQueryChange}
        className={styles.searchInputField}
        type='search'
        name=''
        id=''
        placeholder='Search Event'
        value={query}
      />
    </div>
  )
}

export default SearchBar
