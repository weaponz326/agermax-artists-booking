// pages/index.js
import { styled } from '@mui/material/styles'
import Box from '@mui/material/Box'
import BlankLayoutWithAppBar from '../../@core/layouts/BlankLayoutWithAppBar' // Adjust the import path as necessary
import React, { useEffect, useState } from 'react'
import Header from 'src/components/Header/Header'
import { MdFacebook, MdRefresh } from 'react-icons/md'
import { FaInstagram, FaTwitter } from 'react-icons/fa'
import Link from 'next/link'
import EventsLayout from 'src/components/EventsLayout/EventsLayout'
import Image from 'next/image'
import Button from 'src/components/Button/Button'
import { getArtistsData } from 'src/services/artist'

// Your styled component for the content
const LandingPageContentWrapper = styled(Box)(({ theme }) => ({
  textAlign: 'center',
  '& h1': {
    margin: theme.spacing(4, 0),
    color: theme.palette.text.primary
  },
  '& p': {
    margin: theme.spacing(2, 0),
    color: theme.palette.text.secondary
  }
}))

// <LandingPageContentWrapper>
/* <h1>Welcome to Our Artists Management Platform</h1>
  <p>Discover events, manage bookings, and connect with artists from around the world.</p>
  Additional content goes here */
/* </LandingPageContentWrapper> */
const Home = () => {
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
    <div className='homepage'>
      <Header artistsList={artistsList} />
      <main>
        <EventsSection imgList={imgList} />
        <AboutSection />
        <FaqSection />
        <SubscriptionSection />
      </main>
      <Footer />
    </div>
  )
}

const EventsSection = ({ imgList }) => {
  return (
    <section className='events'>
      <div className='upcoming-events'>
        <span className='events-nav upcoming'>Upcoming Events 🎉</span>
        <span className='events-nav see-all'>
          <Link href=''>See all</Link>
        </span>
      </div>
      <EventsGenreButtons genreList={mockGenreList} />
      <EventsLayout imgList={imgList} />
      <Link href='' className='events-load-more-btn'>
        <MdRefresh className='events-refresh-icon' />
        Load More...
      </Link>
    </section>
  )
}

const AboutSection = () => {
  return (
    <section className='about'>
      <div className='about-content'>
        <Image className='about-content-img' src={'/images/rectangle-22462.png'} width={350} height={350} />
        {/* <img className='about-content-img' alt='Rectangle' src='/images/rectangle-22462.png' /> */}
        <div className='about-message'>
          <div className='about-message-title'>About</div>
          <div className='about-message-content'>
            Donec laoreet ante et nisi ultrices lacinia. Phasellus facilisis sapien ex. Vivamus ac nulla blandit ligula
            vulputate convallis. Mauris ut felis sit amet lectus vehicula ullamcorper quis at est. Dictumst malesuada
            nostra eget tincidunt curabitur aliquet viverra platea. Felis augue fusce platea in nostra. Vehicula
            venenatis iaculis enim accumsan Link.......
          </div>
          <div>
            <Link href=''>
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
    <section className='faq'>
      <div className='faq-title'>Frequently Asked Questions</div>
      <FaqAccordion faqData={faqData} faqTitle={'Frequently Asked Questions'} />
    </section>
  )
}

const SubscriptionSection = () => {
  return (
    <section className='subscription'>
      <div className='subscription-details'>
        <div className='join-agermax'>Haven’t joined Agermax yet?</div>
        <div className='get-started'>Let’s get you started.</div>
        <form className='subscription-form'>
          <input className='subscription-email' type='email' placeholder='someone@example.com' required />
          <Button buttonText={'Register'} type={'submit'} />
        </form>
        <div className='subscribe'>
          <input type='checkbox' />
          <p>Subscribe to receive event and promotion notifications.</p>
        </div>
      </div>
    </section>
  )
}

export const EventsGenreButtons = ({ genreList }) => {
  return (
    <div className='events-genre-buttons'>
      {genreList.map(genre => (
        <Link href={genre.page} key={Math.random()} className='genre-btn'>
          {' '}
          {genre.icon} {genre.title}{' '}
        </Link>
      ))}
    </div>
  )
}

export const Footer = () => {
  return (
    <footer>
      <div className='links'>
        <Link href='' className='logo'>
          <img src='/images/logo.png' alt='AgerMax Logo' />
          <div className='logo-text'>AGERMAX</div>
        </Link>
        <ul className='footer-nav'>
          <li>
            <Link href=''>Home</Link>
          </li>
          <li>
            <Link href=''>About Us</Link>
          </li>
          <li>
            <Link href=''>Contact</Link>
          </li>
          <li>
            <Link href=''>Newsletter</Link>
          </li>
        </ul>
        <div className='social-media'>
          <Link href='#' className='fab fa-facebook-f'>
            <MdFacebook />
          </Link>
          <Link href='#' className='fab fa-twitter'>
            <FaTwitter />
          </Link>
          <Link href='#' className='fab fa-instagram'>
            <FaInstagram />
          </Link>
        </div>
      </div>
      <div className='copyright-terms'>
        <div className='copyright'>@Copyright Agermax 2024</div>
        <ul className='terms-privacy'>
          <li>
            <Link href=''>Terms</Link>
          </li>
          <li>
            <Link href=''>Privacy Policy</Link>
          </li>
          <li>
            <Link href=''>Cookies</Link>
          </li>
        </ul>
      </div>
    </footer>
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
    <div className='faq-questions'>
      {faqData.map((faq, index) => (
        <div key={index} className='faq-question'>
          <div className='question-element'>
            <div className={`question ${openIndex === index ? 'open' : ''}`} onClick={() => handleToggle(index)}>
              {faq.question}
            </div>
            <button onClick={() => handleToggle(index)}>
              {openIndex === index ? (
                <div className='faq-collapse-icon'>-</div>
              ) : (
                <div className='faq-collapse-icon'>+</div>
              )}
            </button>
          </div>
          {openIndex === index && <div className='answer'>{faq.answer}</div>}
          <hr className='faq-divider' />
        </div>
      ))}
    </div>
  )
}

// Override the default guard behavior for this page
Home.authGuard = false
Home.guestGuard = false
Home.acl = {
  action: 'manage',
  subject: 'all' // Adjust the permissions as per your application's ACL configuration
}

// Set a custom layout for the Home page that doesn't include the AppBar and TopBar
// Home.getLayout = page => <BlankLayoutWithAppBar>{page}</BlankLayoutWithAppBar>
Home.getLayout = page => <div>{page}</div>

export default Home
