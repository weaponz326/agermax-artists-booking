import React, { useState } from 'react'
import { Button, Drawer } from 'antd'
const SideDrawer = () => {
  const [open, setOpen] = useState(false)
  const showDrawer = () => {
    setOpen(true)
  }
  const onClose = () => {
    setOpen(false)
  }
  return (
    <>
      <Button type='primary' onClick={showDrawer}>
        Open
      </Button>
      <Drawer title='Basic Drawer' onClose={onClose} open={open}>
        <p>Some contents...</p>
        <p>Some contents...</p>
        <p>Some contents...</p>
      </Drawer>
    </>
  )
}
export default SideDrawer
