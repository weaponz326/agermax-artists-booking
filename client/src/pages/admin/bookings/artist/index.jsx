import React from 'react'
import BookingPage from '../admin'

const ArtistBookingsPage = () => {
  return <BookingPage />
}

export default ArtistBookingsPage

ArtistBookingsPage.authGuard = false
ArtistBookingsPage.guestGuard = false
ArtistBookingsPage.acl = {
  action: 'manage',
  subject: 'all' // Adjust the permissions as per your application's ACL configuration
}
