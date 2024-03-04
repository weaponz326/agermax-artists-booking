import React from 'react'
import BookingPage from '../admin'

const OrganizerBookingsPage = () => {
  return <BookingPage />
}

export default OrganizerBookingsPage

OrganizerBookingsPage.authGuard = false
OrganizerBookingsPage.guestGuard = false
OrganizerBookingsPage.acl = {
  action: 'manage',
  subject: 'all' // Adjust the permissions as per your application's ACL configuration
}
