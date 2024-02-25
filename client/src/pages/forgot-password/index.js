import { useState } from 'react'
import axios from 'axios'
import { useRouter } from 'next/router'
import Link from 'next/link'
import { Box, Button, Typography, CardContent, Snackbar, Alert } from '@mui/material'
import { styled, useTheme } from '@mui/material/styles'
import MuiCard from '@mui/material/Card'
import Avatar from 'src/@core/components/mui/avatar'
import CustomTextField from 'src/@core/components/mui/text-field'
import Icon from 'src/@core/components/icon'
import themeConfig from 'src/configs/themeConfig'
import BlankLayout from 'src/@core/layouts/BlankLayout'

const Card = styled(MuiCard)(({ theme }) => ({
  [theme.breakpoints.up('sm')]: { width: '25rem' }
}))

const LinkStyled = styled('a')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  textDecoration: 'none',
  justifyContent: 'center',
  color: theme.palette.primary.main,
  fontSize: theme.typography.body1.fontSize,
  cursor: 'pointer'
}))

const ForgotPassword = () => {
  const theme = useTheme()
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [openSnackbar, setOpenSnackbar] = useState(false)
  const [snackbarMessage, setSnackbarMessage] = useState('')
  const [snackbarSeverity, setSnackbarSeverity] = useState('info')

  const handleSubmit = async e => {
    e.preventDefault()
    try {
      await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/forgot-password`, { email })
      setSnackbarMessage('Check your email for reset instructions')
      setSnackbarSeverity('success')
      setOpenSnackbar(true)
      // Redirect to the reset-password page for user to await email link
      // Assuming you have a page to handle awaiting instructions
      router.push('/awaiting-reset-instructions')
    } catch (error) {
      setSnackbarMessage(error.response?.data?.message || 'An unexpected error occurred')
      setSnackbarSeverity('error')
      setOpenSnackbar(true)
    }
  }

  const handleCloseSnackbar = (event, reason) => {
    if (reason === 'clickaway') {
      return
    }
    setOpenSnackbar(false)
  }

  return (
    <Box className='content-center'>
      <Card>
        <CardContent sx={{ p: 5 }}>
          <Box sx={{ mb: 8, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            {/* Ensure you have a valid path for the logo */}
            <Avatar src='/images/logo.png' alt='Logo' />
            <Typography variant='h3' sx={{ ml: 2.5, fontWeight: 700 }}>
              {themeConfig.templateName}
            </Typography>
          </Box>
          <Typography variant='h4' sx={{ mb: 1.5 }}>
            Forgot Password?
          </Typography>
          <Typography sx={{ mb: 4, color: 'text.secondary' }}>
            Enter your email and we'll send you instructions to reset your password
          </Typography>
          <form noValidate autoComplete='off' onSubmit={handleSubmit}>
            <CustomTextField
              autoFocus
              fullWidth
              type='email'
              label='Email'
              sx={{ mb: 4 }}
              placeholder='john.doe@gmail.com'
              value={email}
              onChange={e => setEmail(e.target.value)}
            />
            <Button fullWidth type='submit' variant='contained' sx={{ mb: 4 }}>
              Send reset link
            </Button>
            <Typography textAlign='center'>
              <Link href='/login' passHref>
                <LinkStyled>
                  <Icon fontSize='small' icon='tabler:chevron-left' />
                  Back to login
                </LinkStyled>
              </Link>
            </Typography>
          </form>
        </CardContent>
      </Card>
      <Snackbar open={openSnackbar} autoHideDuration={6000} onClose={handleCloseSnackbar}>
        <Alert onClose={handleCloseSnackbar} severity={snackbarSeverity} sx={{ width: '100%' }}>
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </Box>
  )
}

ForgotPassword.getLayout = page => <BlankLayout>{page}</BlankLayout>
ForgotPassword.guestGuard = true


export default ForgotPassword
