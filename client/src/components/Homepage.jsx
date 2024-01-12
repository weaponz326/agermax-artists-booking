import React from 'react'
import Header from './Header'
import { MdFacebook } from 'react-icons/md'
import { FaInstagram, FaTwitter } from 'react-icons/fa'
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
              <a href=''>See all</a>
            </span>
          </div>
          <div className='events-genre-buttons'>
            <a href='' className='genre-btn'>
              🎹 Pop
            </a>
            <a href='' className='genre-btn'>
              🎸 Rock
            </a>
            <a href='' className='genre-btn'>
              🎶 Trubadur
            </a>
            <a href='' className='genre-btn'>
              🎶 Trubadur
            </a>
            <a href='' className='genre-btn'>
              🎹 Pop
            </a>
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
          <div className='events-read-more-btn'>
            <a href=''>Load More... ➡️</a>
          </div>
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
              Vehicula venenatis iaculis enim accumsan a.
            </div>
            <div className='about-read-more-btn'>
              <a href=''>
                Read more <img className='arrow' alt='Arrow' src='/img/arrow-2.svg' />
              </a>
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
              <a href='' className='subscription-reg-wrapper'>
                <a href='' className='subscription-register'>
                  Register
                </a>
              </a>
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
          <a href='' className='logo'>
            <img
              src='https://images.unsplash.com/photo-1510915361894-db8b60106cb1?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTJ8fG11c2ljfGVufDB8fDB8fHww'
              alt='AgerMax Logo'
            />
            <div className='logo-text'>AGERMAX</div>
          </a>
          <ul className='footer-nav'>
            <li>
              <a href=''>Home</a>
            </li>
            <li>
              <a href=''>About Us</a>
            </li>
            <li>
              <a href=''>Contact</a>
            </li>
            <li>
              <a href=''>Newsletter</a>
            </li>
          </ul>
          <div className='social-media'>
            <a href='' className='fab fa-facebook-f'>
              <MdFacebook />
            </a>
            <a href='' className='fab fa-twitter'>
              <FaTwitter />
            </a>
            <a href='' className='fab fa-instagram'>
              <FaInstagram />
            </a>
          </div>
        </div>
        <div className='copyright-terms'>
          <div className='copyright'>@Copyright 2024</div>
          <ul className='terms-privacy'>
            <li>
              <a href=''>Terms</a>
            </li>
            <li>
              <a href=''>Privacy Policy</a>
            </li>
            <li>
              <a href=''>Cookies</a>
            </li>
          </ul>
        </div>
      </footer>
    </div>
  )
}
