import Carousel, { SkeletonCarousel } from '../Carousel/Carousel'
import Link from 'next/link'
import { Fragment } from 'react'
import styles from './header-carousel-container.module.css'

const HeaderCarouselContainer = ({ artists, className, layout }) => {
  //Conditional Rendering depending on availability of APi call
  if (!artists || artists.length <= 0) {
    return (
      <div className={className}>
        <div className={styles['hot-artists-nav']}>
          <p>Hot Artists 🔥</p>
          <Link href={'/artists'} className={styles['see-all-artists']}>
            <p>See all</p>
          </Link>
        </div>
        <div className={layout}>
          {Array.from({ length: 12 }).map((_, index) => (
            <Fragment key={index}>
              <SkeletonCarousel />
            </Fragment>
          ))}
        </div>
      </div>
    )
  } else {
    return (
      <div className={className}>
        <div className={styles['hot-artists-nav']}>
          <p>Hot Artists 🔥</p>
          <Link href={'/artists'} className={styles['see-all-artists']}>
            <p>See all</p>
          </Link>
        </div>
        <div className={styles.carouselWrapper}>
          <div className={layout}>
            {artists.map((artist, index) => (
              <Fragment key={`${artist.id} __${index}`}>
                <Carousel artist={artist} />
              </Fragment>
            ))}
          </div>
        </div>
      </div>
    )
  }
}

export default HeaderCarouselContainer
