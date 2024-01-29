import React, { Fragment, useEffect, useRef, useState } from 'react'
import styles from './AirbnbCloneNavBar.module.css'
import { formItems } from './config/headerFormConfig'
import { useHeaderContext } from '../../providers/headerProvider'
import { SearchNormal1 } from 'iconsax-react'
import CustomizedDropdown from '../Dropdown/CustomizedDropDown'

const AirbnbCloneNavBar = () => {
  const headerRef = useRef()
  const [shouldStick, setShouldStick] = useState(true)
  const { hideMiddleForm, setHideMiddleForm } = useHeaderContext()

  useEffect(() => {
    const handleScroll = () => {
      setHideMiddleForm(true)
    }
    window.addEventListener('scroll', handleScroll)

    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [hideMiddleForm])

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
            <CustomizedDropdown />
          </div>
        </div>
      </div>
    </header>
  )
}

const MiddleContainer = ({ setHideMiddleForm }) => {
  const { hideMiddleForm } = useHeaderContext()
  const [selectedFormItems, setSelectedFormItems] = useState(formItems.stays)

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
      pointer: 'destination'
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
  const [filter, setFilter] = useState('')
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
    const DropdownContent = item.dropdownContent

    return (
      <Fragment key={`middle-form-item-${item.label}`}>
        <div
          onClick={() => setSelectedFormItem(key)}
          className={`
        ${styles.middleFormItem}
        ${focus ? styles.middleFormItemFocus : ''}
      `}
        >
          <div className={styles.middleFormItemInfo}>
            <label>{item.label}</label>
            {focus && item.isInput ? (
              <input
                value={filter}
                type='text'
                autoFocus={true}
                placeholder={item.placeholder}
                onChange={({ target: { value } }) => setFilter(value)}
              />
            ) : (
              <span>{item.placeholder}</span>
            )}
          </div>
        </div>
        {focus && <DropdownContent filter={filter} />}
      </Fragment>
    )
  }

  return <div className={styles.middleFormItemWrapper}>{...handleRenderItem()}</div>
}

export default AirbnbCloneNavBar
