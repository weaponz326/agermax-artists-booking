import React from 'react'
import { Calendar, ConfigProvider, theme } from 'antd'
import styles from './BookingCalendar.module.css'

const onPanelChange = (value, mode) => {
  console.log(value.format('YYYY-MM-DD'), mode)
}
const BookingCalendar = () => {
  const { token } = theme.useToken()
  const wrapperStyle = {
    // width: 300,
    border: `1px solid ${token.colorBorderSecondary}`,
    borderRadius: token.borderRadiusLG
  }
  return (
    <ConfigProvider
      theme={{
        token: {
          colorPrimary: '#FC8A5E'
        }
      }}
    >
      <div style={wrapperStyle}>
        <Calendar onPanelChange={onPanelChange} fullscreen={false} className={styles.customCalendar} />
      </div>
    </ConfigProvider>
  )
}
export default BookingCalendar
