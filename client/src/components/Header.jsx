import { useEffect, useState } from 'react'
import { getAllArtists, getArtistById } from '../services/artist'
import Carousel from './Carousel'
import Navbar from './Navbar'
import Unsplash from './mock-apis/Unsplash'
import Link from 'next/link'
import { Fragment } from 'react'

export default function Header({ artistsList }) {
  if (!artistsList.length) return null
  return (
    <header>
      <div className='header-background'>
        <Navbar />
        <div className='greetings'>
          <div>
            <p className='greetings-hi'>Hey John!&nbsp;&nbsp;👋</p>
          </div>
          <div>
            <p className='greetings-message'>Book amazing artists for your next events</p>
          </div>
        </div>
      </div>
      <HeaderCarouselContainer artistsList={artistsList} />
    </header>
  )
}

const HeaderCarouselContainer = ({ artistsList }) => {
  //Conditional Rendering depending on availability of APi call
  if (!artistsList.length) {
    return (
      <div className='header-carousel'>
        <div className='header-carousel-layout'>
          <Carousel />
        </div>
      </div>
    )
  } else {
    return (
      <div className='header-carousel'>
        <div className='hot-artists-nav'>
          <p>Hot Artists 🔥</p>
          <Link href={'#'} className='see-all-artists'>
            <p>See all</p>
          </Link>
        </div>
        <div className='header-carousel-layout'>
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
