import { useEffect, useState } from 'react'

import Carousel from './Carousel'
import Navbar from './Navbar'
import Unsplash from './mock-apis/Unsplash'
import Link from 'next/link'
export default function Header() {
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
      <HeaderCarouselContainer />
    </header>
  )
}

const HeaderCarouselContainer = () => {
  //Declare static default number of images to display
  const defNumImgs = 10

  const [artistsList, setArtistsLists] = useState([])
  const [query, setQuery] = useState('Music Artists')

  useEffect(() => {
    //get artists images from unsplash api
    const getRandomArtistPhotos = async () => {
      const { data } = await Unsplash.get('/search/photos', {
        params: {
          query: query,
          per_page: 10,
          page: Math.floor(Math.random() * 20) + 1
        }
      })
      console.log(data)
      setArtistsLists(data.results)
    }

    getRandomArtistPhotos()
  }, [])

  //Conditional Rendering depending on availability of APi call
  if (!artistsList.length) {
    return (
      <div className='header-carousel'>
        <div className='header-carousel-layout'>
          {Array.from({ length: defNumImgs }).map(img => (
            <Carousel imgSrc={'/images/rectangle-2-15.png'} />
          ))}
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
            <Carousel imgSrc={artist.urls.regular} />
          ))}
        </div>
      </div>
    )
  }
}
