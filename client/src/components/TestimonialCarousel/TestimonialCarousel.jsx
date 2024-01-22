// components/TestimonialCarousel.js

import React from 'react'
import Slider from 'react-slick'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'
import styles from './TestimonialCarousel.module.css'

const testimonialData = [
  {
    id: 1,
    quote:
      'Working with Agermax made booking artists for our events seamless. The platform is user-friendly and offers a great selection of talented artists.',
    author: 'John Doe',
    position: 'Event Organizer',
    image: 'https://source.unsplash.com/8x8ZU9IkrgU'
  },
  {
    id: 2,
    quote:
      'Agermax helped us discover incredible artists for our wedding. The booking process was straightforward, and the artists were amazing!',
    author: 'Jane Smith',
    position: 'Bride',
    image: 'https://source.unsplash.com/L0k0G-CoxTc'
  }
  // Add more testimonials as needed
]

const TestimonialCarousel = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000
  }

  const arrowStyles = {
    color: '#ff0000', // Replace with your desired arrow color
    // Additional styles if needed
    left: '10px',
    right: '10px'
  }

  return (
    <div className={styles.testimonialCarousel}>
      <Slider {...settings} className={styles.slider}>
        {testimonialData.map(testimonial => (
          <div key={testimonial.id} className={styles.testimonialItem}>
            <img src={testimonial.image} alt={`Testimonial from ${testimonial.author}`} />
            <p className={styles.quote}>{testimonial.quote}</p>
            <p className={styles.author}>{testimonial.author}</p>
            <p className={styles.position}>{testimonial.position}</p>
          </div>
        ))}
      </Slider>
    </div>
  )
}

export default TestimonialCarousel
