import { useState } from 'react'
import dayjs from 'dayjs'

function useBookingFormData(booking) {
  const [formData, setFormData] = useState({
    // Initialize form data
    _id: booking && booking._id,
    status: booking?.status || 'pending',
    organizerID: booking?.organizerID || '',
    eventTitle: booking?.eventTitle || '',
    dateTimeRequested: booking ? dayjs(booking.dateTimeRequested) : '',
    startTime: booking ? dayjs(booking.startTime) : '',
    endTime: booking ? dayjs(booking.endTime) : '',
    getInTime: booking ? dayjs(booking.getInTime) : '',
    numberOfGuests: booking?.numberOfGuests || '',
    ageRange: booking?.ageRange || '',
    locationVenue: booking?.locationVenue || '',
    artistID: booking?.artistID || '',
    availableTechnology: booking?.availableTechnology || '',
    otherComments: booking?.otherComments || '',
    gallery: booking?.gallery || [],
    genre: booking?.genre || []
  })

  return { formData, setFormData }
}

export default useBookingFormData
