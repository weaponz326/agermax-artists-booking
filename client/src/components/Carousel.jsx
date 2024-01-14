import Link from 'next/link'
import Router from 'next/router'
import Button from './Button'

export default function Carousel({ data }) {
  // console.log('data: ', data)
  if (data.length == 0) return null
  return (
    <>
      {data.map(artist => (
        <div key={artist.id} className='carousel-container'>
          <img className='carousel-img' alt='Rectangle' src={artist.imgUrl} width={250} height={300} />
          <Link href={`/artists/${artist.id}`} className='carousel-title-text'>
            {artist.name}
          </Link>

          {/* A good place to map your tags from Api calls */}

          <div className='carousel-genre'>
            <Tag genre={'Rock'} />
            <Tag genre={'Gospel'} />
            <Tag genre={'R&B'} />
            <Tag genre={'Afrobeat'} />
            <Tag genre={'Cools'} />
          </div>
          <Button buttonText={'Book Now'} />
        </div>
      ))}
    </>
  )
}

//Tag Component
const Tag = ({ genre }) => {
  return (
    <div className='carousel-genre'>
      <Link href='#'>
        <span className='carousel-genre-text'>{genre}</span>
      </Link>
    </div>
  )
}
