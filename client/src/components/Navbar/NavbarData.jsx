import styles from './navbar.module.css'
import { useState, useRef, useEffect } from 'react'
import RangeDatePicker from '../RangeDatePicker/RangeDatePicker'
import { DatePicker } from 'antd'

export default function HandleMenu(e) {
  const [isActive, setIsActive] = useState(true)
  const isActiveClass = isActive && styles['active-menu-item']

  function handleActive(e) {
    e.target.style.backgroundColor = 'red'
  }
}

export const menuConfig = [
  {
    config: (
      <div>
        <label htmlFor='search-artist'>Who</label>
        <input
          className={styles['search-artist']}
          type='text'
          name='search-artists'
          placeholder='Search Artists'
          id='search-artists'
        />
      </div>
    ),

    altConfig: (
      <span>
        <p>Hot Performers</p>
      </span>
    )
  },
  {
    config: (
      <div style={{ width: '100%' }}>
        <DatePicker placeholder='Select Start Date' />
        {/* <label>Start Date</label>
        <input
          className={styles['search-venue']}
          type='date'
          name='start-date'
          placeholder='Choose Start Date'
          id='start-date'
        /> */}
      </div>
    ),

    altConfig: (
      <span>
        <p>Anywhere</p>
      </span>
    )
  },
  {
    config: (
      <div>
        <DatePicker placeholder='Select End Date' />
        {/* <p>End Date</p>
        <input
          className={styles['search-date']}
          type='date'
          name='end-date'
          placeholder='Choose End Date'
          id='end-date'
        /> */}
      </div>
    ),

    altConfig: (
      <span>
        <p>Anytime</p>
      </span>
    )
  },
  {
    config: (
      <div>
        <p>Booker</p>
        <input className={styles['search-guests']} type='text' name='booker' placeholder='Your info' id='booker' />
      </div>
    ),

    altConfig: (
      <span>
        <p>Guests</p>
      </span>
    )
  }
]
