import React from 'react'
import { Button, Dropdown } from 'antd'
import { HambergerMenu } from 'iconsax-react'
import Link from 'next/link'
import styles from './CustomizedDropdown.module.css'
import TabButton from '../AdminPagesSharedComponents/ViewTab/TabButton'
import { Avatar, Space } from 'antd'
import { UserOutlined } from '@ant-design/icons'
const imageBaseUrl = process.env.NEXT_PUBLIC_PHOTOUPLOAD_URL

// import { useAuth } from 'src/providers/AuthProvider'

import { useRouter } from 'next/router'
import {
  BiCalendarEvent,
  BiHelpCircle,
  BiHome,
  BiLogInCircle,
  BiLogOut,
  BiMicrophone,
  BiSolidDashboard,
  BiUserPlus
} from 'react-icons/bi'

const CustomizedDropdown = ({ className, user, logout }) => {
  const UserAccountLink = ({ children }) => {
    if (user.role === 'artist') return <Link href='admin/home/artist'>{children}</Link>
    if (user.role === 'admin') return <Link href='admin/home/admin'>{children}</Link>
    if (user.role === 'organizer') return <Link href='admin/home/organizer'>{children}</Link>
  }

  const isLoggedInItems = [
    {
      key: '1',
      label: (
        <UserAccountLink>
          <div className={styles.menuItem}>
            <BiSolidDashboard size={20} />
            Dashboard
          </div>
        </UserAccountLink>
      )
    },

    {
      type: 'divider'
    },
    {
      key: '2',
      label: (
        <Link href='/'>
          <div className={styles.menuItem}>
            <BiHome size={20} /> Home
          </div>
        </Link>
      )
    },
    {
      key: '3',
      label: (
        <Link href='/artists'>
          <div className={styles.menuItem}>
            <BiMicrophone size={20} /> Performers
          </div>
        </Link>
      )
    },
    {
      key: '4',
      label: (
        <Link href='/events'>
          <div className={styles.menuItem}>
            <BiCalendarEvent size={20} />
            Events
          </div>
        </Link>
      )
    },
    {
      key: '5',
      label: (
        <Link href='/about'>
          <div className={styles.menuItem}>
            <BiHelpCircle size={20} />
            About
          </div>
        </Link>
      )
    },
    {
      type: 'divider'
    },
    {
      key: '6',
      label: (
        <div onClick={() => logout()}>
          <div className={styles.menuItem}>
            <BiLogOut size={20} />
            Sign Out
          </div>
        </div>
      )
    }
  ]

  const isLoggedOutItems = [
    {
      key: '1',
      label: (
        <Link href='/'>
          <div className={styles.menuItem}>
            <BiHome size={20} /> Home
          </div>
        </Link>
      )
    },
    {
      type: 'divider'
    },
    {
      key: '2',
      label: (
        <Link href='/artists'>
          <div className={styles.menuItem}>
            <BiMicrophone size={20} /> Performers
          </div>
        </Link>
      )
    },
    {
      key: '3',
      label: (
        <Link href='/events'>
          <div className={styles.menuItem}>
            <BiCalendarEvent size={20} />
            Events
          </div>
        </Link>
      )
    },
    {
      key: '4',
      label: (
        <Link href='/about'>
          <div className={styles.menuItem}>
            <BiHelpCircle size={20} />
            About
          </div>
        </Link>
      )
    },
    {
      type: 'divider'
    },
    {
      key: '5',
      label: (
        <Link href='/login'>
          <div className={styles.menuItem}>
            <BiLogInCircle size={20} />
            Sign In
          </div>
        </Link>
      )
    },
    {
      key: '6',
      label: (
        <Link href='/register'>
          <div className={styles.menuItem}>
            <BiUserPlus size={20} />
            Sign Up
          </div>
        </Link>
      )
    }
  ]

  const router = useRouter()
  // const onClick = ({ key }) => {
  //   if (key === '5') logout()
  // }

  if (user) {
    return (
      <div className={`${styles.userActionsButtons} ${className}`}>
        <UserAccountLink>
          <TabButton className={styles.userMenuSignInButton}>Dashboard</TabButton>
        </UserAccountLink>
        <Dropdown
          menu={{
            items: isLoggedInItems
            // onClick
          }}
          placement='topRight'
          arrow={{
            pointAtCenter: false
          }}
          trigger={['click']}
          overlayClassName={styles.dropdown}
        >
          <Button className={styles.userMenuButton}>
            <div className={styles.userImageContainer}>
              <div className={styles.userOnlineIndicator}></div>
              <img className={styles.userImage} src={`${user.profilePhoto}`} alt='profilePhoto' />
            </div>
            {/* <HambergerMenu /> */}
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
        <Link href='/register'>
          <div className={styles.userMenuButton}>
            <BiUserPlus size={20} />
          </div>
        </Link>
        <Dropdown
          menu={{
            items: isLoggedOutItems
            // onClick
          }}
          placement='topRight'
          arrow={{
            pointAtCenter: false
          }}
          trigger={['click']}
          overlayClassName={styles.dropdown}
        >
          <Button className={styles.userMenuButton}>
            <HambergerMenu />
          </Button>
        </Dropdown>
      </div>
    )
  }
}
export default CustomizedDropdown
