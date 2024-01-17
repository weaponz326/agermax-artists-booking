import { getAllArtists, getArtistById } from '../../services/artist'
import Carousel from '../Carousel/Carousel'
import Link from 'next/link'
import { Fragment } from 'react'

const HeaderCarouselContainer = ({ artistsList, className, layout }) => {
  //Conditional Rendering depending on availability of APi call
  if (!artistsList.length) {
    return (
      <div className={className}>
        <div className='header-carousel-layout'>
          <Carousel />
        </div>
      </div>
    )
  } else {
    return (
      <div className={className}>
        <div className='hot-artists-nav'>
          <p>Hot Artists 🔥</p>
          <Link href={'/artists'} className='see-all-artists'>
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
