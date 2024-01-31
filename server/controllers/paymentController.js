// paymentController.js

const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

const Payment = require('../models/Payment'); // Assuming the Payment model is correctly set up

exports.processPayment = async (req, res) => {
  try {
    const { amount, source, receipt_email } = req.body;

    // Basic validation for required fields
    if (!amount) return res.status(400).json({ message: "Amount is required." });
    if (!source) return res.status(400).json({ message: "Source is required." });
    if (!receipt_email) return res.status(400).json({ message: "Receipt email is required." });

    const charge = await stripe.charges.create({
      amount: amount, // Ensure amount is in the smallest currency unit (e.g., cents for USD)
      currency: 'usd',
      source: source,
      receipt_email: receipt_email,
      description: `Charge for ${receipt_email}`
    });

    // Create and save the payment record in your database
    const payment = new Payment({
      user: req.user.id, // Ensure the user ID is correctly set from your authentication middleware
      stripeId: charge.id,
      amount: charge.amount,
      email: charge.receipt_email,
      status: charge.status
    });

    await payment.save();

    res.status(200).json({ success: true, message: "Payment processed successfully.", charge });
  } catch (error) {
    console.error('Payment Processing Error:', error);
    res.status(500).json({ success: false, message: "Payment processing failed.", error: error.message });
  }
};
