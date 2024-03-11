import React, { useState, useEffect, useCallback } from 'react'
import styles from './ImageUpload.module.css'

const ImageUpload = ({ formData, setFormData, profilePhoto, setProfilePhoto }) => {
  // Initial setup omitted for brevity

  const [file, setFile] = useState(null)
  const [previewUrl, setPreviewUrl] = useState('')
  const [loading, setLoading] = useState(false)

  const imagesTypes = ['jpeg', 'png', 'svg', 'gif']

  const fileValidate = useCallback(
    (fileType, fileSize) => {
      let isImage = imagesTypes.some(type => fileType.includes(`image/${type}`))
      if (!isImage) {
        alert('Please make sure to upload an Image')
        return false
      }
      if (fileSize > 5000000) {
        alert('Your Image Should be 5 MB or Less')
        return false
      }
      return true
    },
    [imagesTypes]
  )

  const uploadFile = useCallback(file => {
    if (!file) return
    setLoading(true)
    const fileReader = new FileReader()
    fileReader.onload = () => {
      setPreviewUrl(fileReader.result)
      setLoading(false)
    }
    fileReader.readAsDataURL(file)
  }, [])

  useEffect(() => {
    // Set initial previewUrl if profilePhoto is passed
    if (profilePhoto && !previewUrl) {
      setPreviewUrl(profilePhoto)
    }
  }, [profilePhoto, previewUrl])

  
  useEffect(() => {
    if (file && fileValidate(file.type, file.size)) {
      uploadFile(file)
    }
  }, [file, fileValidate, uploadFile])

  const onDrop = event => {
    event.preventDefault()
    const droppedFile = event.dataTransfer.files[0]
    setFile(droppedFile)
  }

  const onFileChange = event => {
    const chosenFile = event.target.files[0]
    console.log(chosenFile)
    setFile(chosenFile)
    // setProfilePhoto(chosenFile)
    setFormData({ ...formData, profilePhoto: chosenFile })
    console.log(formData)
  }
  const resetUploader = () => {
    setFile(null)
    setPreviewUrl('')
    setLoading(false)
    // Reset the upload area to its initial state
    const dropZoon = document.getElementById('dropZoon')
    dropZoon.classList.remove('drop-zoon--Uploaded')
    const fileDetails = document.getElementById('fileDetails')
    fileDetails.classList.remove('file-details--open')
  }

  return (
    <div className={styles.uploadArea}>
      <div
        id='dropZoon'
        className={styles.dropZoon}
        onDragOver={e => e.preventDefault()}
        onDrop={onDrop}
        onClick={() => document.getElementById('fileInput').click()}
      >
        <div className={styles.uploadBtn}>
          <span className={styles.dropZoonIcon}>
            <i className='bx bxs-file-image'></i>
            <span>Image</span>
          </span>
        </div>
        {loading && <span className={styles.loadingText}>Loading</span>}
        {previewUrl && <img src={previewUrl} alt='Preview' className={styles.previewImage} />}
        <input type='file' id='fileInput' className={styles.fileInput} accept='image/*' onChange={onFileChange} />
      </div>

      <div id='fileDetails' className={`${styles.fileDetails} ${file ? styles.fileDetailsOpen : ''}`}>
        <div className={`${styles.uploadedFile} ${file ? styles.uploadedFileOpen : ''}`}>
          <div className={styles.iconContainer}>
            <i className='bx bxs-file-blank'></i>
            <span className={styles.iconText}>{file ? file.type.split('/')[1] : ''}</span>
          </div>

          <div className={styles.uploadedFileInfo}>
            <span className={styles.fileName}>{file ? file.name : ''}</span>
            <span className={`${styles.uploadedFileCounter} ${file ? styles.uploadedFileCounterActive : ''}`}>
              {file ? '100%' : '0%'} {/* Dynamic percentage */}
            </span>{' '}
          </div>
          <strong className={styles.tooltip}>
            <span className={styles.tooltipData}>{imagesTypes.join(', .')}</span>
          </strong>
          {previewUrl && (
            <div className={styles.deleteButton} onClick={resetUploader}>
              <svg xmlns='http://www.w3.org/2000/svg' height='14' width='14' viewBox='0 0 448 512'>
                <path
                  d='M135.2 17.7L128 32H32C14.3 32 0 46.3 0 64S14.3 96 32 96H416c17.7 0 32-14.3 32-32s-14.3-32-32-32H320l-7.2-14.3C307.4 6.8 296.3 0 284.2 0H163.8c-12.1 0-23.2 6.8-28.6 17.7zM416 128H32L53.2 467c1.6 25.3 22.6 45 47.9 45H346.9c25.3 0 46.3-19.7 47.9-45L416 128z'
                  fill='#ce0f0f'
                />
              </svg>{' '}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default ImageUpload
