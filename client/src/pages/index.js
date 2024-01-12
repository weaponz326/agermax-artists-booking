// pages/index.js
import { styled } from '@mui/material/styles'
import Box from '@mui/material/Box'
import BlankLayoutWithAppBar from '../@core/layouts/BlankLayoutWithAppBar' // Adjust the import path as necessary
import { Homepage } from 'src/components/Homepage'

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

const Home = () => {
  return (
    <div>
      <Homepage />
    </div>

    // <LandingPageContentWrapper>
    /* <h1>Welcome to Our Artists Management Platform</h1>
      <p>Discover events, manage bookings, and connect with artists from around the world.</p>
      Additional content goes here */
    /* </LandingPageContentWrapper> */
  )
}

// Override the default guard behavior for this page
Home.authGuard = false
Home.guestGuard = false
Home.acl = {
  action: 'manage',
  subject: 'all' // Adjust the permissions as per your application's ACL configuration
}

// Set a custom layout for the Home page that doesn't include the AppBar and TopBar
// Home.getLayout = page => <BlankLayoutWithAppBar>{page}</BlankLayoutWithAppBar>
Home.getLayout = page => <div>{page}</div>

export default Home
