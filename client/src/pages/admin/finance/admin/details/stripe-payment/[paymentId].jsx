import React from 'react'
import { loadStripe } from '@stripe/stripe-js'
import { Elements } from '@stripe/react-stripe-js'
import CheckoutForm from 'src/components/CheckoutForm/CheckoutForm'
import Box from '@mui/material/Box'

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY)

const StripePayment = () => {
  return (
    <Elements stripe={stripePromise}>
      <Box justifyContent='center' alignItems='center' minHeight='100vh' sx={{ p: 3 }}>
        <CheckoutForm />
      </Box>
    </Elements>
  )
}

export default StripePayment
