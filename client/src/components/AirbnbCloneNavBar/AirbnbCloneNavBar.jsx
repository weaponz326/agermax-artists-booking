import React, { useEffect, useLayoutEffect, useRef, useState } from 'react'
// import logo from '../../assets/react.svg'
import styles from './AirbnbCloneNavBar.module.css'
import { Global, HambergerMenu, ProfileCircle, SearchNormal, SearchNormal1 } from 'iconsax-react'
import Link from 'next/link'

const AirbnbCloneNavBar = () => {
  const headerRef = useRef()
  const [shouldStick, setShouldStick] = useState(false)

  useEffect(() => {
    const handleScroll = e => {
      console.log('Scroll Y', window.scrollY)
      setShouldStick(() => window.scrollY >= 1)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.addEventListener('scroll', handleScroll)
  }, [shouldStick])

  // console.log({ shouldStick });

  return (
    <header ref={headerRef} className={`${styles.header} ${shouldStick ? styles.headerSticky : ''}`}>
      <div className={styles.headerWrapper}>
        <div className={styles.headerInner}>
          <div className={styles.logoContainer}>
            <Link href='/'>
              <img src='/images/logo.png' alt='Agermax-logo' />
            </Link>
          </div>
          <MiddleContainer />
          <div className={styles.rightSide}>
            <div className={styles.links}>
              <a href='#'>Agermax, Artists Home </a>
              <a href='#'>
                <Global size='1.2rem' />
              </a>
            </div>
            <div className={styles.hamberger}>
              <HambergerMenu size='25' />
              <ProfileCircle size='32' />
            </div>
          </div>
        </div>
      </div>
    </header>
  )
}

const MiddleContainer = () => {
  return (
    <div className={styles.middleWrapper}>
      <div className={styles.middleWrapperInner}>
        <div className={styles.links}>
          <a href='#'>Stays</a>
          <a href='#'>Experiences</a>
          <a href='#'>Online Experiences</a>
        </div>
        <div className={styles.formWrapper}>
          <MiddleForm />
          <MiddleFormMini />
        </div>
      </div>
    </div>
  )
}

const MiddleFormMini = () => {
  const formItems = [
    {
      label: 'Anywhere'
    },
    {
      label: 'Any week'
    },
    {
      label: 'Add guests'
    }
  ]

  return (
    <div className={styles.middleFormMini}>
      {formItems.map((item, index) => (
        <MiddleFormItemMini key={`item-mini-${index}`} label={item.label} />
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

const MiddleForm = () => {
  const [selectedItem, setSelectedItem] = useState(null)
  const formItems = [
    {
      label: 'Where',
      placeholder: 'Search destinations',
      isInput: true
    },
    {
      label: 'Check in',
      placeholder: 'Add dates',
      isInput: false
    },
    {
      label: 'Check out',
      placeholder: 'Add dates',
      isInput: false
    },
    {
      label: 'Who',
      placeholder: 'Add guests',
      isInput: false,
      isSearch: true
    }
  ]

  useEffect(() => {
    const handleBlur = e => {
      if (selectedItem === null) return
      if (!e.target.closest('#middle-form')) {
        setSelectedItem(null)
      }
    }

    window.addEventListener('click', handleBlur)
    return () => window.removeEventListener('click', handleBlur)
  }, [selectedItem])

  return (
    <div id='middle-form' className={`${styles.middleForm} ${selectedItem !== null ? styles.middleFormHighlight : ''}`}>
      {formItems.map((item, index) => (
        <MiddleFormItem
          onSelect={() => setSelectedItem(index)}
          focus={selectedItem === index}
          key={`form-item-${index}`}
          {...item}
        />
      ))}
      <button className={`${styles.searchButton} ${selectedItem !== null ? styles.searchButtonLoose : ''}`}>
        <div className={styles.searchButtonInner}>
          <SearchNormal1 size={20} />
          <span>Search</span>
        </div>
      </button>
    </div>
  )
}

const MiddleFormItem = ({ onSelect, label, isSearch, isInput = false, focus = false, placeholder }) => {
  return (
    <div onClick={onSelect} className={`${styles.middleFormItem} ${focus ? styles.middleFormItemFoucs : ''}`}>
      <div className={styles.middleFormItemInfo}>
        <label>{label}</label>
        {focus && isInput ? (
          <input type='text' autoFocus={true} placeholder={placeholder} />
        ) : (
          <span>{placeholder}</span>
        )}
      </div>
    </div>
  )
}

export default AirbnbCloneNavBar
