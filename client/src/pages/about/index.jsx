import React from 'react'
import Head from 'next/head'
import CustomPagesLayout from 'src/layouts/CustomPagesLayout'
import styles from './about.module.css'

const AboutPage = () => {
  return (
    <CustomPagesLayout>
      <div className={styles['about-container']}>
        <h1>About Us</h1>
        <p>
          Welcome to Agermax, where music and talent collide to create unforgettable experiences. We are more than just
          a platform; we're your gateway to discovering, booking, and celebrating exceptional music artists from around
          the world.
        </p>
        <h2>Our Mission</h2>
        <p>
          At Agermax, our mission is to connect music enthusiasts, event organizers, and talented artists in a seamless
          and inspiring way. We believe in the power of live music to transform moments into memories, and our platform
          is designed to make this connection effortless.
        </p>
        <h2>What Sets Us Apart</h2>
        <h3>Curated Talent</h3>
        <p>
          At Agermax, our mission is to connect music enthusiasts, event organizers, and talented artists in a seamless
          and inspiring way. We believe in the power of live music to transform moments into memories, and our platform
          is designed to make this connection effortless.
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
