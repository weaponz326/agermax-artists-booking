import React from "react";
import { Component } from "../../components/Component";
import { IconsansBoldArrowRight } from "../../icons/IconsansBoldArrowRight";
import { IconsansBoldClock3 } from "../../icons/IconsansBoldClock3";
import Header from "../../components/header";
import "./homepage.css";
import EventPreview from "../../components/Component/EventPreview";

export const Homepage = () => {
  return (
    <div className="homepage">
      <Header />
      <main>
        <section className="events">
          <div className="upcoming-events">
            <span className="events-nav upcoming">Upcoming Events 🎉</span>
            <span className="events-nav see-all">See all</span>
          </div>
          <div className="events-genre-buttons">
            <div className="genre-btn">🎹 Pop</div>
            <div className="genre-btn">🎸 Rock</div>
            <div className="genre-btn">🎶 Trubadur</div>
            <div className="genre-btn">🎶 Trubadur</div>
            <div className="genre-btn">🎹 Pop</div>
          </div>
          <div className="events-preview">
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
          <div className="events-read-more-btn">
            <a href="">Load More... ➡️</a>
          </div>
        </section>
        <section className="about">
          <div className="about-img">
            <img alt="Rectangle" src="/img/rectangle-22462.png" />
          </div>
          <div className="about-message">
            <div className="about-message-title">About</div>
            <div className="about-message-content">
              Donec laoreet ante et nisi ultrices lacinia. Phasellus facilisis
              sapien ex. Vivamus ac nulla blandit ligula vulputate convallis.
              Mauris ut felis sit amet lectus vehicula ullamcorper quis at est.
              Dictumst malesuada nostra eget tincidunt curabitur aliquet viverra
              platea. Felis augue fusce platea in nostra. Vehicula venenatis
              iaculis enim accumsan a.
            </div>
            <div className="about-read-more-btn">
              <a href="">
                Read more{" "}
                <img className="arrow" alt="Arrow" src="/img/arrow-2.svg" />
              </a>
            </div>
          </div>
        </section>
        <section className="faq">
          <div className="faq-title">Frequently Asked Questions</div>
          <div className="faq-question">
            <div className="faq-question-no">
              <p>FAQ Question 1</p>
              <div className="faq-collapse-icon">-</div>
            </div>
            <div className="faq-message">
              Molestie sit facilisi risus maecenas amet nisi iaculis. Maximus
              ipsum velit si amet luctus. Ac erat mi duis euismod suscipit
              lorem.
            </div>
          </div>
          <hr className="faq-divider" />
          <div className="faq-question">
            <div className="faq-question-no">
              <p>FAQ Question 2</p>
              <div className="faq-collapse-icon">+</div>
            </div>
            <div className="faq-message"></div>
          </div>
          <hr className="faq-divider" />

          <div className="faq-question">
            <div className="faq-question-no">
              <p>FAQ Question 3</p>
              <div className="faq-collapse-icon">+</div>
            </div>
            <div className="faq-message"></div>
          </div>
          <hr className="faq-divider" />

          <div className="faq-question">
            <div className="faq-question-no">
              <p>FAQ Question 4</p>
              <div className="faq-collapse-icon">+</div>
            </div>
            <div className="faq-message"></div>
          </div>
          <hr className="faq-divider" />

          <div className="faq-question">
            <div className="faq-question-no">
              <p>FAQ Question 5</p>
              <div className="faq-collapse-icon">+</div>
            </div>
            <div className="faq-message"></div>
          </div>
        </section>

        <section className="subscription">
          <div className="subscription-details">
            <div className="join-agermax">Haven’t joined Agermax yet?</div>
            <div className="get-started">Let’s get you started.</div>
            <div className="subscription-form">
              <input
                className="subscription-email"
                type="email"
                placeholder="Email"
              />
              <div className="subscription-reg-wrapper">
                <a href="" className="subscription-register">
                  Register
                </a>
              </div>
            </div>
            <div className="subscribe">
              <input type="checkbox" />
              <p>Subscribe to receive event and promotion notifications.</p>
            </div>
          </div>
        </section>
      </main>
      <footer>
        <div className="links">
          <div className="logo">
            <img src="" alt="AgerMax Logo" />
            <div className="logo-text">Agermax</div>
          </div>
          <ul className="footer-nav">
            <li>Home</li>
            <li>About Us</li>
            <li>Contact</li>
            <li>Newsletter</li>
          </ul>
          <div className="social-media">
            <i class="fab fa-facebook-f">f</i>
            <i class="fab fa-twitter">t</i>
            <i class="fab fa-instagram">i</i>
          </div>
        </div>
        <div className="copyright-terms">
          <div className="copyright">@copyright 2024</div>
          <ul className="terms-privacy">
            <li>Terms</li>
            <li>Privacy Policy</li>
            <li>Cookies</li>
          </ul>
        </div>
      </footer>
    </div>
  );
};
