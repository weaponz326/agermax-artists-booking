import React, { useState } from 'react'
import { Button, Modal } from 'antd'

const ServerActionModal = ({ open, setOpen, modalText, okText, titleText, onOk }) => {
  const [confirmLoading, setConfirmLoading] = useState(false)
  // const [modalText, setModalText] = useState('Content of the modal')
  const showModal = () => {
    setOpen(true)
  }
  const handleOk = () => {
    // setModalText('The modal will be closed after two seconds')
    setConfirmLoading(true)
    setTimeout(() => {
      setOpen(false)
      setConfirmLoading(false)
    }, 2000)
  }
  const handleCancel = () => {
    // console.log('Clicked cancel button')
    setOpen(false)
  }
  return (
    <>
      {/* <Button type='primary' onClick={showModal}>
        Open Modal with async logic
      </Button> */}
      <Modal
        okText={okText}
        title={titleText}
        open={open}
        onOk={onOk}
        confirmLoading={confirmLoading}
        onCancel={handleCancel}
      >
        <p>{modalText}</p>
      </Modal>
    </>
  )
}
export default ServerActionModal
