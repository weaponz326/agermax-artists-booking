import { getAllArtists, getArtistById } from '../../services/artist'
import Carousel from '../Carousel/Carousel'
import Link from 'next/link'
import { Fragment } from 'react'
import styles from './header-carousel-container.module.css'

const HeaderCarouselContainer = ({ artistsList, className, layout }) => {
  //Conditional Rendering depending on availability of APi call
  if (!artistsList.length) {
    return (
      <div className={styles[className]}>
        <div className={styles['header-carousel-layout']}>
          <Carousel />
        </div>
      </div>
    )
  } else {
    return (
      <div className={styles[className]}>
        <div className={styles['hot-artists-nav']}>
          <p>Hot Artists 🔥</p>
          <Link href={'/artists'} className={styles['see-all-artists']}>
            <p>See all</p>
          </Link>
        </div>
        <div className={layout}>
          {artistsList.map(artist => (
            <Fragment key={artist.id}>
              <Carousel artist={artist} />
            </Fragment>
          ))}
        </div>
      </div>
    )
  }
}

export default HeaderCarouselContainer