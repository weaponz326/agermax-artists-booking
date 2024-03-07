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
    eventTitle: booking?.eventTitle || 'Event Name/Title not provided yet.',
    dateTimeRequested: booking ? dayjs(booking.dateTimeRequested) : '',
    startTime: booking ? dayjs(booking.startTime) : '',
    endTime: booking ? dayjs(booking.endTime) : '',
    getInTime: booking ? dayjs(booking.getInTime) : '',
    numberOfGuests: booking?.numberOfGuests || '',
    ageRange: booking?.ageRange || '',
    locationVenue: booking?.locationVenue || 'Location not provided yet.',
    streetAddress: booking?.streetAddress || 'Street Address not provided yet.',
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

  const handleChangeWithEvent = e => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
    console.log(formData)
  }

  return { formData, setFormData, handleChangeFormData, handleChangeWithEvent }
}

export default useBookingFormData
