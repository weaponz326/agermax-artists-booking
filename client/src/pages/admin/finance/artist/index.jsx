import React from 'react'
import Finance from '../admin'

const ArtistFinance = () => {
  return <Finance />
}

export default ArtistFinance

ArtistFinance.authGuard = false
ArtistFinance.guestGuard = false
ArtistFinance.acl = {
  action: 'manage',
  subject: 'all' // Adjust the permissions as per your application's ACL configuration
}

// ArtistFinance.getLayout = page => <div>{page}</div>
