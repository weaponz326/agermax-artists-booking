// paymentController.js
const dotenv = require("dotenv");
const Stripe = require("stripe");
const Payment = require("../models/Payment");
const stripe = Stripe(process.env.STRIPE_SECRET_KEY);

exports.getAllPayments = async (req, res) => {
  try {
    const payments = await Payment.find({}).populate({
      path: "organizer",
      select: "_id firstName lastName email contactPhone",
    });

    if (payments.length === 0) {
      return res.status(404).json({ message: "No payments found." });
    }

    const paymentsWithOrganizerDetails = payments.map((payment) => {
      const { organizer, ...paymentDetails } = payment.toObject();
      return {
        ...paymentDetails,
        organizerId: organizer._id,
        organizerFirstName: organizer.firstName,
        organizerLastName: organizer.lastName,
        organizerEmail: organizer.email,
        organizerContactPhone: organizer.contactPhone,
      };
    });

    res.json({ success: true, payments: paymentsWithOrganizerDetails });
  } catch (error) {
    console.error("Error fetching payments:", error);
    return res
      .status(500)
      .json({ message: "An error occurred while fetching payment records." });
  }
};

exports.getPaymentById = async (req, res) => {
  try {
    const { id } = req.params;

    const payment = await Payment.findById(id).populate({
      path: 'organizer', 
      select: '_id firstName lastName email contactPhone'
    });

    if (!payment) {
      return res.status(404).json({ message: "Payment not found." });
    }

    const { organizer, ...paymentDetails } = payment.toObject();
    const paymentWithOrganizerDetails = {
      ...paymentDetails, 
      organizerId: organizer._id,
      organizerFirstName: organizer.firstName,
      organizerLastName: organizer.lastName,
      organizerEmail: organizer.email,
      organizerContactPhone: organizer.contactPhone,
    };

    res.json({ success: true, payment: paymentWithOrganizerDetails });
  } catch (error) {
    console.error("Error fetching payment by ID:", error);

    if (error.kind === "ObjectId" && error.name === "CastError") {
      return res.status(400).json({ message: "Invalid payment ID format." });
    }

    return res.status(500).json({
      message: "An error occurred while fetching the payment record.",
    });
  }
};



exports.processPayment = async (req, res) => {
  try {
    const { invoice, organizer, amount, source, receipt_email } = req.body;

    // Basic validation for required fields
    if (!invoice)
      return res.status(400).json({ message: "invoice is required." });
    if (!organizer)
      return res.status(400).json({ message: "organizer is required." });
    if (!amount)
      return res.status(400).json({ message: "amount is required." });
    if (!source)
      return res.status(400).json({ message: "source is required." });
    if (!receipt_email)
      return res.status(400).json({ message: "receipt_email is required." });

    const charge = await stripe.charges.create({
      amount: amount, // Ensure amount is in the smallest currency unit (e.g., cents for USD)
      currency: "usd",
      source: source,
      receipt_email: receipt_email,
      description: `Charge for ${receipt_email}`,
    });

    // Create and save the payment record in your database
    const paymentRecord = new Payment({
      user: req.user._id,
      invoice: invoice,
      organizer: organizer,
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
