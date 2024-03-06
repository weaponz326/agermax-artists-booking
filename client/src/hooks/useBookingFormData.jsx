import { useState } from 'react'
import dayjs from 'dayjs'
import { useAuth } from './useAuth'

function useBookingFormData(booking) {
  const { user } = useAuth()

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
    streetAddress: booking?.streetAddress || '',
    artistID: booking?.artistID || '',
    availableTechnology: booking?.availableTechnology || '',
    otherComments: booking?.otherComments || '',
    gallery: booking?.gallery || [],
    genre: booking?.genre || [],
    invoiced: booking?.invoiced || false
  })

  const handleChangeFormData = (name, value, artist) => {
    setFormData({
      ...formData,
      [name]: value,
      artistID: artist ? artist : formData.artistID,
      organizerID: user
    })
    console.log(formData)
  }

  return { formData, setFormData, handleChangeFormData }
}

export default useBookingFormData
