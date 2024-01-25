import React from 'react'
import styles from './TabButton.module.css'

const TabButton = ({ children, className, buttonStyle, onClick, id }) => {
  return (
    <button id={id} onClick={onClick} style={buttonStyle} className={`${styles.tab} ${className}`}>
      {children}
    </button>
  )
}

export default TabButton
