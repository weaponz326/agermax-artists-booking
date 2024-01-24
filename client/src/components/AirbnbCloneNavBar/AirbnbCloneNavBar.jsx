import React, { useEffect, useLayoutEffect, useRef, useState } from 'react'
import styles from './AirbnbCloneNavBar.module.css'
import { formItems } from '../../configs/headerFormConfig'
import { useHeaderContext } from '../../providers/headerProvider'
import { Global, HambergerMenu, ProfileCircle, SearchNormal1 } from 'iconsax-react'
import { DropdownController } from '../Dropdown/DropDown'
import CustomizedDropdown from '../Dropdown/CustomizedDropDown'

const AirbnbCloneNavBar = () => {
  const headerRef = useRef()
  const [shouldStick, setShouldStick] = useState(true)
  const { toggleHideMiddleForm, hideMiddleForm, setHideMiddleForm, setSelectedFormItem } = useHeaderContext()
  const [initialScroll, setInitialScroll] = useState(-1)
  const [newScroll, setNewScroll] = useState(0)
  const [isScrolled, setIsScrolled] = useState(false)
  const [isLoggedIn, setIsLoggedIn] = useState(false)

  const profileMenuItems = [
    { label: 'Sign Up', href: '/' },
    { label: 'Log In', href: '/' },
    { label: 'Gift Cards', href: '/' },
    { label: 'Agermax, Artists home', href: '/' },
    { label: 'Help center', href: '/' }
  ]

  useEffect(() => {}, [])

  return (
    <header
      ref={headerRef}
      className={`
        ${styles.header}
        ${shouldStick ? styles.headerSticky : ''}
        ${hideMiddleForm ? styles.shrinkBottomPadding : ''}
      `}
    >
      <div className={styles.headerWrapper}>
        <div className={styles.headerInner}>
          <div className={styles.logoContainer}>
            <a href='/'>
              <img src='/images/logo.png' alt='Agermax-logo' />
            </a>
          </div>
          <MiddleContainer setHideMiddleForm={setHideMiddleForm} />
          <div className={styles.rightSide}>
            <div className={styles.links}>
              <CustomizedDropdown isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />
            </div>
          </div>
        </div>
      </div>
    </header>
  )
}

const MiddleContainer = ({ setHideMiddleForm }) => {
  const { hideMiddleForm } = useHeaderContext()
  const [selectedFormItems, setSelectedFormItems] = useState(formItems.stays)
  // console.log(hideMiddleForm)
  useEffect(() => {
    const handleOutsideClick = event => {
      if (navSearchBarRef.current && !navSearchBarRef.current.contains(event.target)) {
        setHideMiddleForm(true)
      } else {
        setHideMiddleForm(false)
      }
    }
    document.addEventListener('click', handleOutsideClick)
    return () => {
      document.removeEventListener('click', handleOutsideClick)
    }
  }, [])
  const navSearchBarRef = useRef()
  return (
    <div className={`${styles.middleWrapper} ${hideMiddleForm ? styles.hideForm : ''}`}>
      <div ref={navSearchBarRef} className={styles.middleWrapperInner}>
        <div className={styles.links}>
          <a href='#' onClick={() => setSelectedFormItems(formItems.stays)}>
            Stays
          </a>
          <a href='#' onClick={() => setSelectedFormItems(formItems.experiences)}>
            Experiences
          </a>
          <a href='#'>Online Experiences</a>
        </div>
        <div id='middle-form' className={styles.formWrapper}>
          <MiddleForm formItems={selectedFormItems} />
          <MiddleFormMini setHideMiddleForm={setHideMiddleForm} />
        </div>
      </div>
    </div>
  )
}

const MiddleFormMini = ({ setHideMiddleForm }) => {
  const { toggleHideMiddleForm, setSelectedFormItem } = useHeaderContext()

  const formItems = [
    {
      label: 'Anywhere',
      pointer: 'desitnation'
    },
    {
      label: 'Any week',
      pointer: 'date'
    },
    {
      label: 'Add guests',
      pointer: 'guests'
    }
  ]

  const handleToggleForm = pointer => {
    setHideMiddleForm(false)
    setSelectedFormItem(pointer)
  }

  return (
    <div className={styles.middleFormMini}>
      {formItems.map((item, index) => (
        <MiddleFormItemMini
          onSelect={() => handleToggleForm(item.pointer)}
          key={`item-mini-${index}`}
          label={item.label}
        />
      ))}
    </div>
  )
}

const MiddleFormItemMini = ({ onSelect, label }) => {
  return (
    <div onClick={onSelect} className={styles.middleFormItemMini}>
      <label>{label}</label>
    </div>
  )
}

const MiddleForm = ({ formItems }) => {
  const { selectedFormItem, setSelectedFormItem } = useHeaderContext()

  useEffect(() => {
    const handleBlur = e => {
      if (selectedFormItem === null) return
      if (!e.target.closest('#middle-form')) {
        setSelectedFormItem(null)
      }
    }

    window.addEventListener('click', handleBlur)
    return () => window.removeEventListener('click', handleBlur)
  }, [selectedFormItem])

  return (
    <div className={`${styles.middleForm} ${selectedFormItem !== null ? styles.middleFormHighlight : ''}`}>
      {Object.keys(formItems).map((key, index) => {
        const config = formItems[key]

        return <MiddleFormItem key={`form-item-${index}`} config={config} pointer={key} />
      })}

      <button
        className={`
        ${styles.searchButton}
        ${selectedFormItem !== null ? styles.searchButtonLoose : ''}
      `}
      >
        <div className={styles.searchButtonInner}>
          <SearchNormal1 size={20} />
          <span>Search</span>
        </div>
      </button>
    </div>
  )
}

const MiddleFormItem = ({ pointer, config }) => {
  const { selectedFormItem, setSelectedFormItem } = useHeaderContext()

  const handleRenderItem = () => {
    if (Array.isArray(config)) {
      return config.map((item, index) => renderItem(item, `${pointer}-${index}`))
    }

    return [renderItem(config, pointer)]
  }

  const renderItem = (item, key) => {
    const value = Array.isArray(config)
      ? selectedFormItem === pointer
        ? `${selectedFormItem}-0`
        : selectedFormItem
      : selectedFormItem

    const focus = key === value

    return (
      <div
        onClick={() => setSelectedFormItem(key)}
        key={`middle-form-item-${item.label}`}
        className={`
        ${styles.middleFormItem}
        ${focus ? styles.middleFormItemFoucs : ''}
      `}
      >
        <div className={styles.middleFormItemInfo}>
          <label>{item.label}</label>
          {focus && item.isInput ? (
            <input type='text' autoFocus={true} placeholder={item.placeholder} />
          ) : (
            <span>{item.placeholder}</span>
          )}
        </div>
      </div>
    )
  }

  return <div className={styles.middleFormItemWrapper}>{...handleRenderItem()}</div>
}

export default AirbnbCloneNavBar
