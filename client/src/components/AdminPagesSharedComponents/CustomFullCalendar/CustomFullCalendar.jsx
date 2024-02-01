import React, { useState } from 'react'
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import interactionPlugin, { Draggable, DropArg } from '@fullcalendar/interaction'
import timeGridPlugin from '@fullcalendar/timegrid'
// import styles from './CustomFullCalendar.module.css'

const CustomFullCalendar = ({view}) => {
  const [events, setEvents] = useState([
    { title: 'Event 1', id: '1', date: '2024-25-01' },
    { title: 'Event 2', id: '2' },
    { title: 'Event 3', id: '3' },
    { title: 'Event 4', id: '4' },
    { title: 'Event 5', id: '5' },
    { title: 'Event 6', id: '6' }
  ])

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
        events={{}}
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
