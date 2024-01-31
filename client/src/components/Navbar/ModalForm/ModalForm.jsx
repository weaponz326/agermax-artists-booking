import React, { useState } from 'react'
import { Modal, Form, Input, Button } from 'antd'

const YourComponent = () => {
  const [isModalVisible, setIsModalVisible] = useState(false)

  const showModal = () => {
    setIsModalVisible(true)
  }

  const handleCancel = () => {
    setIsModalVisible(false)
  }

  const onFinish = values => {
    console.log('Received values:', values)
    // Perform your form submission logic here
    setIsModalVisible(false)
  }

  return (
    <div>
      <Button type='primary' onClick={showModal}>
        Open Form Modal
      </Button>
      <Modal title='Your Form Title' visible={isModalVisible} onCancel={handleCancel} footer={null}>
        <Form onFinish={onFinish}>
          {/* Your form fields */}
          <Form.Item name='fieldName' label='Field Label' rules={[{ required: true, message: 'Field is required' }]}>
            <Input />
          </Form.Item>

          {/* Add more form fields as needed */}

          <Form.Item>
            <Button type='primary' htmlType='submit'>
              Submit
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  )
}

export default YourComponent
