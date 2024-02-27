import React, { useEffect, useState } from 'react'
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import interactionPlugin, { Draggable, DropArg } from '@fullcalendar/interaction'
import timeGridPlugin from '@fullcalendar/timegrid'
// import styles from './CustomFullCalendar.module.css'

const CustomFullCalendar = ({ view, userBookings }) => {
  const [events, setEvents] = useState([
    // { title: 'Event 1', id: '1', date: '2024-02-28' },
    // { title: 'Event 2', id: '2' },
    // { title: 'Event 3', id: '3' },
    // { title: 'Event 4', id: '4' },
    // { title: 'Event 5', id: '5' },
    // { title: 'Event 6', id: '6' }
  ])

  useEffect(() => {
    if (userBookings) {
      // Mapping over the original array and transforming objects
      const transformedArray = userBookings.map(obj => {
        // Mapping each key-value pair and renaming keys
        return Object.keys(obj).reduce((acc, key) => {
          // Define new key names based on your requirements
          let newKey
          switch (key) {
            case '_id':
              newKey = 'id'
              break

            case 'eventTitle':
              newKey = 'title'
              break

            case 'dateTimeRequested':
              newKey = 'date'
              break

            case 'startTime':
              newKey = 'start'
              break

            case 'endTime':
              newKey = 'end'
              break

            default:
              // If key name doesn't need to be changed, use the original key name
              newKey = key
          }
          // Add the key-value pair with the new key name to the accumulator object
          acc[newKey] = obj[key]
          return acc
        }, {})
      })
      setEvents(transformedArray)
    }
  }, [userBookings])

  return (
    <div>
      <FullCalendar
        plugins={[dayGridPlugin, interactionPlugin, timeGridPlugin]}
        initialView={view}
        // headerToolbar={{
        //   left: 'prev, next, today',
        //   center: 'title',
        //   right: 'resourceTimelineWork, dayGridMonth, dayGridWeek'
        // }}
        events={events}
        nowIndicator
        selectable
        editable
        selectMirror
        droppable
      />
    </div>
  )
}

export default CustomFullCalendar
