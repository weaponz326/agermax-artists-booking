import { useEffect, useState } from 'react'
import { getAllArtist, getArtistById } from '../services/artist'
import Carousel from './Carousel'
import Navbar from './Navbar'
import Unsplash from './mock-apis/Unsplash'
import Link from 'next/link'
import { allowDefaultColorValue } from '@iconify/tools/lib/colors/attribs'

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
      const photos = data.results
      // console.log('photo1: ', photos)
      const { data: artists } = await getAllArtist()

      const allArtists = []

      for (let i = 0; i < artists.length; i++) {
        allArtists.push({ ...artists[i], imgUrl: photos[i].urls.regular })
      }
      // console.log('all artist: ', allArtists)
      setArtistsLists(allArtists)
    }

    getRandomArtistPhotos()
  }, [])

  //Conditional Rendering depending on availability of APi call
  if (!artistsList.length) {
    return (
      <div className='header-carousel'>
        <div className='header-carousel-layout'>
          <Carousel data={artistsList} />
          {/* {Array.from({ length: defNumImgs }).map(img => (
          ))} */}
        </div>
      </div>
    )
  } else {
    return (
      <div className='header-carousel'>
        <div className='hot-artists-nav'>
          <p>Hot Artists 🔥</p>
          <Link href={'/artist-profile'} className='see-all-artists'>
            <p>See all</p>
          </Link>
        </div>
        <div className='header-carousel-layout'>
          <Carousel data={artistsList} />
          {/* {artistsList.map(artist => (
          ))} */}
        </div>
      </div>
    )
  }
}
