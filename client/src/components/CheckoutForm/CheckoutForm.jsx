import React, { useState, useEffect } from 'react';
import { useStripe, useElements, CardElement } from '@stripe/react-stripe-js';
import axios from 'axios';
import { useAuth } from 'src/hooks/useAuth'; 
import { useRouter } from 'next/router';
import { Button, TextField, Box, Card, Typography } from '@mui/material';

const cardElementOptions = {
  style: {
    base: {
      color: "#32325d",
      fontFamily: 'Arial, sans-serif',
      fontSmoothing: "antialiased",
      fontSize: "16px",
      "::placeholder": {
        color: "#aab7c4"
      }
    },
    invalid: {
      color: "#fa755a",
      iconColor: "#fa755a"
    }
  }
};

const CheckoutForm = () => {
  const stripe = useStripe();
  const elements = useElements();
  const { accessToken } = useAuth();
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [amount, setAmount] = useState('');

  useEffect(() => {
    const query = router.query;
    setAmount(query.amount || '');
  }, [router.query]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError('');

    if (!stripe || !elements) {
      return;
    }

    const card = elements.getElement(CardElement);
    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: 'card',
      card,
      billing_details: { email },
    });

    if (error) {
      setError(error.message);
      return;
    }

    try {
      await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/payment/process-payment`, {
        amount: amount * 100, // Convert amount to cents
        source: paymentMethod.id,
        receipt_email: email,
      }, {
        headers: { Authorization: `Bearer ${accessToken}` },
      });

      // Handle successful payment here (e.g., show confirmation message)
    } catch (err) {
      setError(err.response?.data?.message || 'Payment failed.');
    }
  };

  return (
    <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
      <Card variant="outlined" sx={{ p: 2, mb: 2 }}>
        <Typography variant="h6" gutterBottom>
          Payment Information
        </Typography>
        <TextField
          margin="normal"
          required
          fullWidth
          label="Email Address"
          name="email"
          autoComplete="email"
          autoFocus
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <Typography variant="body2" sx={{ mt: 2, mb: 1 }}>
          Card Details
        </Typography>
        <CardElement options={cardElementOptions} />
        {error && <Typography color="error" sx={{ mt: 2 }}>{error}</Typography>}
      </Card>
      <Button
        type="submit"
        fullWidth
        variant="contained"
        sx={{ mt: 3, mb: 2 }}
        disabled={!stripe}
      >
        Pay ${amount}
      </Button>
    </Box>
  );
};

export default CheckoutForm;
