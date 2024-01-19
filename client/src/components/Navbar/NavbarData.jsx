import styles from './navbar.module.css'

export const menuConfig = [
  {
    config: (
      <form>
        <p>Who</p>
        <input
          className={styles['search-artist']}
          type='text'
          name='search-artist'
          placeholder='Search Artists'
          id='search-artists'
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
