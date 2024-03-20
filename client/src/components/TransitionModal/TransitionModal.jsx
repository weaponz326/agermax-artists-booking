import Backdrop from '@mui/material/Backdrop'
import Box from '@mui/material/Box'
import Modal from '@mui/material/Modal'
import Button from '@mui/material/Button'
import Slide from '@mui/material/Slide'
import { useAuth } from 'src/hooks/useAuth'
import styles from './TransitionModal.module.css'

import React, { useState } from 'react'
import { Drawer, Space } from 'antd'

const style = {
  position: 'absolute',
  top: '2%',
  right: '5%',
  transform: 'translate(-50%, -50%)',
  width: 460,
  bgcolor: 'white',
  border: 'none',
  borderRadius: '36px',
  height: '95%',
  maxHeight: '65rem',
  boxShadow: 24,
  boxShadow: '0px 10px 30px #183D4C',
  p: 5,
  overflow: 'auto'
}

export default function TransitionsModal({ modalContent, btnClassName, open, setOpen }) {
  const { user, logout, loading, login } = useAuth()
  const handleOpen = () => {
    if (user) setOpen(true)
    else {
      logout()
    }
  }
  const handleClose = () => setOpen(false)

  const onClose = () => {
    setOpen(false)
  }

  return (
    <div>
      <Button
        sx={{
          background: 'var(--button-color)',
          color: 'white',
          ':hover': { background: '#f07a4b' },
          margin: '5px 0',
          borderRadius: '12px'
        }}
        className={btnClassName}
        onClick={handleOpen}
      >
        Book Now
      </Button>
      <Drawer
        styles={{ wrapper: { boxShadow: 'none', top: '5px', right: '20px', padding: '0' } }}
        style={{ height: '840px', boxShadow: 'none', borderRadius: '24px', padding: '0px' }}
        width={470}
        closeIcon={false}
        // title={`Drawer`}
        variant='persistent'
        anchor='right'
        className={styles.drawer}
        placement='right'
        // size={size}
        onClose={onClose}
        open={open}
        // extra={
        //   <Space>
        //     <Button onClick={onClose}>Cancel</Button>
        //     <Button type='primary' onClick={onClose}>
        //       OK
        //     </Button>
        //   </Space>
        // }
      >
        {modalContent}
      </Drawer>
    </div>
  )
}
