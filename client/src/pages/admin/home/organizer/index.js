import React from 'react'

import MainDashboard from '../admin'

const OrganizerDashboard = () => {
  return <MainDashboard />
}

export default OrganizerDashboard

OrganizerDashboard.authGuard = false
OrganizerDashboard.guestGuard = false
OrganizerDashboard.acl = {
  action: 'manage',
  subject: 'all' // Adjust the permissions as per your application's ACL configuration
}
// OrganizerDashboard.getLayout = page => <div>{page}</div>
