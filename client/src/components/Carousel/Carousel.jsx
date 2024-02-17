import Link from 'next/link'
import Button from '../Button/Button'
import styles from './carousel.module.css'
import Image from 'next/image'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import Skeleton from '@mui/material/Skeleton'

export default function Carousel({ artist }) {
  const router = useRouter()
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!artist || artist.length < 1) {
      setLoading(true)
    } else {
      setLoading(false)
    }
  }, [artist])
  if (!loading) {
    const artistName = `${artist.firstName}-${artist.lastName}`
    return (
      <div className={styles['carousel-container']}>
        <div className={styles['carousel-img']}>
          <Image
            className={styles['carousel-img']}
            alt='Artist-Image'
            src={artist.picture ? artist.picture : '/images/rectangle-2-15.png'}
            fill
            loading='eager'
          />
        </div>
        <div
          onClick={() => router.push({ pathname: `/artist-profile`, query: artist })}
          className={styles['carousel-title-text']}
        >
          <Link
            href={{
              pathname: `/artists/${artist._id}`,
              query: artist
            }}
            as={`/artists/${artist._id}`}
            style={{ width: '100%' }}
          >
            {artist.firstName} {artist.lastName}
          </Link>
        </div>

        {/* A good place to map your tags from Api calls */}

        <div className={styles['carousel-genre']}>
          <Tag genre={'Rock'} />
          <Tag genre={'Gospel'} />
          <Tag genre={'R&B'} />
          <Tag genre={'Afrobeat'} />
        </div>
        <Link
          href={{
            pathname: `/artists/${artist._id}`,
            query: artist
          }}
          as={`/artists/${artist._id}`}
          style={{ width: '100%' }}
        >
          <Button buttonText={'Book Now'} />
        </Link>
      </div>
    )
  } else {
    return (
      <>
        <SkeletonCarousel />
      </>
    )
  }
}

//Tag Component
export const Tag = ({ genre }) => {
  return (
    <div className={styles['carousel-genre']}>
      <Link href='#'>
        <span className={styles['carousel-genre-text']}>{genre}</span>
      </Link>
    </div>
  )
}

export const SkeletonCarousel = () => {
  return (
    <div className={styles['carousel-skeleton-container']}>
      <div className={styles['carousel-img']}>
        <Skeleton animation='wave' variant='rounded' height='100%' sx={{ borderRadius: 'inherit' }} />
      </div>
      <div className={styles['skeleton-carousel-title-text']}>
        <Skeleton animation='wave' height={32} width='60%' variant='text' />
      </div>
      <div className={styles['skeleton-carousel-genre']}>
        <Skeleton animation='wave' height={32}>
          <Tag genre={'Rock'} />
        </Skeleton>
        <Skeleton animation='wave' height={32}>
          <Tag genre={'Gospel'} />
        </Skeleton>
        <Skeleton animation='wave' height={32}>
          <Tag genre={'R&B'} />
        </Skeleton>
        <Skeleton animation='wave' height={32}>
          <Tag genre={'Afrobeat'} />
        </Skeleton>
      </div>
      <div className={styles.skeletonButtonContainer}>
        <Skeleton
          width='100%'
          height='2rem'
          sx={{ borderRadius: 'inherit' }}
          variant='rounded'
          className={styles.skeletonButton}
        />
      </div>
    </div>
  )
}
