export default function Carousel() {
  return (
    <div className='carousel-container'>
      <img
        className='carousel-img'
        alt='Rectangle'
        src='https://images.unsplash.com/photo-1510915361894-db8b60106cb1?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTJ8fG11c2ljfGVufDB8fDB8fHww'
      />
      <div className='carousel-title-text'>Mike Eriksson</div>
      <div className='carousel-genre'>
        <a href='' className='carousel-genre-text'>
          Rock
        </a>
        <a href='' className='carousel-genre-text'>
          Trubadur
        </a>
      </div>
      <a href='' className='book-now'>
        Book Now
      </a>
    </div>
  )
}