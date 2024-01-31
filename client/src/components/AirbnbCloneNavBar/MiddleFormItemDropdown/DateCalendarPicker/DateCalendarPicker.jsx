import { Calendar, theme, DatePicker } from 'antd'
import React from 'react'
import MiddleFormItemDropdown from '../MiddleFormItemDropdown'

const DateCalendarPicker = () => {
  const onPanelChange = (value, mode) => {
    console.log(value.format('YYYY-MM-DD'), mode)
  }

  return (
    <MiddleFormItemDropdown>
      <div>
        {/* <DatePicker defaultOpen /> */}
        <Calendar fullscreen={false} onPanelChange={onPanelChange} />
      </div>
    </MiddleFormItemDropdown>
  )
}

export default DateCalendarPicker
