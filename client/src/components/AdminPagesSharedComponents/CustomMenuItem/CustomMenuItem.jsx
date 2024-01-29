import React, { useState } from 'react'

const CustomMenuItem = ({ label, subMenuItems }) => {
  const [isSubMenuVisible, setSubMenuVisible] = useState(false)

  const handleToggleSubMenu = () => {
    setSubMenuVisible(!isSubMenuVisible)
  }

  return (
    <div>
      <div onClick={handleToggleSubMenu}>
        <span>{label}</span>
        <span>{isSubMenuVisible ? ' -' : ' +'}</span>
      </div>

      {isSubMenuVisible && (
        <ul>
          {subMenuItems.map((item, index) => (
            <li key={index}>{item}</li>
          ))}
        </ul>
      )}
    </div>
  )
}

const YourComponent = () => {
  return (
    <div>
      <CustomMenuItem label='Item 1' subMenuItems={['Subitem 1', 'Subitem 2', 'Subitem 3']} />
      <CustomMenuItem label='Item 2' subMenuItems={['Subitem 4', 'Subitem 5']} />
    </div>
  )
}

export default YourComponent
