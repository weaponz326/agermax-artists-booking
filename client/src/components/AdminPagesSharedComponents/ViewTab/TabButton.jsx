import React from 'react'
import styles from './TabButton.module.css'
import classNames from 'classnames'

const TabButton = ({ children, className, buttonStyle, onClick, id }) => {
  const combinedClassNames = classNames(className, styles.tab) // Reversed order

  return (
    <button id={id} onClick={onClick} style={buttonStyle} className={combinedClassNames}>
      {children}
    </button>
  )
}

export default TabButton
