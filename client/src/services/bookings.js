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

export async function deleteBookingById(id) {
  try {
    const { data } = await axios.delete(`${baseUrl}/bookings/${id}`)
    return data
  } catch (error) {
    console.log('Error: ', error)
  }
}

//Bookings Matrix Getters
export async function getTotalBookings() {
  try {
    const { data } = await axios.get(`${baseUrl}/total-bookings`)
    return data
  } catch (error) {
    console.log('Error: ', error)
  }
}

//Pending Books
export async function getTotalPendingBookings() {
  try {
    const { data } = await axios.get(`${baseUrl}/bookings/pending/total`)
    return data
  } catch (error) {
    console.log('Error: ', error)
  }
}

//Recent Bookings
export async function getRecentBookings() {
  try {
    const { data } = await axios.get(`${baseUrl}/recent-bookings`)
    return data
  } catch (error) {
    console.log('Error: ', error)
  }
}

//Organizer
export async function getBookingsByOrganizer() {
  try {
    const { data } = await axios.get(`${baseUrl}/bookings/organizer/:organizerId`)
    return data
  } catch (error) {
    console.log('Error: ', error)
  }
}

export async function getTotalBookingsByOrganizer() {
  try {
    const { data } = await axios.get(`${baseUrl}/bookings/organizer/:organizerId/total`)
    return data
  } catch (error) {
    console.log('Error: ', error)
  }
}
