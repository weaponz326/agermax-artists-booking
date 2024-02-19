import React, { useEffect, useState } from 'react'
import styles from './SlideInModal.module.css'
import TabButton from '../ViewTab/TabButton'

const SlideInModal = ({ openModal, unhideModal, hideModal, modalContent, saveButtonText, SubmitButton }) => {
  const [showModal, setShowModal] = useState(openModal)

  // Use useEffect to update the local state when openModal changes
  useEffect(() => {
    setShowModal(openModal)
  }, [openModal])

  if (showModal) {
    return (
      <>
        <div className={styles.modalCardContent}>
          <TabButton onClick={hideModal} className={styles.modalCardContentCloseButton}>
            X
          </TabButton>
          {modalContent}
          {/* {!SubmitButton && (
            <TabButton className={styles.modalCardContentSaveButton} onClick={hideModal}>
              {saveButtonText ? saveButtonText : 'Save'}
            </TabButton>
          )} */}
          {/* Add your modal content here */}
        </div>
        <div onClick={hideModal} className={styles.modalBackdrop}></div>
      </>
    )
  }

  return null
}

export default SlideInModal
