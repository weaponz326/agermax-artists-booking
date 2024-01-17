import { getAllArtists, getArtistById } from '../../services/artist'
import Carousel from '../Carousel/Carousel'
import Navbar from '../Navbar/Navbar'
import Unsplash from '../mock-apis/Unsplash'
import Link from 'next/link'
import { Fragment } from 'react'
import HeaderCarouselContainer from '../HeaderCarouselContainer/HeaderCarouselContainer'

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
      <HeaderCarouselContainer
        layout={'header-carousel-layout'}
        className={'header-carousel'}
        artistsList={artistsList}
      />
    </header>
  )
}
