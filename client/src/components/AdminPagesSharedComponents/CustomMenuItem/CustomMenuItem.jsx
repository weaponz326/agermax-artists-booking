import { StylesProvider } from '@material-ui/core'
import React, { useState } from 'react'
import styles from './CustomMenuItem.module.css'
import { ExpandLess, ExpandLessRounded, ExpandMoreRounded } from '@material-ui/icons'

const CustomMenuItem = ({ label, subMenuItems, labelClassName, menuContainer }) => {
  const [isSubMenuVisible, setSubMenuVisible] = useState(false)

  const handleToggleSubMenu = () => {
    setSubMenuVisible(!isSubMenuVisible)
  }

  return (
    <div className={styles.customMenuContainerWrapper}>
      <div className={menuContainer} onClick={handleToggleSubMenu}>
        <h3 className={labelClassName}>{label}</h3>
        <span>{isSubMenuVisible ? <ExpandLessRounded /> : <ExpandMoreRounded />}</span>
      </div>

      {isSubMenuVisible && (
        <ul className={styles.listItem}>
          {subMenuItems.map((item, index) => (
            <li className={styles.listItem} key={index}>
              {item}
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}

export default CustomMenuItem
