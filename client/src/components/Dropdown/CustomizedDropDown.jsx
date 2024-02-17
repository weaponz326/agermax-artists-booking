import React from 'react'
import { Button, Dropdown } from 'antd'
import { HambergerMenu, User } from 'iconsax-react'
import Link from 'next/link'
import styles from './CustomizedDropdown.module.css'
import TabButton from '../AdminPagesSharedComponents/ViewTab/TabButton'
import { Avatar, Space } from 'antd'
import { AntDesignOutlined, UserOutlined } from '@ant-design/icons'

// import { useAuth } from 'src/providers/AuthProvider'

import { useRouter } from 'next/router'

const CustomizedDropdown = ({ className, user, logout }) => {
  const UserAccountLink = () => {
    if (user.role === 'artist') return <Link href='admin/home/artist'>My Account</Link>
    if (user.role === 'admin') return <Link href='admin/home/admin'>My Account</Link>
    if (user.role === 'organizer') return <Link href='admin/home/organizer'>My Account</Link>
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
              <div className={styles.userImage}>
                {user.profilePhoto ? user.profilePhoto : <Avatar icon={<UserOutlined size={36} />} />}
              </div>
              {/* <img
                className={styles.userImage}
                src={user.profilePhoto ? user.profilePhoto : <Avatar size={64} icon={<UserOutlined />} />}
                // src={user.profilePhoto ? user.profilePhoto : '/images/ellipse-121.png'}
                alt='user'
              /> */}
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
