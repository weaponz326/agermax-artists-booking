import Link from 'next/link'
import Button from '../Button/Button'
import styles from './carousel.module.css'
import Image from 'next/image'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import Skeleton from '@mui/material/Skeleton'
import { getOnePhoto, getRandomArtistPhotos } from 'src/services/mock'

export default function Carousel({ artist }) {
  const router = useRouter()
  const [loading, setLoading] = useState(true)

  /**************** */
  /*   Mock Data from Unsplash  */
  const [photo, setPhoto] = useState([])

  useEffect(() => {
    const fetchPhotos = async () => {
      try {
        const photos = await getRandomArtistPhotos()
        const randomPhoto = photos[Math.floor(Math.random() * photos.length)]
        setPhoto(randomPhoto.urls.regular)
      } catch (error) {
        console.log()
      }
    }
    fetchPhotos()
    console.log(artist)
  }, [])

  /*************** */
  // Get one photo by id from the API if we have an ID in the URL parameters

  useEffect(() => {
    if (!artist) {
      setLoading(true)
    } else {
      setLoading(false)
    }
  }, [artist])
  if (!loading) {
    return (
      <div className={styles['carousel-container']}>
        <div className={styles['carousel-img-wrapper']}>
          <Image
            className={styles['carousel-img']}
            alt='Artist-Image'
            src={artist.profilePhoto ? artist.profilePhoto : '/images/artist-1.jpg'}
            fill
            loading='eager'
          />
        </div>
        <div className={styles['carousel-title-text']}>
          <Link
            href={{
              pathname: `/artists/${artist._id}`
            }}
            as={`/artists/${artist._id}`}
          >
            {artist.firstName} {artist.lastName}
          </Link>
        </div>

        {/* A good place to map your tags from Api calls */}

        <div className={styles['carousel-genre']}>
          {artist.genre.length ? (
            artist.genre.map((g, index) => <Tag key={`${g} index`}>{g}</Tag>)
          ) : (
            <Tag>No genre provided yet.</Tag>
          )}
        </div>
        <Link
          href={{
            pathname: `/artists/${artist._id}`
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
export const Tag = ({ children }) => {
  return (
    <div className={styles['carousel-genre']}>
      <Link href='#'>
        <span className={styles['carousel-genre-text']}>{children}</span>
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
        {Array.from({ length: 3 }).map((genre, index) => (
          <Skeleton key={index} animation='wave' height={32}>
            <Tag>Genre</Tag>
          </Skeleton>
        ))}
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
