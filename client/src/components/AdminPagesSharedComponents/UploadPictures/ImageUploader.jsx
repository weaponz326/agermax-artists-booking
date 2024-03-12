import { Upload, message } from 'antd'
import { LoadingOutlined, PlusOutlined } from '@ant-design/icons'
import axios from 'axios'
import { useState } from 'react'
const baseUrl = process.env.NEXT_PUBLIC_API_URL

function ImageUploader({ onChange, booking }) {
  const [imageUrl, setImageUrl] = useState(null)
  const [loading, setLoading] = useState(false)

  const uploadButton = (
    <div>
      {loading ? <LoadingOutlined /> : <PlusOutlined />}
      <div style={{ marginTop: 8 }}>Upload</div>
    </div>
  )

  const handleChange = async info => {
    if (info.file.status === 'uploading') {
      setLoading(true)
      return
    }
    if (info.file.status === 'done') {
      setLoading(false)
      setImageUrl(info.file.response.url)
      onChange(info.file.response.url) // Pass the uploaded image URL to parent component
    }
  }

  const customRequest = async ({ file, onSuccess }) => {
    try {
      const formData = new FormData()
      formData.append('mainBanner', file)
      const response = await axios.put(`${baseUrl}/bookings/${booking._id}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      })
      onSuccess(response.data)
      return response.data
    } catch (error) {
      console.log(error, 'mainBanner upload failed')
      // setLoading(false)
    }
  }

  return (
    <Upload
      name='image'
      listType='picture-card'
      showUploadList={false}
      customRequest={customRequest}
      onChange={handleChange}
    >
      {imageUrl ? <img src={imageUrl} alt='avatar' style={{ width: '100%' }} /> : uploadButton}
    </Upload>
  )
}

export default ImageUploader
