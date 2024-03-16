import React from 'react'
import { DatePicker, Space } from 'antd'
const { RangePicker, TimePicker } = DatePicker

const RangeDatePicker = () => (
  <Space direction='vertical' size={16}>
    <RangePicker />
    {/* <RangePicker showTime />
    <RangePicker picker='week' />
    <RangePicker picker='month' />
    <RangePicker picker='quarter' />
    <RangePicker picker='year' /> */}
  </Space>
)
export default RangeDatePicker
