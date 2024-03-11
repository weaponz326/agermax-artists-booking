import React from 'react'
import Finance from '../admin'

const OrganizerFinance = () => {
  return <Finance />
}

export default OrganizerFinance

OrganizerFinance.authGuard = false
OrganizerFinance.guestGuard = false
OrganizerFinance.acl = {
  action: 'manage',
  subject: 'all' // Adjust the permissions as per your application's ACL configuration
}

// OrganizerFinance.getLayout = page => <div>{page}</div>
