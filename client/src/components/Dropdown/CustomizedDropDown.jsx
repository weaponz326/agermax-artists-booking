import React from 'react'
import { Button, Dropdown } from 'antd'
import { HambergerMenu, User } from 'iconsax-react'
import Link from 'next/link'
import styles from './CustomizedDropdown.module.css'
import TabButton from '../AdminPagesSharedComponents/ViewTab/TabButton'
// import { useAuth } from 'src/providers/AuthProvider'

import { useRouter } from 'next/router'

const isLoggedInItems = [
  {
    key: '1',
    label: <a href='/artists'>Book Artists</a>
  },
  {
    key: '2',
    label: <a href='/admin/account'>Account</a>
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
  color: '#183d4c',
  border: '0.5px solid #183d4c'
}

const CustomizedDropdown = ({ className, user, logout }) => {
  // const { isLoggedIn, setIsLoggedIn, login, logout } = useAuth()
  // const accessToken = window.localStorage.getItem(authConfig.storageTokenKeyName)
  const router = useRouter()
  const onClick = ({ key }) => {
    if (key === '5') logout()
  }

  if (user) {
    return (
      <div>
        <Dropdown
          menu={{
            items: isLoggedInItems,
            onClick
          }}
          placement='topRight'
          arrow={{
            pointAtCenter: false
          }}
        >
          <Button style={buttonStyle} className={styles.userMenuButton}>
            <div className={styles.userImageContainer}>
              <div className={styles.userOnlineIndicator}></div>
              <img className={styles.userImage} src='/images/ellipse-121.png' alt='user-image' />
            </div>
            <HambergerMenu size={'35'} />
          </Button>
        </Dropdown>
      </div>
    )
  } else {
    return (
      <div className={`${styles.userActionsButtons} ${className}`}>
        <TabButton className={styles.userMenuSignInButton} onClick={() => router.push('/login')}>
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
