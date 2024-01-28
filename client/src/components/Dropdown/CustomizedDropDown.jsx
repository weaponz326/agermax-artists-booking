import React from 'react'
import { Button, Dropdown } from 'antd'
import UserIcon from 'src/layouts/components/UserIcon'
import { HambergerMenu, User } from 'iconsax-react'
import Link from 'next/link'
import styles from './CustomizedDropdown.module.css'
import TabButton from '../AdminPagesSharedComponents/ViewTab/TabButton'

const isNotLoggedInItems = [
  {
    key: '1',
    label: <a href='#'>Log In</a>
  },
  {
    key: '2',
    label: <a href='/signup'>Sign Up</a>
  },
  {
    key: '3',
    label: <a href='#'>Gift Cards</a>
  },
  {
    key: '4',
    label: <a href='/about'>About Agermax</a>
  },
  {
    key: '5',
    label: <a href='#'>Help Center</a>
  }
]

const isLoggedInItems = [
  {
    key: '1',
    label: <a href='/artists'>Book Artists</a>
  },
  {
    key: '2',
    label: <a href='/admin/bookings'>Account</a>
  },
  {
    key: '3',
    label: <a href='#'>View Events</a>
  },
  {
    key: '4',
    label: <a href='#'>Help Center</a>
  },
  {
    key: '5',
    label: <a href='#'>Log Out</a>
  }
]

const buttonStyle = {
  display: 'flex',
  alignItems: 'center',
  gap: '0.5rem',
  padding: '1.5rem 0.7rem',
  borderRadius: '1.5rem',
  justifyContent: 'space-between',
  zIndex: '1000',
  width: 'max-content',
  color: '#183d4c',
  border: '0.5px solid #183d4c'
}

const CustomizedDropdown = ({ isLoggedIn, setIsLoggedIn }) => {
  if (isLoggedIn) {
    const onClick = ({ key }) => {
      if (key === '5') {
        setIsLoggedIn(false)
      }
    }
    return (
      <>
        <Dropdown
          menu={{
            items: isLoggedInItems,
            onClick
          }}
          placement='topRight'
          arrow={{
            pointAtCenter: true
          }}
        >
          <Button style={buttonStyle} className={styles.userMenuButton}>
            <div className={styles.userImageContainer}>
              <div className={styles.userOnlineIndicator}></div>
              <img className={styles.userImage} src='/images/ellipse-121.png' alt='' />
            </div>
            <HambergerMenu size={'35'} />
          </Button>
        </Dropdown>
      </>
    )
  } else {
    const onClick = ({ key }) => {
      console.log({ key })
      if (key === '1') {
        setIsLoggedIn(true)
      }
    }
    return (
      <div className={styles.userActionsButtons}>
        <TabButton className={styles.userMenuSignInButton} onClick={() => setIsLoggedIn(true)}>
          Sign In
        </TabButton>
        <Link href={'/register'}>
          <TabButton className={styles.userMenuSignUpButton}>Sign Up</TabButton>
        </Link>
      </div>
    )
  }
}
export default CustomizedDropdown
