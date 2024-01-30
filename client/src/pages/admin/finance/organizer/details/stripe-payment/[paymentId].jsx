import React from 'react'
import { useRouter } from 'next/router'

const StripePaymentPage = () => {
  const router = useRouter()
  console.log(router.query)
  const { paymentId, payee, amount, date, status } = router.query
  return (
    <div>
      <p>This is all Generated dynamically from the payment page!</p>
      <h2>Payee: {payee}</h2>
      <h3>Payment ID: {paymentId}</h3>
      <h4>Amount: {amount}</h4>
      <p>Date: {date}</p>
      <p>Status: {status}</p>
      <p>Not doing so bad for my first time out doing web development right!🤣🤣</p>
    </div>
  )
}

export default StripePaymentPage

StripePaymentPage.authGuard = false
StripePaymentPage.guestGuard = false
StripePaymentPage.acl = {
  action: 'manage',
  subject: 'all' // Adjust the permissions as per your application's ACL configuration
}

// StripePaymentPage.getLayout = page => <div>{page}</div>
