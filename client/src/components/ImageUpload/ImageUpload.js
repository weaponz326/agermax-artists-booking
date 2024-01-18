import React, { useState, useEffect, useCallback } from 'react';
import styles from './ImageUpload.module.css';

const ImageUpload = () => {
  const [file, setFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState('');
  const [loading, setLoading] = useState(false);
  const [progress, setProgress] = useState(0);

  const imagesTypes = ["jpeg", "png", "svg", "gif"];

  const fileValidate = useCallback((fileType, fileSize) => {
    // File Type Validation
    let isImage = imagesTypes.filter((type) => fileType.indexOf(`image/${type}`) !== -1);
    // Check type and size validation
    if (isImage.length === 0) {
      alert('Please make sure to upload an Image');
      return false;
    }
    if (fileSize > 5000000) { // 5MB
      alert('Your Image Should be 5 MB or Less');
      return false;
    }
    return true;
  }, [imagesTypes]);

  const uploadFile = useCallback((file) => {
    if (!file) return;

    setLoading(true);
    const fileReader = new FileReader();
    fileReader.onload = () => {
      setPreviewUrl(fileReader.result);
      setLoading(false);
      // Implement your upload logic here
    };
    fileReader.readAsDataURL(file);
  }, []);

  useEffect(() => {
    if (file) {
      if (fileValidate(file.type, file.size)) {
        uploadFile(file);
      } else {
        setFile(null);
      }
    }
  }, [file, fileValidate, uploadFile]);

  const onDrop = (event) => {
    event.preventDefault();
    const droppedFile = event.dataTransfer.files[0];
    setFile(droppedFile);
  };

  const onFileChange = (event) => {
    const chosenFile = event.target.files[0];
    setFile(chosenFile);
  };

  const resetUploader = () => {
    setFile(null);
    setPreviewUrl('');
    setLoading(false);
    setProgress(0);
  };

  // Progress Counter Increase Function
  const progressMove = () => {
    let counter = 0;
    let counterIncrease = setInterval(() => {
      if (counter === 100) {
        clearInterval(counterIncrease);
      } else {
        counter += 10;
        setProgress(counter);
      }
    }, 100);
  };

  useEffect(() => {
    if (!loading && file) {
      progressMove();
    }
  }, [loading, file]);

  return (
    <div id="uploadArea" className={styles.uploadArea}>
      <div
        id="dropZoon"
        className={styles.dropZoon}
        onDragOver={(e) => e.preventDefault()}
        onDrop={onDrop}
        onClick={() => document.getElementById('fileInput').click()}
      >
        <div className={styles.uploadBtn}>
          <span className={styles.dropZoonIcon}>
            <i className='bx bxs-file-image btn-icon'></i>
            <span className={styles.btnText}>Image</span>
          </span>
        </div>
        {loading && <span id="loadingText" className={styles.loadingText}>Loading</span>}
        {previewUrl && <img src={previewUrl} alt="Preview" className={styles.previewImage} />}
        <input
          type="file"
          id="fileInput"
          className={styles.fileInput}
          accept="image/*"
          onChange={onFileChange}
        />
      </div>

      <div id="fileDetails" className={`${styles.fileDetails} ${file ? styles.open : ''}`}>
        <div id="uploadedFile" className={`${styles.uploadedFile} ${file ? styles.open : ''}`}>
          <div className={styles.iconContainer}>
            <i className='bx bxs-file-blank'></i>
            <span className={styles.iconText}>{file ? file.type.split('/')[1] : ''}</span>
          </div>

          <div id="uploadedFileInfo" className={styles.fileInfo}>
            <span className={styles.fileName}>{file ? file.name : ''}</span>
            <span className={styles.fileCounter}>{progress}%</span>
          </div>
          <strong className={styles.tooltip}>
            <span className={styles.tooltipData}>{imagesTypes.join(', .')}</span>
          </strong>
          <div id="deleteButton" className={styles.deleteButton} role="button" tabIndex="0" onClick={resetUploader}>
            {/* SVG here */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ImageUpload;
