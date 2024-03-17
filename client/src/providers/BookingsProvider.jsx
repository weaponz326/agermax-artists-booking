import React, { useContext, createContext, useEffect, useState } from 'react'
import * as services from 'src/services/bookings'

const BookingContext = createContext()

const BookingsProvider = ({ children }) => {
  const [bookings, setBookings] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [isBookingsUpdated, setIsBookingsUpdated] = useState(false)

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
  }, [isBookingsUpdated])

  const updateBooking = async booking => {
    const updatedBooking = await services.updateBooking(booking)
    setBookings(
      bookings.map(booking => {
        if (booking._id === updatedBooking._id) return updatedBooking
        else return booking
      })
    )
    return updatedBooking
  }
  const deleteBooking = async booking => {
    const deletedBooking = await services.deleteBookingById(booking._id)
    // Update local state to remove deleted booking
    setBookings(bookings.filter(b => b._id !== booking._id))
    return deletedBooking
  }

  const getNextUpcomingEvent = async () => {
    const nextBooking = await services.getNextUpcomingApprovedBooking()
    // console.log(nextBooking)
    // Update local state to remove deleted booking
    return nextBooking
  }

  const createBooking = async booking => {
    const createdBooking = await services.createBooking(booking)
    // Update local state to add created booking
    setBookings([createdBooking, ...bookings])
    return createdBooking
  }

  return (
    <BookingContext.Provider
      value={{
        bookings,
        setBookings,
        loading,
        error,
        updateBooking,
        deleteBooking,
        createBooking,
        getNextUpcomingEvent,
        setIsBookingsUpdated
      }}
    >
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
