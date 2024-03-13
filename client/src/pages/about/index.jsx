import CustomPagesLayout from 'src/layouts/CustomPagesLayout'
import styles from './about.module.css'
import { FaInstagram, FaTwitter, FaFacebook } from 'react-icons/fa'
// import Image from 'next/image'
import FaqAccordion from 'src/components/FaqAccordion/FaqAccordion'
import { faqData } from 'src/components/mock-data-apis/mock-data'
import TestimonialCarousel from 'src/components/TestimonialCarousel/TestimonialCarousel'
// import ContactForm from 'src/components/ContactForm/ContactForm'
// import RangeDatePicker from 'src/components/RangeDatePicker/RangeDatePicker'

const AboutPage = () => {
  return (
    <CustomPagesLayout>
      <div className={styles['about-container']}>
        <div className={styles.aboutPage}>
          <section className={styles.aboutSection}>
            <div className={styles.aboutContent}>
              <div className={styles.aboutText}>
                <h2>About Agermax</h2>
                <p>
                  We understand the importance of your event, and our dedicated support team is here to ensure
                  everything runs smoothly. From initial inquiries to the day of the event, we are committed to
                  providing unmatched assistance to both performers and event organizers.
                </p>
              </div>
              <div className={styles.aboutImageContainer}>
                <img
                  src={'/images/rectangle-22462.png'}
                  alt='Artist performing'
                  loading='eager'
                  height={250}
                  width={250}
                  // style={styles.aboutImage}
                />
              </div>
            </div>
          </section>

          <section className={styles.testimonialsSection}>
            <h2>Testimonials</h2>
            <div className={styles.testimonials}>
              <TestimonialCarousel />
            </div>
          </section>

          <section className={styles.faqSection}>
            <h2>Frequently Asked Questions</h2>
            <FaqAccordion faqData={faqData} />
          </section>

          <section className={styles.contactSection}>
            <h2>Contact us</h2>
            {/* <ContactForm /> */}
            <div className={styles.contactDetails}>
              <p>Email: artist@example.com</p>
              <p>Phone: +1 (123) 456-7890</p>
              <div className={styles.socialMedia}>
                <a href='https://www.instagram.com/' target='_blank' rel='noopener noreferrer'>
                  <FaInstagram size={24} />
                </a>
                <a href='https://twitter.com/' target='_blank' rel='noopener noreferrer'>
                  <FaTwitter size={24} />
                </a>
                <a href='https://www.facebook.com/' target='_blank' rel='noopener noreferrer'>
                  <FaFacebook size={24} />
                </a>
              </div>
            </div>
          </section>

          <section className={styles.gallerySection}>
            <h2>Gallery</h2>
            <div className={styles.gallery}>
              {/* Gallery images go here */}
              <div className={styles.galleryItem}>
                <img src='https://source.unsplash.com/2IWH9bxZAqo' alt='Event 1' height={200} width={250} />
              </div>
              <div className={styles.galleryItem}>
                <img src='https://source.unsplash.com/L0k0G-CoxTc' alt='Event 2' height={200} width={250} />
              </div>
              {/* More gallery items go here */}
            </div>
          </section>
        </div>
      </div>
    </CustomPagesLayout>
  )
}

export default AboutPage

AboutPage.authGuard = false
AboutPage.guestGuard = false
AboutPage.acl = {
  action: 'manage',
  subject: 'all' // Adjust the permissions as per your application's ACL configuration
}

AboutPage.getLayout = page => <div>{page}</div>
{
  /* <div className='text-alone'>
<h1>About Us</h1>
<p>
  Welcome to Agermax, where music and talent collide to create unforgettable experiences. We are more than
  just a platform; we're your gateway to discovering, booking, and celebrating exceptional music artists from
  around the world.
</p>
<h2>Our Mission</h2>
<p>
  At Agermax, our mission is to connect music enthusiasts, event organizers, and talented artists in a
  seamless and inspiring way. We believe in the power of live music to transform moments into memories, and
  our platform is designed to make this connection effortless.
</p>
<h2>What Sets Us Apart</h2>
<h3>Curated Talent</h3>
<p>
  At Agermax, our mission is to connect music enthusiasts, event organizers, and talented artists in a
  seamless and inspiring way. We believe in the power of live music to transform moments into memories, and
  our platform is designed to make this connection effortless.
</p>
<h3>Seamless Booking</h3>
<p>
  Booking your favorite artist has never been easier. With our user-friendly interface, you can browse through
  profiles, check availability, and secure bookings with just a few clicks. Say goodbye to the hassle of
  traditional booking processes.
</p>
<h3>Unmatched Support</h3>
<p>
  We understand the importance of your event, and our dedicated support team is here to ensure everything runs
  smoothly. From initial inquiries to the day of the event, we are committed to providing unmatched assistance
  to both artists and event organizers.
</p>
<h2>Join the Agermax Community</h2>
<p>
  Whether you're an artist ready to showcase your talent or an event organizer searching for the perfect act,
  Agermax welcomes you to join our vibrant community. Together, let's create musical experiences that leave a
  lasting impression.
</p>
<h2>Contact Us</h2>
<p>
  Have questions or want to learn more? Reach out to our team at contact@agermax.com or use our contact form.
  Thank you for being a part of the Agermax journey. Let the music play!
</p>
</div> */
}
