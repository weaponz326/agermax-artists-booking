import Link from 'next/link'
import Router from 'next/router'

export default function Carousel({ imgSrc }) {
  return (
    <div className='carousel-container'>
      <img className='carousel-img' alt='Rectangle' src={imgSrc} width={250} height={300} />
      <div className='carousel-title-text'>Mike Eriksson</div>
      <Tag />
      <Button />
    </div>
  )
}

const Tag = () => {
  return (
    <div className='carousel-genre'>
      <Link href='#'>
        <span className='carousel-genre-text'>Rock</span>
      </Link>
    </div>
  )
}

const Button = () => {
  return (
    <button type='button' className='book-now' onClick={() => Router.push('#')}>
      Book Now
    </button>
  )
}
