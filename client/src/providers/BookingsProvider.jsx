import React, { useContext, createContext, useEffect, useState } from 'react'
import { getAllBookings } from 'src/services/bookings'

const BookingContext = createContext()

const BookingsProvider = ({ children }) => {
  const [bookings, setBookings] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const bookingsList = await getAllBookings()
        setBookings(bookingsList)
      } catch (error) {
        setError(error)
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [])

  return <BookingContext.Provider value={{ bookings, setBookings, loading, error }}>{children}</BookingContext.Provider>
}

export default BookingsProvider

// Consumer custom hook
export const useBookings = () => {
  const context = useContext(BookingContext)
  if (!context.Bookings) {
    console.log('No Bookings fetched')
  }
  return context
}
