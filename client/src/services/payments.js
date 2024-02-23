import axios from 'axios'

const baseUrl = process.env.NEXT_PUBLIC_API_URL
export async function getAllPayment() {
  try {
    const { data } = await axios.get(`${baseUrl}/payment`)
    const sortedPaymentByDate = data.sort((a, b) => new Date(a.dateTimeRequested) - new Date(b.dateTimeRequested))
    return sortedPaymentByDate
  } catch (error) {
    console.log('Error: ', error)
  }
}

export async function getPaymentById(id) {
  try {
    const { data } = await axios.get(`${baseUrl}/payment/${id}`)
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
    throw error // Re-throwing the error so that it can be handled where the function is called
  }
}

