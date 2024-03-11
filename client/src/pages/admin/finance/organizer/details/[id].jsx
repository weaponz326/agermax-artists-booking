import React from 'react'
import FinancialDetailsPage from '../../admin/details/[id]'

const OrganizerFinancialDetailsPage = () => {
  return <FinancialDetailsPage />
}

export default OrganizerFinancialDetailsPage

OrganizerFinancialDetailsPage.authGuard = false
OrganizerFinancialDetailsPage.guestGuard = false
OrganizerFinancialDetailsPage.acl = {
  action: 'manage',
  subject: 'all' // Adjust the permissions as per your application's ACL configuration
}
