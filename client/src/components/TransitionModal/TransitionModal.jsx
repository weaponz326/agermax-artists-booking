import * as React from 'react'
import Backdrop from '@mui/material/Backdrop'
import Box from '@mui/material/Box'
import Modal from '@mui/material/Modal'
import Fade from '@mui/material/Fade'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import Slide from '@mui/material/Slide'
import { borderRadius, minHeight } from '@mui/system'

const style = {
  position: 'absolute',
  top: '2%',
  right: '5%',
  transform: 'translate(-50%, -50%)',
  width: 460,
  bgcolor: 'white',
  border: 'none',
  borderRadius: '36px',
  minHeight: '95%',
  boxShadow: 24,
  boxShadow: '0px 10px 30px #183D4C',
  p: 5
}

export default function TransitionsModal({ modalContent, btnClassName }) {
  const [open, setOpen] = React.useState(false)
  const handleOpen = () => setOpen(true)
  const handleClose = () => setOpen(false)

  return (
    <div>
      <Button
        sx={{
          background: 'var(--button-color)',
          color: 'white',
          ':hover': { background: '#f07a4b' },
          margin: '5px 0'
        }}
        className={btnClassName}
        onClick={handleOpen}
      >
        Book Now
      </Button>
      <Modal
        aria-labelledby='transition-modal-title'
        aria-describedby='transition-modal-description'
        open={open}
        onClose={handleClose}
        closeAfterTransition
        slots={{ backdrop: Backdrop }}
        slotProps={{
          backdrop: {
            timeout: 400
          }
        }}
      >
        <Slide direction='left' in={open} mountOnEnter unmountOnExit>
          <Box sx={style}>{modalContent}</Box>
        </Slide>
      </Modal>
    </div>
  )
}
