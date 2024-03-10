import React from 'react'

import MainDashboard from '../admin'

const ArtistDashboard = () => {
  return <MainDashboard />
}

export default ArtistDashboard

ArtistDashboard.authGuard = false
ArtistDashboard.guestGuard = false
ArtistDashboard.acl = {
  action: 'manage',
  subject: 'all' // Adjust the permissions as per your application's ACL configuration
}
// ArtistDashboard.getLayout = page => <div>{page}</div>
