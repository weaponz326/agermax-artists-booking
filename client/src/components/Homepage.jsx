import React from 'react'
import Header from './Header'
import { MdFacebook, MdRefresh } from 'react-icons/md'
import { FaInstagram, FaTwitter } from 'react-icons/fa'
import Link from 'next/link'
// import './homepage.css'
// import '../styles/homepage.css'
import EventPreview from './Component/EventPreview'

export const Homepage = () => {
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
          <div className='events-genre-buttons'>
            <Link href='' className='genre-btn'>
              🎹 Pop
            </Link>
            <Link href='' className='genre-btn'>
              🎸 Rock
            </Link>
            <Link href='' className='genre-btn'>
              🎶 Trubadur
            </Link>
            <Link href='' className='genre-btn'>
              🎶 Trubadur
            </Link>
            <Link href='' className='genre-btn'>
              🎹 Pop
            </Link>
          </div>
          <div className='events-preview'>
            <EventPreview />
            <EventPreview />
            <EventPreview />
            <EventPreview />
            <EventPreview />
            <EventPreview />
            <EventPreview />
            <EventPreview />
            <EventPreview />
            <EventPreview />
            <EventPreview />
            <EventPreview />
            <EventPreview />
            <EventPreview />
            <EventPreview />
          </div>
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
          <div className='faq-question'>
            <div className='faq-question-no'>
              <p>FAQ Question 1</p>
              <div className='faq-collapse-icon'>-</div>
            </div>
            <div className='faq-message'>
              Molestie sit facilisi risus maecenas amet nisi iaculis. Maximus ipsum velit si amet luctus. Ac erat mi
              duis euismod suscipit lorem.
            </div>
          </div>
          <hr className='faq-divider' />
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
          </div>
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
            <Link href='' className='fab fa-facebook-f'>
              <MdFacebook />
            </Link>
            <Link href='' className='fab fa-twitter'>
              <FaTwitter />
            </Link>
            <Link href='' className='fab fa-instagram'>
              <FaInstagram />
            </Link>
          </div>
        </div>
        <div className='copyright-terms'>
          <div className='copyright'>@Copyright 2024</div>
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
    </div>
  )
}
