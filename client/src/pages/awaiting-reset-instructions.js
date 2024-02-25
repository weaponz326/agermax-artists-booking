// Next and React imports
import React from 'react'
import Link from 'next/link'

// MUI Components
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import CardContent from '@mui/material/CardContent'
import { styled } from '@mui/material/styles'
import MuiCard from '@mui/material/Card'
import Avatar from '@mui/material/Avatar'

// Layout Import
import BlankLayout from 'src/@core/layouts/BlankLayout'

// Styled Components
const Card = styled(MuiCard)(({ theme }) => ({
  [theme.breakpoints.up('sm')]: { width: '25rem' }
}))

const AwaitingResetInstructions = () => {
  return (
    <Box className='content-center'>
      <Card>
        <CardContent sx={{ p: 5, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <Avatar src='/images/logo.png' alt='Logo' sx={{ width: 56, height: 56, mb: 2 }} />
          <Typography variant='h5' sx={{ mb: 2, fontWeight: 700 }}>
            Check Your Email
          </Typography>
          <Typography variant='body1' textAlign='center' sx={{ mb: 3 }}>
            We have sent password reset instructions to your email. Please check your inbox and follow the instructions
            to reset your password.
          </Typography>
          <Typography variant='subtitle2' sx={{ mb: 3 }}>
            If you don't receive an email, and it's not in your spam folder this could mean you signed up with a
            different address.
          </Typography>
          <Button variant='contained' component={Link} href='/login'>
            Back to Login
          </Button>
        </CardContent>
      </Card>
    </Box>
  )
}

AwaitingResetInstructions.getLayout = page => <BlankLayout>{page}</BlankLayout>
AwaitingResetInstructions.guestGuard = true

export default AwaitingResetInstructions
