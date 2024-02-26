import axios from 'axios'

const baseUrl = process.env.NEXT_PUBLIC_API_URL

export async function getAllPayments() {
  try {
    const { data } = await axios.get(`${baseUrl}/payments`)
    if (data.success && Array.isArray(data.payments)) {
      const sortedPaymentByDate = data.payments.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt))
      return sortedPaymentByDate
    }
    return []
  } catch (error) {
    console.log('Error: ', error)
    throw error
  }
}

export async function getPaymentById(id) {
  try {
    const { data } = await axios.get(`${baseUrl}/payments/${id}`)
    return data
  } catch (error) {
    console.log('Error: ', error)
  }
}

export async function createPayment(paymentData) {
  try {
    const response = await axios.post(`${baseUrl}/process-payment`, paymentData)
    return response.data
  } catch (error) {
    console.log('Error creating payment: ', error)
    throw error
  }
}
