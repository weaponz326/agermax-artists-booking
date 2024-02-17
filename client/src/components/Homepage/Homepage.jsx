// pages/index.js
import React, { useEffect, useState } from 'react'
import Header from 'src/components/Header/Header'
import Link from 'next/link'
import EventsLayout from 'src/components/EventsLayout/EventsLayout'
import Image from 'next/image'
import Button from 'src/components/Button/Button'
import styles from './homepage.module.css'
import FaqAccordion from '../FaqAccordion/FaqAccordion'
import BookingsProvider from 'src/providers/BookingsProvider'
import { useBookings } from 'src/providers/BookingsProvider'
import { getOnlyArtistsList, getEventsPhotos } from 'src/services/artists'

const HomePage = () => {
  const [artistsList, setArtistsList] = useState([])

  return (
    <div className='homepage'>
      <Header artistsList={artistsList} />
      <main>
        <BookingsProvider>
          <EventsSection />
          <AboutSection />
          <FaqSection />
          <SubscriptionSection />
        </BookingsProvider>
      </main>
    </div>
  )
}
export default HomePage

export const EventsSection = () => {
  const { bookings } = useBookings()
  const [numOfBookings, setNumberOfBookings] = useState(9)

  const handleLoadMoreEvents = () => {
    setNumberOfBookings(current => current + 4)
  }

  return (
    <section className={styles['events']}>
      <div className={styles.eventsWrapper}>
        <div className={styles['upcoming-events']}>
          <span className={`${styles['events-nav']} ${styles['upcoming']}`}>Upcoming Events 🎉</span>
        </div>
        <EventsGenreButtons genreList={mockGenreList} />
        <EventsLayout numOfBookings={numOfBookings} bookings={bookings} />
        {/* <div className={styles['events-load-more']}> */}
        {bookings && bookings.length > numOfBookings ? (
          <button onClick={handleLoadMoreEvents} className={styles['events-load-more-btn']}>
            Load More ...🌟
          </button>
        ) : null}
        {/* </div> */}
      </div>
    </section>
  )
}

export const AboutSection = () => {
  return (
    <section className={styles['about']}>
      <div className={styles.aboutWrapper}>
        <div className={styles['about-content']}>
          <Image
            className={styles['about-content-img']}
            src={'/images/rectangle-22462.png'}
            width={350}
            height={350}
            alt='about'
          />
          <div className={styles['about-message']}>
            <div className={styles['about-message-title']}>About</div>
            <div className={styles['about-message-content']}>
              Donec laoreet ante et nisi ultrices lacinia. Phasellus facilisis sapien ex. Vivamus ac nulla blandit
              ligula vulputate convallis. Mauris ut felis sit amet lectus vehicula ullamcorper quis at est. Dictumst
              malesuada nostra eget tincidunt curabitur aliquet viverra platea. Felis augue fusce platea in nostra.
              Vehicula venenatis iaculis enim accumsan Link.......
            </div>
            <div className={styles['about-read-more']}>
              <Link href='/about'>
                <Button buttonText={`Read more`} />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export const FaqSection = () => {
  return (
    <section className={styles['faq']}>
      <div className={styles.faqWrapper}>
        <div className={styles['faq-title']}>Frequently Asked Questions</div>
        <div className={styles['faq-container']}>
          <FaqAccordion faqData={faqData} faqTitle={'Frequently Asked Questions'} />
        </div>
      </div>
    </section>
  )
}

export const SubscriptionSection = () => {
  return (
    <section className={styles['subscription']}>
      <div className={styles.subscriptionWrapper}>
        <div className={styles['subscription-details']}>
          <div className={styles['join-agermax']}>Haven’t joined Agermax yet?</div>
          <div className={styles['get-started']}>Let’s get you started.</div>
          <form className={styles['subscription-form']}>
            <input className={styles['subscription-email']} type='email' placeholder='someone@example.com' required />
            <Button buttonText={'Register'} type={'submit'} />
          </form>
          <div className={styles['subscribe']}>
            <input type='checkbox' />
            <p>Subscribe to receive event and promotion notifications.</p>
          </div>
        </div>
      </div>
    </section>
  )
}

export const EventsGenreButtons = ({ genreList }) => {
  return (
    <div className={styles['events-genre-buttons']}>
      {genreList.map(genre => (
        <Link href={genre.page} key={Math.random()} className={styles['genre-btn']}>
          {' '}
          {genre.icon} {genre.title}{' '}
        </Link>
      ))}
    </div>
  )
}

const mockGenreList = [
  { title: 'Rock', icon: '🎸', page: '#' },
  { title: 'Trubadur', icon: '🎸', page: '#' },
  { title: 'Pop', icon: '🎹', page: '#' },
  { title: 'R&B', icon: '🎸', page: '#' }
]

export const faqData = [
  {
    question: 'What is Agermax?',
    answer:
      'Agermax is an Artist booking platform for all. It has incredible catalogue of the most popular artists. On this platform, you can check the upcoming events of these artists. You can schedule and book them also.'
  },
  {
    question: 'How to book an Artist?',
    answer: 'You can book an artist by visiting their profile, check their calendar and events and book them'
  }
  // Add more FAQ items as needed
]
