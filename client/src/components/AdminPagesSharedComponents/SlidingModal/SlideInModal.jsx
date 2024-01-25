import React, { useEffect, useState } from 'react'
import styles from './SlideInModal.module.css'

const SlideInModal = ({ openModal, setOpenModal, handleEdit }) => {
  const [showModal, setShowModal] = useState(openModal)

  function closeModal() {
    setShowModal(false)
    setOpenModal(false)
    console.log('closed!')
  }

  // Use useEffect to update the local state when openModal changes
  useEffect(() => {
    setShowModal(openModal)
  }, [openModal])

  if (showModal) {
    return (
      <>
        <div className={styles.modalCardContent}>
          {/* Add your modal content here */}
          <p>Modal Content</p>
          <button onClick={handleEdit}>Edit</button>
        </div>
        <div onClick={closeModal} className={styles.modalBackdrop}></div>
      </>
    )
  }

  return null
}

export default SlideInModal
