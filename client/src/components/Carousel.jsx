import Link from 'next/link'

export default function Carousel() {
  return (
    <div className='carousel-container'>
      <div className='carousel-img'></div>
      {/* <img className='carousel-img' alt='Rectangle' src='/images/rectangle-332-5.png' /> */}
      <div className='carousel-title-text'>Mike Eriksson</div>
      <div className='carousel-genre'>
        <Link href='' className='carousel-genre-text'>
          Rock
        </Link>
        <Link href='' className='carousel-genre-text'>
          Trubadur
        </Link>
      </div>
      <Link href='' className='book-now'>
        Book Now
      </Link>
    </div>
  )
}
