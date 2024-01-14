import React, { useEffect, useState } from 'react'
import Header from './Header'
import { MdFacebook, MdRefresh, MdAddCircleOutline } from 'react-icons/md'
import { FaInstagram, FaTwitter } from 'react-icons/fa'
import Link from 'next/link'
import Unsplash from './mock-apis/Unsplash'
import EventsLayout from './EventsLayout'

export const Homepage = () => {
  const [imgList, setImgList] = useState([])
  const [query, setQuery] = useState('Music concerts')
  useEffect(() => {
    //get artists images from unsplash api
    const getRandomArtistPhotos = async () => {
      const { data } = await Unsplash.get('/search/photos', {
        params: {
          query: query,
          per_page: 12,
          page: Math.floor(Math.random() * 20) + 1
        }
      })
      console.log(data)
      setImgList(data.results)
    }

    getRandomArtistPhotos()
  }, [])
  return (
    <div className='homepage'>
      <Header />
      <main>
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
        <section className='about'>
          <div className='about-img'>
            <img
              className='about-img'
              alt='Rectangle'
              src='https://images.unsplash.com/photo-1547357245-1277166ee18a?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTV8fHBsYXklMjBndWl0YXJ8ZW58MHx8MHx8fDA%3D'
            />
          </div>
          <div className='about-message'>
            <div className='about-message-title'>About</div>
            <div className='about-message-content'>
              Donec laoreet ante et nisi ultrices lacinia. Phasellus facilisis sapien ex. Vivamus ac nulla blandit
              ligula vulputate convallis. Mauris ut felis sit amet lectus vehicula ullamcorper quis at est. Dictumst
              malesuada nostra eget tincidunt curabitur aliquet viverra platea. Felis augue fusce platea in nostra.
              Vehicula venenatis iaculis enim accumsan Link.
            </div>
            <div className='about-read-more-btn'>
              <Link href=''>
                Read more <img className='arrow' alt='Arrow' src='/img/arrow-2.svg' />
              </Link>
            </div>
          </div>
        </section>
        <section className='faq'>
          <div className='faq-title'>Frequently Asked Questions</div>
          <FaqAccordion faqData={faqData} faqTitle={'Frequently Asked Questions'} />

          {/* <div className='faq-question'>
            <div className='faq-question-no'>
              <p>FAQ Question 1</p>
              <div className='faq-collapse-icon'>-</div>
            </div>
            <div className='faq-message'>
              Molestie sit facilisi risus maecenas amet nisi iaculis. Maximus ipsum velit si amet luctus. Ac erat mi
              duis euismod suscipit lorem.
            </div>
          </div>
          <div className='faq-question'>
            <div className='faq-question-no'>
              <p>FAQ Question 2</p>
              <div className='faq-collapse-icon'>+</div>
            </div>
            <div className='faq-message'></div>
          </div>
          <hr className='faq-divider' />

          <div className='faq-question'>
            <div className='faq-question-no'>
              <p>FAQ Question 3</p>
              <div className='faq-collapse-icon'>+</div>
            </div>
            <div className='faq-message'></div>
          </div>
          <hr className='faq-divider' />

          <div className='faq-question'>
            <div className='faq-question-no'>
              <p>FAQ Question 4</p>
              <div className='faq-collapse-icon'>+</div>
            </div>
            <div className='faq-message'></div>
          </div>
          <hr className='faq-divider' />

          <div className='faq-question'>
            <div className='faq-question-no'>
              <p>FAQ Question 5</p>
              <div className='faq-collapse-icon'>+</div>
            </div>
            <div className='faq-message'></div>
          </div> */}
        </section>

        <section className='subscription'>
          <div className='subscription-details'>
            <div className='join-agermax'>Haven’t joined Agermax yet?</div>
            <div className='get-started'>Let’s get you started.</div>
            <div className='subscription-form'>
              <input className='subscription-email' type='email' placeholder='Email' />
              <div href='' className='subscription-reg-wrapper'>
                <Link href='' className='subscription-register'>
                  Register
                </Link>
              </div>
            </div>
            <div className='subscribe'>
              <input type='checkbox' />
              <p>Subscribe to receive event and promotion notifications.</p>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}

const EventsGenreButtons = ({ genreList }) => {
  return (
    <div className='events-genre-buttons'>
      {genreList.map(genre => (
        <Link href={genre.page} className='genre-btn'>
          {' '}
          {genre.icon} {genre.title}{' '}
        </Link>
      ))}
    </div>
  )
}

const Footer = () => {
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

const FaqAccordion = ({ faqTitle, faqData }) => {
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

export default FaqAccordion
