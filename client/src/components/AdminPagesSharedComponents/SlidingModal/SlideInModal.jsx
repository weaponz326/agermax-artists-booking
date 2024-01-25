import React, { useEffect, useState } from 'react'
import styles from './SlideInModal.module.css'

const SlideInModal = ({ openModal }) => {
  const [showModal, setShowModal] = useState(openModal)
  useEffect(() => {
    console.log('Modal state changed!')
  }, [showModal])

  function closeModal() {
    setShowModal(false)
    console.log('clossed!')
  }

  if (showModal) {
    return (
      <>
        <div className={styles.modalCardContent}></div>
        <div onClick={closeModal} className={styles.modalBackdrop}></div>
      </>
    )
  }
}

export default SlideInModal
