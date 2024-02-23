import axios from 'axios'

const baseUrl = process.env.NEXT_PUBLIC_API_URL
export async function getAllBookings() {
  try {
    const { data } = await axios.get(`${baseUrl}/bookings`)
    const sortedBookingsByDate = data.sort((a, b) => new Date(a.dateTimeRequested) - new Date(b.dateTimeRequested))
    return sortedBookingsByDate
  } catch (error) {
    console.log('Error: ', error)
  }
}

export async function getBookingById(id) {
  try {
    const { data } = await axios.get(`${baseUrl}/bookings/${id}`)
    return data
  } catch (error) {
    console.log('Error: ', error)
  }
}

export async function createBooking(bookingData) {
  try {
    const response = await axios.post(`${baseUrl}/bookings`, bookingData)
    return response.data
  } catch (error) {
    console.log('Error creating booking: ', error)
    throw error // Re-throwing the error so that it can be handled where the function is called
  }
}

export async function updateBooking(bookingData) {
  try {
    const response = await axios.put(`${baseUrl}/bookings/${bookingData._id}`, bookingData)
    return response.data
  } catch (error) {
    console.log('Error Updating booking: ', error)
    throw error // Re-throwing the error so that it can be handled where the function is called
  }
}
