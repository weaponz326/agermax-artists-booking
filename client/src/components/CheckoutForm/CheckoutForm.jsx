import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';


// import { useStripe } from '@stripe/react-stripe-js';
import {
  PaymentElement,
  LinkAuthenticationElement
} from '@stripe/react-stripe-js'
// import {useState} from 'react'
import {useStripe, useElements} from '@stripe/react-stripe-js';

import axios from 'axios';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import Cards from 'react-credit-cards';
import CustomTextField from 'src/@core/components/mui/text-field';
import Payment from 'payment';

// Utilities for formatting
import { formatCVC, formatExpirationDate, formatCreditCardNumber } from 'src/@core/utils/format';

// This component wraps the Cards component for styling
import CardWrapper from 'src/@core/styles/libs/react-credit-cards';

// Import necessary styles
import 'react-credit-cards/es/styles-compiled.css';

const CheckoutForm = () => {
  const stripe = useStripe();
  const [cvc, setCvc] = useState('');
  const [name, setName] = useState('');
  const [expiry, setExpiry] = useState('');
  const [cardNumber, setCardNumber] = useState('');
  const [email, setEmail] = useState(''); // Assuming you have an email field for receipt
  const [error, setError] = useState('');
  const [amount, setAmount] = useState('');
  const router = useRouter();
  const [paymentSuccess, setPaymentSuccess] = useState(false); // State to track payment success

  useEffect(() => {
    const query = router.query;
    setAmount(query.amount || '');
  }, [router.query]);

  const handleInputChange = ({ target }) => {
    switch (target.name) {
      case 'number':
        setCardNumber(formatCreditCardNumber(target.value, Payment));
        break;
      case 'expiry':
        setExpiry(formatExpirationDate(target.value, ));
        break;
      case 'cvc':
        setCvc(formatCVC(target.value,cardNumber, Payment));
        break;
      case 'name':
        setName(target.value);
        break;
      default:
        break;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!stripe) {
      console.log('Stripe.js has not loaded yet.');
      return;
    }
    setError('');

    // Convert expiry date to month and year
    const exp_month = expiry.split('/')[0];
    const exp_year = `20${expiry.split('/')[1]}`;

    // Use the card details to create a payment method
    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: 'card',
      card: {
        number: cardNumber,
        exp_month,
        exp_year,
        cvc,
      },
      billing_details: {
        name,
        email, // Optional: include other billing details
      },
    });

    if (error) {
      setError(error.message);
      console.error(error);
      return;
    }

    const accessToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY1YWZhNTI3MmI1ZDJhZDQzMzBlMDI2NSIsImlhdCI6MTcwNjAwOTg5NSwiZXhwIjoxNzA4NjAxODk1fQ.JQE4OzgIT0DxK-2_ddlkzsB4WasvD99GgNK0DMSrLGc";


    // Test mode code
    const testSource = 'tok_visa';

    try {
      await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/payment/process-payment`, {
        amount: amount * 100,
        // source: paymentMethod.id,
        source: testSource,
        receipt_email: email,
      }, {
        headers: { Authorization: `Bearer ${accessToken}` },
      });
      setPaymentSuccess(true); // Indicate payment success

      // Handle successful payment here (e.g., show confirmation message)
    } catch (err) {
      setError(err.response?.data?.message || 'Payment failed.');
    }

  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <Cards cvc={cvc} expiry={expiry} focused={name} name={name} number={cardNumber} />
      </div>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <CustomTextField
            fullWidth
            name="number"
            label="Card Number"
            value={cardNumber}
            onChange={handleInputChange}
          />
        </Grid>
        <Grid item xs={6}>
          <CustomTextField
            fullWidth
            name="expiry"
            label="Expiry Date"
            value={expiry}
            onChange={handleInputChange}
          />
        </Grid>
        <Grid item xs={6}>
          <CustomTextField
            fullWidth
            name="cvc"
            label="CVC"
            value={cvc}
            onChange={handleInputChange}
          />
        </Grid>
        <Grid item xs={12}>
          <CustomTextField
            fullWidth
            name="name"
            label="Name on Card"
            value={name}
            onChange={handleInputChange}
          />
        </Grid>
      </Grid>
      {error && <div style={{ color: 'red' }}>{error}</div>}
      <Button type="submit" variant="contained" color="primary">
      Pay ${amount}
      </Button>
    </form>
  );
};

export default CheckoutForm;
