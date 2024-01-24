import React from 'react'
import { Button, Dropdown } from 'antd'
import UserIcon from 'src/layouts/components/UserIcon'
import { HambergerMenu, User } from 'iconsax-react'
import Link from 'next/link'
import styles from './CustomizedDropdown.module.css'

const isNotLoggedInItems = [
  {
    key: '1',
    label: <a href='#'>Log In</a>
  },
  {
    key: '2',
    label: <a href='#'>Sign Up</a>
  },
  {
    key: '3',
    label: <a href='#'>Gift Cards</a>
  },
  {
    key: '4',
    label: <a href='#'>Help Center</a>
  }
]

const isLoggedInItems = [
  {
    key: '1',
    label: <a href='#'>Book Artists</a>
  },
  {
    key: '2',
    label: <a href='#'>Account</a>
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
  zIndex: '1000'
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
          <Button style={buttonStyle}>
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
      <>
        <Dropdown
          menu={{
            items: isNotLoggedInItems,
            onClick
          }}
          placement='topRight'
          arrow={{
            pointAtCenter: true
          }}
        >
          <Button style={buttonStyle}>
            <HambergerMenu size={'35'} />
            <User />
          </Button>
        </Dropdown>
      </>
    )
  }
}
export default CustomizedDropdown
