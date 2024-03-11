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

export async function getNextUpcomingApprovedBooking() {
  try {
    const response = await axios.get(`${baseUrl}/next-upcoming-approved`)
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
export async function getTotalBookings(user) {
  let url
  if (user.role === 'admin') {
    url = 'total-bookings'
  } else {
    url = `bookings/${user.role}/${user._id}/total`
  }
  try {
    const { data } = await axios.get(`${baseUrl}/${url}`)
    return data
  } catch (error) {
    console.log('Error: ', error)
  }
}

//Pending Books
export async function getTotalPendingBookings(user) {
  let url
  if (user.role === 'admin') {
    url = 'bookings/pending/total'
  } else {
    url = `bookings/${user.role}/${user._id}/total-pending`
  }
  try {
    const { data } = await axios.get(`${baseUrl}/${url}`)
    return data
  } catch (error) {
    console.log('Error: ', error)
  }
}

//Recent Bookings
export async function getRecentBookings(user) {
  let url
  if (user.role === 'admin') {
    url = 'recent-bookings'
  } else {
    url = `bookings/${user.role}/${user._id}/recent`
  }
  try {
    const { data } = await axios.get(`${baseUrl}/${url}`)
    return data
  } catch (error) {
    console.log('Error: ', error)
  }
}

export async function getUpcomingBookings(user) {
  let url
  if (user.role === 'admin') {
    url = 'approved-bookings'
  } else {
    url = `bookings/${user.role}/${user._id}/upcoming-approved`
  }
  try {
    const { data } = await axios.get(`${baseUrl}/${url}`)
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

export async function getTop10BookedArtists() {
  try {
    const { data } = await axios.get(`${baseUrl}/top-artists`)
    return data
  } catch (error) {
    console.log('Error: ', error)
  }
}

export async function getOrganizersByArtistID(user) {
  let url = `bookings/${user.role}/${user._id}/organizers-by-artist`
  console.log(url)
  try {
    const { data } = await axios.get(`${baseUrl}/${url}`)
    return data
  } catch (error) {
    console.log('Error: ', error)
  }
}

export async function getVenuesByArtistID(user) {
  let url = `bookings/${user.role}/${user._id}/venues`
  console.log(url)
  try {
    const { data } = await axios.get(`${baseUrl}/${url}`)
    return data
  } catch (error) {
    console.log('Error: ', error)
  }
}
