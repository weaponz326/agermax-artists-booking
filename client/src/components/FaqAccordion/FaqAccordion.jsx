// import { faqData } from '../mock-data-apis/Mock-data'
import styles from './faqAccordion.module.css'
import { useState } from 'react'
// import { CSSTransition } from 'react-transition-group'

const FaqAccordion = ({ faqTitle, faqData }) => {
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
          <div className={styles['faq-divider']}></div>
        </div>
      ))}
    </div>
  )
}

export default FaqAccordion
