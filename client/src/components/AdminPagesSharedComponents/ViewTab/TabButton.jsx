import React from 'react'
import styles from './TabButton.module.css'
import classNames from 'classnames'

const TabButton = ({ children, className, buttonStyle, onClick, id }) => {
  const combinedClassNames = classNames(styles.tab, className) // Reversed order

  return (
    <button id={id} onClick={onClick} style={buttonStyle} className={className ? className : styles.tab}>
      {children}
    </button>
  )
}

export default TabButton
