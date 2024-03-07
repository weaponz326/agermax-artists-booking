import React from 'react'
import { DatePicker, Space } from 'antd'

const AntDesignDatePicker = ({ dateToFilterBy, setDateToFilterBy, handleDateFilter }) => {
  return (
    <DatePicker
      value={dateToFilterBy}
      onChange={date => handleDateFilter(date)}
      onSelect={date => setDateToFilterBy(date)}
      variant='borderless'
      style={{ border: 'none', borderRadius: '10px' }}
    />
  )
}

export default AntDesignDatePicker
