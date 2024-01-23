import React from 'react'
import styles from './Tab.module.css'

const Tab = ({ children, className }) => {
  return <button className={`${styles.tab} ${className}`}>{children}</button>
}

export default Tab
