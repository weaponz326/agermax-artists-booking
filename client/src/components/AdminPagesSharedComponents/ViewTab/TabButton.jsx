import React from 'react'
import styles from './TabButton.module.css'

const TabButton = ({ children, className, buttonStyle }) => {
  return (
    <button style={buttonStyle} className={`${styles.tab} ${className}`}>
      {children}
    </button>
  )
}

export default TabButton
