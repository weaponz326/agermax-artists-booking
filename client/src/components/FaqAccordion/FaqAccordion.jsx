// import { faqData } from '../mock-data-apis/Mock-data'
import styles from './faqAccordion.module.css'
import { useState } from 'react'
import Accordion from '@mui/material/Accordion'
import AccordionActions from '@mui/material/AccordionActions'
import AccordionSummary from '@mui/material/AccordionSummary'
import AccordionDetails from '@mui/material/AccordionDetails'
// import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import Button from '@mui/material/Button'
import { ExpandLess, ExpandMore } from '@material-ui/icons'
// import { CSSTransition } from 'react-transition-group'

const FaqAccordion = ({ faqTitle, faqData }) => {
  const [openIndex, setOpenIndex] = useState(0)

  const handleToggle = index => {
    setOpenIndex(prevIndex => (prevIndex === index ? null : index))
  }

  return (
    <div className={styles['faq-questions']}>
      {faqData.map((faq, index) => (
        <Accordion key={index}>
          <AccordionSummary
            className={styles['question-element']}
            expandIcon={<ExpandMore />}
            aria-controls='panel1-content'
            id='panel1-header'
          >
            {faq.question}
          </AccordionSummary>
          <AccordionDetails className={styles['answer']}>{faq.answer}</AccordionDetails>
        </Accordion>
      ))}
    </div>
  )
}

export default FaqAccordion
