// paymentController.js

const Stripe = require("stripe");
const Payment = require("../models/Payment"); // Assuming you have a Payment model

const stripe = Stripe(process.env.STRIPE_SECRET_KEY);

exports.getAllPayments = async (req, res) => {
  try {
    // Fetch all payment records from the database
    const payments = await Payment.find({});

    // Check if payments exist
    if (payments.length === 0) {
      return res.status(404).json({ message: "No payments found." });
    }

    // Respond with all payment records
    res.json({ success: true, payments });
  } catch (error) {
    console.error("Error fetching payments:", error);
    return res
      .status(500)
      .json({ message: "An error occurred while fetching payment records." });
  }
};

exports.processPayment = async (req, res) => {
  try {
    const { amount, source, receipt_email } = req.body;

    // Basic validation for required fields
    if (!amount)
      return res.status(400).json({ message: "Amount is required." });
    if (!source)
      return res.status(400).json({ message: "Source is required." });
    if (!receipt_email)
      return res.status(400).json({ message: "Receipt email is required." });

    const charge = await stripe.charges.create({
      amount: amount, // Ensure amount is in the smallest currency unit (e.g., cents for USD)
      currency: "usd",
      source: source,
      receipt_email: receipt_email,
      description: `Charge for ${receipt_email}`,
    });

    // Create and save the payment record in your database
    const paymentRecord = new Payment({
      user: req.user._id, // Assuming the user ID is attached to the request
      stripeId: charge.id,
      amount: charge.amount,
      email: charge.receipt_email,
      status: charge.status,
    });

    await paymentRecord.save();

    // Respond with the charge information
    res.json({ success: true, charge });
  } catch (error) {
    console.error("Payment Error:", error);

    // Handle known error types from Stripe
    if (error.type === "StripeCardError") {
      // A declined card error
      return res.status(400).json({ message: `Card error: ${error.message}` });
    } else if (error.type === "StripeRateLimitError") {
      // Too many requests made to the API too quickly
      return res
        .status(429)
        .json({ message: "Too many requests. Please try again later." });
    } else if (error.type === "StripeInvalidRequestError") {
      // Invalid parameters were supplied to Stripe's API
      return res.status(400).json({ message: "Invalid parameters." });
    } else if (error.type === "StripeAPIError") {
      // An error occurred internally with Stripe's API
      return res.status(500).json({ message: "Internal Stripe error." });
    } else if (error.type === "StripeConnectionError") {
      // Some kind of error occurred during the HTTPS communication
      return res
        .status(503)
        .json({ message: "Communication error with Stripe." });
    } else if (error.type === "StripeAuthenticationError") {
      // You probably used an incorrect API key
      return res.status(401).json({ message: "Incorrect API key." });
    } else {
      // Handle any other types of unexpected errors
      return res.status(500).json({ message: "An unexpected error occurred." });
    }
  }
};
