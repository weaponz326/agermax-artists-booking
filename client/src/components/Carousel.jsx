import Link from 'next/link'
import Router from 'next/router'

export default function Carousel({ imgSrc }) {
  return (
    <div className='carousel-container'>
      <img className='carousel-img' alt='Rectangle' src={imgSrc} width={250} height={300} />
      <div className='carousel-title-text'>Mike Eriksson</div>

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

//Button Component
const Button = ({ buttonText }) => {
  return (
    <button type='button' className='book-now' onClick={() => Router.push('/artist-profile')}>
      {buttonText}
    </button>
  )
}
