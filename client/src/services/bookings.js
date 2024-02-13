import axios from 'axios'

const baseUrl = process.env.NEXT_PUBLIC_API_URL
export async function getAllBookings() {
  try {
    const { data } = await axios.get(`${baseUrl}/bookings`)
    return data
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
