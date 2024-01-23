import React from 'react'
import styles from './SearchBar.module.css'
import { GridSearchIcon } from '@mui/x-data-grid'

const SearchBar = () => {
  return (
    <div className={styles.searchBar}>
      <GridSearchIcon />
      <input className={styles.searchInputField} type='search' name='' id='' placeholder='Search Event' />
    </div>
  )
}

export default SearchBar
