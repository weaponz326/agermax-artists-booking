import React, { useState } from 'react'
import { PlusOutlined } from '@ant-design/icons'
import { Modal, Upload } from 'antd'
import styles from './UploadPictures.module.css'
import axios from 'axios'
import { fi } from 'date-fns/locale'
const baseUrl = process.env.NEXT_PUBLIC_API_URL

const getBase64 = file =>
  new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.readAsDataURL(file)
    reader.onload = () => resolve(reader.result)
    reader.onerror = error => reject(error)
  })

const UploadPictures = ({
  listType,
  maxCount,
  booking,
  formData,
  setFormData,
  fileList,
  setFileList,
  singleFileUpload,
  multiFileUpload,
  buttonText
}) => {
  const [previewOpen, setPreviewOpen] = useState(false)
  const [previewImage, setPreviewImage] = useState('')
  const [previewTitle, setPreviewTitle] = useState('')
  //Custom Request
  const [imageUrl, setImageUrl] = useState(null)
  const [loading, setLoading] = useState(false)

  const handleCancel = () => setPreviewOpen(false)
  const handlePreview = async file => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj)
    }
    setPreviewImage(file.url || file.preview)
    setPreviewOpen(true)
    setPreviewTitle(file.name || file.url.substring(file.url.lastIndexOf('/') + 1))
  }

  const handleChange = ({ fileList: newFileList }) => {
    setFileList(newFileList)
    // setFormData({ ...formData, gallery: newFileList })
    // console.log(formData)
  }

  const uploadButton = (
    <button
      style={{
        border: 0,
        background: 'none'
      }}
      type='button'
      className={styles.uploadPhotoBtn}
    >
      <PlusOutlined />
      <div
        style={{
          marginTop: 8
        }}
      >
        {buttonText ? buttonText : 'Upload'}
      </div>
    </button>
  )

  return (
    <>
      <Upload
        // action='https://run.mocky.io/v3/435e224c-44fb-4773-9faf-380c5e6a2188'
        listType={listType ? listType : 'picture'}
        fileList={fileList}
        maxCount={maxCount ? maxCount : undefined}
        onPreview={handlePreview}
        onChange={handleChange}
        customRequest={listType ? multiFileUpload : singleFileUpload}
      >
        {fileList && fileList.length >= 8 ? null : uploadButton}
      </Upload>
      <Modal open={previewOpen} title={previewTitle} footer={null} onCancel={handleCancel}>
        <img
          alt='example'
          style={{
            width: '100%'
          }}
          src={previewImage}
        />
      </Modal>
    </>
  )
}
export default UploadPictures
