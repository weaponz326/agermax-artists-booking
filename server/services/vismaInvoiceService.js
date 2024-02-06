// utils/vismaInvoice.js
const axios = require('axios');
const getVismaToken = require('./vismaAuth');

const createVismaInvoice = async (bookingDetails) => {
  const token = await getVismaToken();
  const { artistID, dateTimeRequested, locationVenue, numberOfGuests } = bookingDetails;

  // Simplified invoice data structure - adjust according to your needs and Visma API documentation
  const invoiceData = {
    customer: artistID, // Assuming this maps to a customer ID in Visma. You might need to adjust this.
    invoiceDate: dateTimeRequested,
    dueDate: new Date(dateTimeRequested.getTime() + 15 * 24 * 60 * 60 * 1000), // Due date 15 days from invoice date
    rows: [{
      articleNumber: "1", // You'll need to adjust this based on your actual data
      description: `Booking for event at ${locationVenue} for ${numberOfGuests} guests`,
      quantity: 1,
      unitPrice: 500, // Example unit price, adjust as necessary
    }],
  };

  try {
    const response = await axios.post(`${process.env.VISMA_SANDBOX_URL}/api/v2/invoices`, invoiceData, {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    });

    return response.data; // The created invoice data
  } catch (error) {
    console.error('Error creating invoice in Visma:', error);
    throw error;
  }
};

module.exports = createVismaInvoice;
