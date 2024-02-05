// pages/index.js
import HomePage from 'src/components/Homepage/Homepage'
import CustomPagesLayout from 'src/layouts/CustomPagesLayout'

const Home = () => {
  return (
    <CustomPagesLayout>
      <HomePage />
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
