import Link from 'next/link'
import Button from '../Button/Button'
import styles from './carousel.module.css'
import Image from 'next/image'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import Skeleton from '@mui/material/Skeleton'
import { getOnePhoto, getRandomArtistPhotos } from 'src/services/mock'
const baseUrl = process.env.NEXT_PUBLIC_API_URL

export default function Carousel({ artist }) {
  const [loading, setLoading] = useState(true)
  const { router } = useRouter()

  /**************** */
  /*   Mock Data from Unsplash  */
  const [photo, setPhoto] = useState([])

  useEffect(() => {
    const fetchPhotos = async () => {
      try {
        const photos = await getRandomArtistPhotos()
        const randomPhoto = photos[Math.floor(Math.random() * photos.length)]
        setPhoto(randomPhoto.urls.regular)
      } catch (error) {}
    }
    fetchPhotos()
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
            src={artist.profilePhoto ? `${artist.profilePhoto}` : '/images/artist-1.jpg'}
            fill
            loading='eager'
          />
        </div>
        <div className={styles['carousel-title-text']}>
          <Link
            className={styles.artistDetailsLink}
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
          {artist.genre.length > 0 && artist.genre.map((g, index) => <Tag key={`${g} index`}>{g}</Tag>)}
        </div>
        <Link
          className={styles.artistDetailsLink}
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
  const skeletonCarouselDetail = {
    background: 'rgb(219, 224, 228)'
  }

  return (
    <div className={styles['carousel-skeleton-container']}>
      <div className={styles['skeleton-carousel-img']}>
        <Skeleton
          animation='wave'
          variant='rounded'
          height='100%'
          sx={{ borderRadius: 'inherit', ...skeletonCarouselDetail }}
        />
      </div>
      <div className={styles['skeleton-carousel-title-text']}>
        <Skeleton animation='wave' height={32} width='60%' variant='text' sx={{ ...skeletonCarouselDetail }} />
      </div>
      <div className={styles['skeleton-carousel-genre']}>
        {Array.from({ length: 4 }).map((genre, index) => (
          <Skeleton key={index} animation='wave' height={32} sx={{ ...skeletonCarouselDetail }}>
            <Tag>Genre</Tag>
          </Skeleton>
        ))}
      </div>
      <div className={styles.skeletonButtonContainer}>
        <Skeleton
          width='100%'
          height='2rem'
          sx={{ borderRadius: 'inherit', ...skeletonCarouselDetail }}
          variant='rounded'
          className={styles.skeletonButton}
        />
      </div>
    </div>
  )
}
