import React, { useRef, useState } from 'react'
import styles from './SearchBar.module.css'
import { GridSearchIcon } from '@mui/x-data-grid'

const SearchBar = ({ value, className, placeholder, wrapperClassName, onChange, onClick, style, onClickWrapper }) => {
  const searchInputRef = useRef()

  // Filter the list of users based on the query input by the user

  return (
    <div onClick={onClickWrapper} style={style} className={wrapperClassName ? wrapperClassName : styles.searchBar}>
      <GridSearchIcon />
      <input
        onChange={onChange}
        className={`${styles.searchInputField} ${className}`}
        type='search'
        name=''
        id=''
        placeholder={placeholder ? placeholder : 'Search User'}
        value={value}
        onClick={onClick}
      />
    </div>
  )
}

export default SearchBar
