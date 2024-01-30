import React from 'react'

const ArtistFinance = () => {
  return <div>New Page</div>
}

export default ArtistFinance

ArtistFinance.authGuard = false
ArtistFinance.guestGuard = false
ArtistFinance.acl = {
  action: 'manage',
  subject: 'all' // Adjust the permissions as per your application's ACL configuration
}
