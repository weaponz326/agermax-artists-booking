import React from 'react'
import { Button, Dropdown } from 'antd'
import { HambergerMenu, User } from 'iconsax-react'
import Link from 'next/link'
import styles from './CustomizedDropdown.module.css'
import TabButton from '../AdminPagesSharedComponents/ViewTab/TabButton'
// import { useAuth } from 'src/providers/AuthProvider'

import { useRouter } from 'next/router'

const CustomizedDropdown = ({ className, user, logout }) => {
  console.log(user)
  const UserAccountLink = () => {
    if (user.role === 'artist') return <Link href='admin/home/artist'>Artist Account</Link>
    if (user.role === 'admin') return <Link href='admin/home/admin'>Admin Account</Link>
    if (user.role === 'organizer') return <Link href='admin/home/organizer'>Organizer Account</Link>
  }

  const isLoggedInItems = [
    {
      key: '1',
      label: <Link href='/artists'>Book Artists</Link>
    },
    {
      key: '2',
      label: <UserAccountLink />
    },
    {
      key: '3',
      label: <Link href='#'>View Events</Link>
    },
    {
      key: '4',
      label: <Link href='#'>Help Center</Link>
    },
    {
      key: '5',
      label: <Link href='/'>Log Out</Link>
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
