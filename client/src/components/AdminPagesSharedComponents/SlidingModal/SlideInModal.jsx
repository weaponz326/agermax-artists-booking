import React, { useEffect, useState } from 'react'
import styles from './SlideInModal.module.css'
import TabButton from '../ViewTab/TabButton'
import { Camera } from 'iconsax-react'
import ImageUpload from 'src/components/ImageUpload/ImageUpload'

const SlideInModal = ({ openModal, unhideModal, hideModal }) => {
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
            x
          </TabButton>
          <div className={styles.modalCardContentPictureInput}>
            {/* <Camera /> */}
            <ImageUpload />
          </div>
          <div className={styles.modalCardContentUserDetails}>
            <input
              placeholder='Organization Number'
              className={styles.modalCardContentInputField}
              type='text'
              name=''
              id=''
            />
            <input placeholder='Company Name' className={styles.modalCardContentInputField} type='text' name='' id='' />
            <input
              placeholder='Company Address'
              className={styles.modalCardContentInputField}
              type='text'
              name=''
              id=''
            />
            <input
              placeholder='Organization Number'
              className={styles.modalCardContentInputField}
              type='text'
              name=''
              id=''
            />
            <input
              placeholder='Email Address'
              className={styles.modalCardContentInputField}
              type='text'
              name=''
              id=''
            />
            <input
              placeholder='Billing Address'
              className={styles.modalCardContentInputField}
              type='text'
              name=''
              id=''
            />
          </div>
          <div className={styles.modalCardContentUserProfile}>
            <div className={styles.modalCardContentUserProfileTitle}>Profile</div>
            <select className={styles.modalCardContentInputField} name='' id=''>
              <option>Member Type</option>
              <option>Organizer</option>
              <option>Artist</option>
              <option>Sponsor </option>
            </select>

            <input placeholder='Display Name' className={styles.modalCardContentInputField} type='text' name='' id='' />
          </div>
          <TabButton
            buttonStyle={{ color: 'white', background: '#4428F4', padding: '0.5rem', marginTop: 'auto' }}
            className={styles.modalCardContentSaveButton}
            onClick={hideModal}
          >
            Save
          </TabButton>
          {/* Add your modal content here */}
        </div>
        <div onClick={hideModal} className={styles.modalBackdrop}></div>
      </>
    )
  }

  return null
}

export default SlideInModal
