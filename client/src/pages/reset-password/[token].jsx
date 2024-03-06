import { useState } from 'react'
import axios from 'axios'
import { useRouter } from 'next/router'
import Link from 'next/link'
import { Box, Button, Typography, IconButton, CardContent, Snackbar, Alert, InputAdornment, Avatar } from '@mui/material'
import { styled } from '@mui/material/styles'
import MuiCard from '@mui/material/Card'
import CustomTextField from 'src/@core/components/mui/text-field'
import Icon from 'src/@core/components/icon'
import themeConfig from 'src/configs/themeConfig'
import BlankLayout from 'src/@core/layouts/BlankLayout'

const Card = styled(MuiCard)(({ theme }) => ({
  [theme.breakpoints.up('sm')]: { width: '25rem' }
}))

const LinkStyled = styled(Link)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  textDecoration: 'none',
  justifyContent: 'center',
  color: theme.palette.primary.main,
  cursor: 'pointer'
}))

const OriginalResetPassword = () => {
  const [newPassword, setNewPassword] = useState('')
  const [confirmNewPassword, setConfirmNewPassword] = useState('')
  const [showNewPassword, setShowNewPassword] = useState(false)
  const [showConfirmNewPassword, setShowConfirmNewPassword] = useState(false)
  const [openSnackbar, setOpenSnackbar] = useState(false)
  const [snackbarMessage, setSnackbarMessage] = useState('')
  const [snackbarSeverity, setSnackbarSeverity] = useState('info')
  const router = useRouter()
  const { token } = router.query

  const handleSubmit = async e => {
    e.preventDefault()
    if (newPassword !== confirmNewPassword) {
      setSnackbarMessage("Passwords don't match")
      setSnackbarSeverity('error')
      setOpenSnackbar(true)
      return
    }

    try {
      await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/reset-password`, {
        resetToken: token,
        newPassword
      })
      setSnackbarMessage('Password has been reset successfully')
      setSnackbarSeverity('success')
      setOpenSnackbar(true)
      setTimeout(() => router.push('/login'), 3000)
    } catch (error) {
      setSnackbarMessage(error.response?.data?.message || 'An error occurred')
      setSnackbarSeverity('error')
      setOpenSnackbar(true)
    }
  }

  return (
    <Box className='content-center'>
      <Card>
        <CardContent sx={{ p: 5 }}>
          <Box sx={{ mb: 8, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Avatar src='/images/logo.png' alt='Logo' />
            <Typography variant='h3' sx={{ ml: 2.5, fontWeight: 700 }}>
              {themeConfig.templateName}
            </Typography>
          </Box>
          <form noValidate autoComplete='off' onSubmit={handleSubmit}>
            <CustomTextField
              autoFocus
              fullWidth
              label='New Password'
              type={showNewPassword ? 'text' : 'password'}
              value={newPassword}
              onChange={e => setNewPassword(e.target.value)}
              InputProps={{
                endAdornment: (
                  <InputAdornment position='end'>
                    <IconButton
                      onClick={() => setShowNewPassword(!showNewPassword)}
                      onMouseDown={e => e.preventDefault()}
                    >
                      <Icon icon={showNewPassword ? 'tabler:eye-off' : 'tabler:eye'} />
                    </IconButton>
                  </InputAdornment>
                )
              }}
              sx={{ mb: 3 }}
            />
            <CustomTextField
              fullWidth
              label='Confirm New Password'
              type={showConfirmNewPassword ? 'text' : 'password'}
              value={confirmNewPassword}
              onChange={e => setConfirmNewPassword(e.target.value)}
              InputProps={{
                endAdornment: (
                  <InputAdornment position='end'>
                    <IconButton
                      onClick={() => setShowConfirmNewPassword(!showConfirmNewPassword)}
                      onMouseDown={e => e.preventDefault()}
                    >
                      <Icon icon={showConfirmNewPassword ? 'tabler:eye-off' : 'tabler:eye'} />
                    </IconButton>
                  </InputAdornment>
                )
              }}
              sx={{ mb: 4 }}
            />
            <Button fullWidth type='submit' variant='contained'>
              Set New Password
            </Button>
          </form>
          <Typography sx={{ mt: 4, textAlign: 'center' }}>
            <LinkStyled href='/login' passHref>
              <Typography component='a' sx={{ display: 'flex', alignItems: 'center', textDecoration: 'none', color: 'primary.main' }}>
                <Icon fontSize='small' icon='tabler:chevron-left' />
                Back to login
              </Typography>
            </LinkStyled>
          </Typography>
        </CardContent>
      </Card>
      <Snackbar open={openSnackbar} autoHideDuration={6000} onClose={() => setOpenSnackbar(false)}>
        <Alert onClose={() => setOpenSnackbar(false)} severity={snackbarSeverity} sx={{ width: '100%' }}>
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </Box>
  )
}

OriginalResetPassword.getLayout = page => <BlankLayout>{page}</BlankLayout>
OriginalResetPassword.guestGuard = true

export default OriginalResetPassword
