// pages/index.js
import React, { useEffect, useState } from 'react'
import Header from 'src/components/Header/Header'
import { MdRefresh } from 'react-icons/md'
import Link from 'next/link'
import EventsLayout from 'src/components/EventsLayout/EventsLayout'
import Image from 'next/image'
import Button from 'src/components/Button/Button'
import getArtistsData from 'src/services/artist'
import CustomPagesLayout from 'src/layouts/CustomPagesLayout'
import styles from './homepage.module.css'
import Router from 'next/router'

const HomePage = () => {
  const [imgList, setImgList] = useState([])
  const [artistsList, setArtistsList] = useState([])
  useEffect(() => {
    const fetchData = async () => {
      const { artistsData, artistsPhotos } = await getArtistsData()
      setArtistsList(artistsData)
      setImgList(artistsPhotos)
    }

    fetchData()
  }, [])
  return (
    <CustomPagesLayout className='homepage'>
      <Header artistsList={artistsList} />
      <main>
        <EventsSection imgList={imgList} />
        <AboutSection />
        <FaqSection />
        <SubscriptionSection />
      </main>
    </CustomPagesLayout>
  )
}

const EventsSection = ({ imgList }) => {
  return (
    <section className={styles['events']}>
      <div className={styles['upcoming-events']}>
        <span className={`${styles['events-nav']} ${styles['upcoming']}`}>Upcoming Events 🎉</span>
      </div>
      <EventsGenreButtons genreList={mockGenreList} />
      <EventsLayout imgList={imgList} />
      <div className={styles['events-load-more']}>
        <Link href={'#'}>
          <Button buttonText={'Load more ...'} customStyles={styles['events-load-more-btn']} />
        </Link>
      </div>
    </section>
  )
}

const AboutSection = () => {
  return (
    <section className={styles['about']}>
      <div className={styles['about-content']}>
        <Image className={styles['about-content-img']} src={'/images/rectangle-22462.png'} width={350} height={350} />
        {/* <img className={styles['about-content-img']} alt='Rectangle' src='/images/rectangle-22462.png' /> */}
        <div className={styles['about-message']}>
          <div className={styles['about-message-title']}>About</div>
          <div className={styles['about-message-content']}>
            Donec laoreet ante et nisi ultrices lacinia. Phasellus facilisis sapien ex. Vivamus ac nulla blandit ligula
            vulputate convallis. Mauris ut felis sit amet lectus vehicula ullamcorper quis at est. Dictumst malesuada
            nostra eget tincidunt curabitur aliquet viverra platea. Felis augue fusce platea in nostra. Vehicula
            venenatis iaculis enim accumsan Link.......
          </div>
          <div className={styles['about-read-more']}>
            <Link href='/about'>
              <Button buttonText={`Read more`} />
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}

const FaqSection = () => {
  return (
    <section className={styles['faq']}>
      <div className={styles['faq-title']}>Frequently Asked Questions</div>
      <FaqAccordion faqData={faqData} faqTitle={'Frequently Asked Questions'} />
    </section>
  )
}

const SubscriptionSection = () => {
  return (
    <section className={styles['subscription']}>
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

const faqData = [
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

export const FaqAccordion = ({ faqTitle, faqData }) => {
  const [openIndex, setOpenIndex] = useState(0)

  const handleToggle = index => {
    setOpenIndex(prevIndex => (prevIndex === index ? null : index))
  }

  return (
    <div className={styles['faq-questions']}>
      {faqData.map((faq, index) => (
        <div key={index} className={styles['faq-question']}>
          <div className={styles['question-element']}>
            <div
              className={`${styles['question']} ${openIndex === index ? styles['open'] : ''}`}
              onClick={() => handleToggle(index)}
            >
              {faq.question}
            </div>
            <button className={styles['faq-accordion-btn']} onClick={() => handleToggle(index)}>
              {openIndex === index ? (
                <div className={styles['faq-collapse-icon']}>-</div>
              ) : (
                <div className={styles['faq-collapse-icon']}>+</div>
              )}
            </button>
          </div>
          {openIndex === index && <div className={styles['answer']}>{faq.answer}</div>}
          <hr className={styles['faq-divider']} />
        </div>
      ))}
    </div>
  )
}

export default HomePage
