import React, { useContext, createContext, useEffect, useState } from 'react'
import * as services from 'src/services/bookings'

const BookingContext = createContext()

const BookingsProvider = ({ children }) => {
  const [bookings, setBookings] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const bookingsList = await services.getAllBookings()
        setBookings(bookingsList)
      } catch (error) {
        setError(error)
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [])

  const updateBooking = async booking => {
    const updatedBooking = await services.updateBooking(booking)
    console.log(updatedBooking)
    setBookings(
      bookings.map(booking => {
        if (booking._id === updatedBooking._id) return updatedBooking
        else return booking
      })
    )
  }
  const deleteBooking = async booking => {
    const deletedBooking = await services.deleteBookingById(booking._id)
    // Update local state to remove deleted booking
    setBookings(bookings.filter(b => b._id !== booking._id))
  }

  return (
    <BookingContext.Provider value={{ bookings, setBookings, loading, error, updateBooking, deleteBooking }}>
      {children}
    </BookingContext.Provider>
  )
}

export default BookingsProvider

// Consumer custom hook
export const useBookings = () => {
  const context = useContext(BookingContext)
  if (!context.bookings) {
    console.log('Either Network Error or useBookings must be used within the BookingsProvider')
  }
  return context
}
