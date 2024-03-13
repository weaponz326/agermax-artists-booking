import React, { useRef, useState } from 'react'
import styles from './SearchBar.module.css'
import { GridSearchIcon } from '@mui/x-data-grid'

const SearchBar = ({
  name,
  value,
  className,
  placeholder,
  wrapperClassName,
  onChange,
  onClick,
  style,
  onClickWrapper,
  id,
  slot
}) => {
  const searchInputRef = useRef()

  // Filter the list of users based on the query input by the user

  return (
    <div onClick={onClickWrapper} style={style} className={wrapperClassName ? wrapperClassName : styles.searchBar}>
      <GridSearchIcon />
      <input
        onChange={onChange}
        className={`${styles.searchInputField} ${className}`}
        type='search'
        name={name ? name : ''}
        id={id ? id : ''}
        placeholder={placeholder ? placeholder : 'Search User'}
        value={value ? value : ''}
        onClick={onClick}
      />
      {slot && slot}
    </div>
  )
}

export default SearchBar
