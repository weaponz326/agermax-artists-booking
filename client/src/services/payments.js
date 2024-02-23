import axios from 'axios'

const baseUrl = process.env.NEXT_PUBLIC_API_URL
export async function getAllPayments() {
  try {
    const { data } = await axios.get(`${baseUrl}/payments`)
    const sortedPaymentsByDate = data.sort((a, b) => new Date(a.dateTimeRequested) - new Date(b.dateTimeRequested))
    return sortedPaymentsByDate
  } catch (error) {
    console.log('Error: ', error)
  }
}

export async function getPaymentsById(id) {
  try {
    const { data } = await axios.get(`${baseUrl}/payments/${id}`)
    return data
  } catch (error) {
    console.log('Error: ', error)
  }
}

export async function createPayments(paymentsData) {
  try {
    const response = await axios.post(`${baseUrl}/payments`, paymentsData)
    return response.data
  } catch (error) {
    console.log('Error creating payments: ', error)
    throw error // Re-throwing the error so that it can be handled where the function is called
  }
}

export async function updatePayments(paymentsData) {
  try {
    const response = await axios.put(`${baseUrl}/payments/${paymentsData._id}`, paymentsData)
    return response.data
  } catch (error) {
    console.log('Error Updating payments: ', error)
    throw error // Re-throwing the error so that it can be handled where the function is called
  }
}
