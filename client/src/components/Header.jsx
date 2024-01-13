import { useEffect, useState } from 'react'
import Carousel from './Carousel'
import Navbar from './Navbar'
import Unsplash from './mock-apis/Unsplash'
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
  const defaultNumofImages = 10

  const [artistsList, setArtistsLists] = useState([])
  const [query, setQuery] = useState('Music Artists')

  useEffect(() => {
    //get artists images from unsplash api
    const getRandomArtistPhotos = async () => {
      const { data } = await Unsplash.get('/search/photos', {
        params: {
          query: query,
          per_page: 10,
          page: 1
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
        {Array.from({ length: defaultNumofImages }).map(img => (
          <Carousel imgSrc={'/images/rectangle-2-15.png'} />
        ))}
      </div>
    )
  } else {
    return (
      <div className='header-carousel'>
        {artistsList.map(artist => (
          <Carousel imgSrc={artist.urls.regular} />
        ))}
      </div>
    )
  }
}
