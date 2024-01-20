import styles from './navbar.module.css'
import { useState, useRef, useEffect } from 'react'

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
      <form>
        <label htmlFor='search-artist'>Who</label>
        <input
          className={styles['search-artist']}
          type='text'
          name='search-artist'
          placeholder='Search Artists'
          id='search-artist'
        />
      </form>
    ),

    altConfig: (
      <span>
        <p>Hot Artists</p>
      </span>
    )
  },
  {
    config: (
      <form>
        <p>Where</p>
        <input
          className={styles['search-venue']}
          type='text'
          name='search-venue'
          placeholder='Search Venue'
          id='search-venue'
        />
      </form>
    ),

    altConfig: (
      <span>
        <p>Anywhere</p>
      </span>
    )
  },
  {
    config: (
      <form>
        <p>When</p>
        <input
          className={styles['search-date']}
          type='date'
          name='search-date'
          placeholder='Search Date'
          id='search-date'
        />
      </form>
    ),

    altConfig: (
      <span>
        <p>Anytime</p>
      </span>
    )
  },
  {
    config: (
      <form>
        <p>Special</p>
        <input
          className={styles['search-guests']}
          type='text'
          name='search-guests'
          placeholder='Search Guests'
          id='search-guests'
        />
      </form>
    ),

    altConfig: (
      <span>
        <p>Guests</p>
      </span>
    )
  }
]
