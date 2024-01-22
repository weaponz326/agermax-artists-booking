import { useEffect, useRef } from 'react'
import { useDropdownContext } from '../../providers/dropdownProvider'
import styles from './dropdown.module.css'

export const DropdownController = ({ children, items }) => {
  const ref = useRef()
  const { showDropdown } = useDropdownContext()

  const handleShowDropdown = () => {
    const position = ref.current.getBoundingClientRect()
    showDropdown({ position, items })
  }

  return (
    <div onClick={handleShowDropdown} ref={ref}>
      {children}
    </div>
  )
}

export const DropdownBubble = () => {
  const bubbleRef = useRef()
  const { config, closeDropdown } = useDropdownContext()

  useEffect(() => {
    const handleClick = e => {
      if (config === null) return
      const closest = e.target.closest('#dropdown-bubble')
      if (!closest) closeDropdown()
    }

    window.addEventListener('mousedown', handleClick)

    return () => window.removeEventListener('mousedown', handleClick)
  }, [config])

  const getPositionConfig = () => {
    if (config == null || bubbleRef.current == null) return {}

    const { position } = config

    const { width: bubbleWidth, height: bubbleHeight } = bubbleRef.current.getBoundingClientRect()

    let left,
      right,
      bottom,
      top = null

    if (window.innerHeight - position.bottom < bubbleHeight) {
      bottom = window.innerHeight - position.bottom
    }

    if (position.top < bubbleHeight) {
      top = position.bottom + 5
    }

    if (window.innerWidth - position.right < bubbleWidth) {
      right = window.innerWidth - position.right
    }

    if (position.left < bubbleWidth) {
      left = position.left
    }

    return { top, left, right, bottom }
  }

  return (
    <div
      ref={bubbleRef}
      id='dropdown-bubble'
      style={{ ...getPositionConfig() }}
      className={styles.dropdownBubbleWrapper}
    >
      <div className={styles.dropdownBubble}>
        {config &&
          config.items.map((item, index) => (
            <a href={item.href} key={`dropdown-item-${index}`}>
              {item.label}
            </a>
          ))}
      </div>
    </div>
  )
}
