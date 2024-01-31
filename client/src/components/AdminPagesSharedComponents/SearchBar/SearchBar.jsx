import React, { useRef, useState } from 'react'
import styles from './SearchBar.module.css'
import { GridSearchIcon } from '@mui/x-data-grid'

const SearchBar = ({
  usersList,
  setUsersList,
  usersData,
  query,
  setQuery,
  className,
  placeholder,
  wrapperClassName
}) => {
  const searchInputRef = useRef()

  // Filter the list of users based on the query input by the user

  function handleQueryChange(e) {
    setQuery(e.target.value)
    if (query === '') {
      setUsersList(usersData)
    } else {
      const filteredList = usersData.filter(
        users =>
          users.firstName.toLowerCase().includes(query.toLowerCase()) ||
          users.lastName.toLowerCase().includes(query.toLowerCase())
      )
      setUsersList(filteredList)
    }
  }

  return (
    <div className={wrapperClassName ? wrapperClassName : styles.searchBar}>
      <GridSearchIcon />
      <input
        onChange={handleQueryChange}
        className={`${styles.searchInputField} ${className}`}
        type='search'
        name=''
        id=''
        placeholder={placeholder ? placeholder : 'Search User'}
        value={query}
      />
    </div>
  )
}

export default SearchBar
