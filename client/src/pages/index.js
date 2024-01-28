// pages/index.js
import { styled } from '@mui/material/styles'
import Box from '@mui/material/Box'
import BlankLayoutWithAppBar from '../@core/layouts/BlankLayoutWithAppBar' // Adjust the import path as necessary
import HomePage from 'src/components/Homepage/Homepage'
import CustomPagesLayout from 'src/layouts/CustomPagesLayout'
import { useState } from 'react'

// Your styled component for the content
const LandingPageContentWrapper = styled(Box)(({ theme }) => ({
  textAlign: 'center',
  '& h1': {
    margin: theme.spacing(4, 0),
    color: theme.palette.text.primary
  },
  '& p': {
    margin: theme.spacing(2, 0),
    color: theme.palette.text.secondary
  }
}))

// <LandingPageContentWrapper>
/* <h1>Welcome to Our Artists Management Platform</h1>
  <p>Discover events, manage bookings, and connect with artists from around the world.</p>
  Additional content goes here */
/* </LandingPageContentWrapper> */
const Home = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false)

  return (
    <CustomPagesLayout isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn}>
      <HomePage isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />
    </CustomPagesLayout>
  )
}

// Override the default guard behavior for this page
Home.authGuard = false
Home.guestGuard = false
Home.acl = {
  action: 'manage',
  subject: 'all'
}

// Set a custom layout for the Home page that doesn't include the AppBar and TopBar
// Home.getLayout = page => <BlankLayoutWithAppBar>{page}</BlankLayoutWithAppBar>
Home.getLayout = page => <div>{page}</div>

export default Home
