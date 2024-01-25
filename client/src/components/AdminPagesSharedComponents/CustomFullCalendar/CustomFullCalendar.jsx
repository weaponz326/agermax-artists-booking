import React from 'react'
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import interactionPlugin, { Draggable, DropArg } from '@fullcalendar/interaction'
import timeGridPlugin from '@fullcalendar/timegrid'

const CustomFullCalendar = () => {
  return (
    <div>
      <FullCalendar
        plugins={[dayGridPlugin, interactionPlugin, timeGridPlugin]}
        initialView='dayGridMonth'
        headerToolbar={{
          left: 'prev, next, today',
          center: 'title',
          right: 'resourceTimelineWork, dayGridMonth, dayGridWeek'
        }}
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
