import React from 'react'
import StripePayment from '../../../admin/details/stripe-payment/[paymentId]'

const OrganizerStripePayment = () => {
  return <StripePayment />
}

export default OrganizerStripePayment

OrganizerStripePayment.authGuard = false
OrganizerStripePayment.guestGuard = false
OrganizerStripePayment.acl = {
  action: 'manage',
  subject: 'all' // Adjust the permissions as per your application's ACL configuration
}
