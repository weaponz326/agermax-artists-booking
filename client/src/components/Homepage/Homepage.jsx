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
  const [selectedGenre, setSelectedGenre] = useState(null)
  const { bookings } = useBookings()
  const [events, setEvents] = useState([])
  const [numOfBookings, setNumberOfBookings] = useState(9)
  const currentDate = new Date()

  useEffect(() => {
    if (bookings) {
      const upcomingEvents = bookings.filter(booking => {
        const bookingDate = new Date(booking.dateTimeRequested)
        return bookingDate >= currentDate // Compare booking date with current date
      })
      // console.log(upcomingEvents)
      if (selectedGenre === null) {
        setEvents(upcomingEvents)
      } else if (selectedGenre) {
        const filteredEvents = upcomingEvents.filter(event => event.genre.includes(selectedGenre))
        setEvents(filteredEvents)
      }
    }
  }, [bookings, selectedGenre])

  const handleLoadMoreEvents = () => {
    setNumberOfBookings(current => current + 3)
  }

  return (
    <section className={styles['events']} id='events'>
      <div className={styles.eventsWrapper}>
        <div className={styles['upcoming-events']}>
          <span className={`${styles['events-nav']} ${styles['upcoming']}`}>Upcoming Events 🎉</span>
        </div>
        <EventsGenreButtons
          events={events}
          setEvents={setEvents}
          bookings={bookings}
          selectedGenre={selectedGenre}
          setSelectedGenre={setSelectedGenre}
        />
        <EventsLayout
          numOfBookings={numOfBookings}
          bookings={events}
          selectedGenre={selectedGenre}
          setSelectedGenre={setSelectedGenre}
        />
        {/* <div className={styles['events-load-more']}> */}
        {events && events.length > numOfBookings ? (
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
      {/* <div className={styles.subscriptionWrapper}>
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
      </div> */}
    </section>
  )
}

export const EventsGenreButtons = ({ events, setEvents, bookings, selectedGenre, setSelectedGenre }) => {
  const [genreList, setGenreList] = useState([])

  useEffect(() => {
    if (!bookings) return
    // Collect all genres from the list of bookings into a single array
    const allGenres = bookings.reduce((accumulator, booking) => {
      // Concatenate genres of each booking into the accumulator array
      return accumulator.concat(booking.genre)
    }, [])

    setGenreList([...new Set(allGenres)])
  }, [bookings])

  const handleGenreFilter = genre => {
    setSelectedGenre(genre)
    console.log(genre)
  }

  return (
    <div className={styles['events-genre-buttons']}>
      {genreList.map((genre, index) => (
        <div
          key={index}
          className={selectedGenre === genre ? styles['activeGenre'] : styles['genre-btn']}
          onClick={() => handleGenreFilter(genre)}
        >
          🎸{genre}
        </div>
      ))}
    </div>
  )
}

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
