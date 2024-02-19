import React, { useEffect, useState } from 'react'
import styles from './SlideInModal.module.css'
import TabButton from '../ViewTab/TabButton'
import { Close } from '@material-ui/icons'

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
            <Close />
          </TabButton>
          {modalContent}
        </div>
        <div onClick={hideModal} className={styles.modalBackdrop}></div>
      </>
    )
  }

  return null
}

export default SlideInModal
