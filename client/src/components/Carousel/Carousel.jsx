import Link from 'next/link'
import Button from '../Button/Button'
import styles from './carousel.module.css'
import Image from 'next/image'

export default function Carousel({ artist }) {
  if (!artist) return null
  return (
    <div className={styles['carousel-container']}>
      <div className={styles['carousel-img']}>
        <Image className={styles['carousel-img']} alt='Artist-Image' src={artist.artistImg} fill loading='eager' />
      </div>
      <Link href={`/artist-profile`} className={styles['carousel-title-text']}>
        {artist.name}
      </Link>

      {/* A good place to map your tags from Api calls */}

      <div className={styles['carousel-genre']}>
        <Tag genre={'Rock'} />
        <Tag genre={'Gospel'} />
        <Tag genre={'R&B'} />
        <Tag genre={'Afrobeat'} />
        <Tag genre={'Cools'} />
      </div>
      <Link href={'/artist-profile'} style={{ width: '100%' }}>
        <Button buttonText={'Book Now'} />
      </Link>
    </div>
  )
}

//Tag Component
const Tag = ({ genre }) => {
  return (
    <div className={styles['carousel-genre']}>
      <Link href='#'>
        <span className={styles['carousel-genre-text']}>{genre}</span>
      </Link>
    </div>
  )
}
