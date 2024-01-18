// components/ContactForm.js

import React, { useState } from 'react'
import styles from './ContactForm.module.css'

const ContactForm = () => {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [message, setMessage] = useState('')

  const handleSubmit = e => {
    e.preventDefault()
    // Implement your logic for handling the form submission (e.g., send to a server, etc.)
    console.log('Form submitted:', { name, email, message })
    // Reset form fields
    setName('')
    setEmail('')
    setMessage('')
  }

  return (
    <div className={styles.contactForm}>
      <h2>Contact Us</h2>
      <form className={styles['contact-form']} onSubmit={handleSubmit}>
        <label className={styles['contact-form-label']}>
          Name:
          <input type='text' value={name} onChange={e => setName(e.target.value)} />
        </label>
        <label>
          Email:
          <input
            className={styles['contact-form-input-email']}
            type='email'
            value={email}
            onChange={e => setEmail(e.target.value)}
          />
        </label>
        <label>
          Message:
          <textarea
            className={styles['contact-inform-input-text']}
            value={message}
            onChange={e => setMessage(e.target.value)}
          />
        </label>
        <button type='submit'>Submit</button>
      </form>
    </div>
  )
}

export default ContactForm
