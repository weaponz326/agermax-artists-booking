import React, { useState } from 'react'
import styles from './CustomBookingCard.module.css'
import { useForm } from 'react-hook-form'

import { LocalizationProvider, DatePicker, DateCalendar } from '@mui/x-date-pickers'
import { TimePicker, ConfigProvider } from 'antd'
import dayjs from 'dayjs'
import { ThemeProvider, createTheme } from '@mui/material/styles'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { Tag } from 'src/pages/artists/[id]'
import { NavMobileStepper } from './BookingCard'

const customTheme = createTheme({
  components: {
    MuiPickersCalendarHeader: {
      styleOverrides: {
        root: {
          color: '#4B627F',
          // padding: '0',
          justifyContent: 'space-between',
          fontFamily: 'inherit'
        }
      }
    },
    MuiPickersDay: {
      styleOverrides: {
        today: {
          color: '#bbdefb',
          borderRadius: 19,
          borderWidth: 4,
          borderColor: '#2196f3',
          border: '4px solid',
          backgroundColor: '#0d47a1'
        }
      }
    },
    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          border: 'none',
          padding: '0',
          fontFamily: 'inherit'
        }
      }
    },
    MuiInputBase: {
      styleOverrides: {
        root: {
          color: '#183D4C',
          fontSize: '19px',
          fontWeight: '450',
          border: 'none',
          fontFamily: 'inherit'
        }
      }
    },
    MuiMenuItem: {
      styleOverrides: {
        root: {
          borderRadius: '9px',
          '&:hover': {
            backgroundColor: '#FC8A5E'
          }
        }
      }
    },

    MuiIconButton: {
      styleOverrides: {
        root: {
          margin: '0'
        }
      }
    },
    MuiCard: {
      styleOverrides: {
        root: {
          boxShadow: 'none',
          padding: '24px',
          fontFamily: 'inherit'
        }
      }
    },
    MuiCardContent: {
      styleOverrides: {
        root: {
          boxShadow: 'none',
          padding: '0',
          fontFamily: 'inherit',
          overflow: 'auto'
        }
      }
    },

    MuiMobileStepper: {
      styleOverrides: {
        root: {
          fontSize: '16px',
          fontFamily: 'inherit'
        }
      }
    },
    MuiPickersDay: {
      styleOverrides: {
        root: {
          color: '#4B627F',
          fontFamily: 'inherit',
          fontSize: '16px',
          overflow: 'auto',

          '&:hover': {
            backgroundColor: '#B9FACF', // Example hover style
            borderRadius: '9px'
          },
          '&.Mui-selected': {
            backgroundColor: '#f07a4b', // Example selected state style
            borderRadius: '9px'
          },
          '&:focus.Mui-selected': {
            backgroundColor: '#f07a4b', // Change to desired style when focused and selected
            borderRadius: '9px'
          }
        }
      }
    }
  }
})

const BookingCardSchedular = ({
  artist,
  setOpen,
  setActiveStep,
  formData,
  handleChangeFormData,
  activeStep,
  handleBack,
  handleNext,
  disableNext
}) => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting }
  } = useForm()

  const [minTime, setMinTime] = useState(null)

  // Handler for when a new time is selected in the first Time Picker
  const handleTimeChange = (time, timeString) => {
    setMinTime(dayjs(timeString, 'HH:mm')) // Update the minimum time
  }
  // Function to disable time options in the second Time Picker based on the selected time from the first Time Picker
  const disabledGetInTime = type => {
    console.log(type)
    const currentHour = new Date(formData.getInTime).getUTCHours() // Get the current hour
    const currentMinute = new Date(formData.getInTime).getUTCMinutes() // Get the current minute

    const disabledHours = () => {
      const hours = []
      // Loop from 0 to the current hour and disable each hour
      for (let i = 0; i <= currentHour; i++) {
        hours.push(i)
      }
      return hours
    }
    const disabledMinutes = selectedHour => {
      if (selectedHour === currentHour) {
        const minutes = []
        // Loop from 0 to the current minute and disable each minute
        for (let i = 0; i < currentMinute; i++) {
          minutes.push(i)
        }
        return minutes
      }
      // Disable specific minutes for other hours
      return []
    }
    return { disabledHours, disabledMinutes }
  }

  const disabledStartTime = type => {
    console.log(type)
    const currentHour = new Date(formData.startTime).getUTCHours() // Get the current hour
    const currentMinute = new Date(formData.startTime).getUTCMinutes() // Get the current minute

    const disabledHours = () => {
      const hours = []
      // Loop from 0 to the current hour and disable each hour
      for (let i = 0; i <= currentHour; i++) {
        hours.push(i)
      }
      return hours
    }
    const disabledMinutes = selectedHour => {
      if (selectedHour === currentHour) {
        const minutes = []
        // Loop from 0 to the current minute and disable each minute
        for (let i = 0; i < currentMinute; i++) {
          minutes.push(i)
        }
        return minutes
      }
      // Disable specific minutes for other hours
      return []
    }
    return { disabledHours, disabledMinutes }
  }

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <ThemeProvider theme={customTheme}>
        <div className={styles.bookingScheduleCard}>
          <div className={styles.cardTitle}>
            {artist.firstName} {artist.lastName}
          </div>
          <div className={styles.genreList}>
            {artist.genre.length > 0 && artist.genre.map((g, index) => <Tag key={`${g}-$${index}`}>{g}</Tag>)}
          </div>
          <div className={styles.calendarInstruction}>Choose When 👇</div>
          <div>
            <DateCalendar
              {...register('date', { required: 'Date is required.' })}
              sx={{
                width: '100%',
                '& .MuiDayCalendar-header': {
                  justifyContent: 'space-between',
                  fontSize: '1rem'
                },
                '& .MuiDayCalendar-weekContainer': {
                  justifyContent: 'space-between'
                },
                '& .MuiPickersCalendarHeader-label': {
                  color: '#4B627F'
                },
                '& .MuiDayCalendar-weekDayLabel': {
                  color: '#4B627F',
                  fontSize: '16px'
                }
              }}
              // onChange={date => handleChange('dateTimeRequested', dayjs(date))}
              onChange={date => handleChangeFormData('dateTimeRequested', dayjs(date), artist)}
              // className={styles.modalCardContentInputField}
              label='Select Event Date'
              value={formData.dateTimeRequested ? dayjs(formData.dateTimeRequested) : null}
              disablePast
              name='dateTimeRequested'
            />
          </div>
          <div className={styles.calendarInstruction}>What Time?</div>
          <ConfigProvider
            theme={{
              components: {
                DatePicker: {
                  inputFontSizeLG: '30px'
                  // inputFontSize: '24px'
                }
              },
              token: {
                colorTextPlaceholder: '#66b0e8',
                paddingLG: '1.6rem'
                // colorText: 'red'
              }
            }}
          >
            <div className={styles.timePickersWrapper}>
              <div className={styles.timePicker}>
                <div className={styles.specificTime}>Get-In Time</div>
                <TimePicker
                  // style={{ fontSize: '2.5rem' }}
                  className={styles.chosenTime}
                  variant='borderless'
                  placeholder='Choose'
                  minuteStep={15}
                  secondStep={30}
                  size='large'
                  showSecond={false}
                  showNow={false}
                  value={formData.getInTime}
                  suffixIcon={false}
                  format={'HH:mm'}
                  onOk={handleTimeChange}
                  name='getInTime'
                  onChange={time => handleChangeFormData('getInTime', time)}
                />
              </div>
              <VerticalDivider />
              <div className={styles.timePicker}>
                <div className={styles.specificTime}>Start Time</div>
                <TimePicker
                  className={styles.chosenTime}
                  variant='borderless'
                  placeholder='Choose'
                  minuteStep={15}
                  size='large'
                  showSecond={false}
                  format={'HH:mm'}
                  suffixIcon={false}
                  showNow={false}
                  value={formData.startTime}
                  name='startTime'
                  onChange={time => handleChangeFormData('startTime', time)}
                  disabled={!formData.getInTime}
                  disabledTime={disabledGetInTime}
                  hideDisabledOptions
                />
              </div>
              <VerticalDivider />

              <div className={styles.timePicker}>
                <div className={styles.specificTime}>End Time</div>
                <TimePicker
                  className={styles.chosenTime}
                  variant='borderless'
                  placeholder='Choose'
                  minuteStep={15}
                  size='large'
                  suffixIcon={false}
                  format={'HH:mm'}
                  showNow={false}
                  showSecond={false}
                  value={formData.endTime}
                  onChange={time => handleChangeFormData('endTime', time)}
                  disabled={!formData.startTime}
                  disabledTime={disabledStartTime}
                  hideDisabledOptions
                />
              </div>
            </div>
            <NavMobileStepper
              activeStep={activeStep}
              setActiveStep={setActiveStep}
              handleBack={handleBack}
              handleNext={handleNext}
              disableNext={disableNext}
              // allowCancel={allowCancel}
            />
          </ConfigProvider>
        </div>
      </ThemeProvider>
    </LocalizationProvider>
  )
}

const VerticalDivider = () => {
  return <div className={styles.verticalDivider}></div>
}

export default BookingCardSchedular

export const BookingCardSummary = ({ artist, setOpen, activeStep, setActiveStep }) => {
  return (
    <div className={styles.bookingScheduleCard}>
      <div className={styles.cardTitle}>
        {artist && artist.firstName} {artist && artist.lastName}
      </div>
      <div className={styles.genreList}>
        {artist.genre.length > 0 && artist.genre.map((g, index) => <Tag key={`${g}-${index}`}>{g}</Tag>)}
      </div>
      <div className={styles.summaryWrapper}>
        <div className={styles.summaryText}>Summary</div>
        <div className={styles.summaryChangeText} onClick={() => setActiveStep(0)}>
          Change
        </div>
      </div>
      <Grid container className={styles.summaryDetailsContainer}>
        <Grid item>
          <Calendar />
        </Grid>
        <Grid item>
          <Typography fontSize='15px' color='#4B627F'>
            Date
          </Typography>
          <Typography sx={{ fontSize: '19px', fontWeight: '600' }}>
            {dayjs(formData.dateTimeRequested).format('YYYY-MM-DD')}
          </Typography>
        </Grid>
      </Grid>
      <Grid container className={styles.summaryDetailsContainer}>
        <Grid item>
          <Clock />
        </Grid>
        <Grid display='flex' gap={8}>
          <Grid item textAlign='center'>
            <Typography fontSize='15px' color='#4B627F'>
              Get In
            </Typography>
            <Typography sx={{ fontSize: '19px', fontWeight: '600' }}>
              {dayjs(formData.getInTime).format('HH:mm')}
            </Typography>
          </Grid>
          <Grid item textAlign='center'>
            <Typography fontSize='15px' color='#4B627F'>
              Start
            </Typography>
            <Typography sx={{ fontSize: '19px', fontWeight: '600' }}>
              {dayjs(formData.startTime).format('HH:mm')}
            </Typography>
          </Grid>
          <Grid item textAlign='center'>
            <Typography fontSize='15px' color='#4B627F'>
              End
            </Typography>
            <Typography sx={{ fontSize: '19px', fontWeight: '600' }}>
              {dayjs(formData.endTime).format('HH:mm')}
            </Typography>
          </Grid>
        </Grid>
      </Grid>
      <Grid container gap={4} marginTop={3}>
        <Typography sx={{ fontSize: '19px', fontWeight: '600' }}>Your Details</Typography>
      </Grid>
      <Grid container direction='column' marginTop={3} color="'#4B627F'">
        <TextField
          fullWidth
          type='text'
          label='First Name'
          value={user.firstName}
          // onChange={handleFieldChange('email')}
          sx={{ mb: 1 }}
          size='small'
        />
        <TextField
          fullWidth
          type='text'
          label='Last Name'
          value={user.lastName}
          // onChange={handleFieldChange('email')}
          sx={{ mb: 1 }}
          size='small'
        />
        <TextField
          fullWidth
          type='email'
          label='Email'
          value={user.email}
          // onChange={handleFieldChange('email')}
          sx={{ mb: 1 }}
          size='small'
        />
        <TextField
          fullWidth
          type='tel'
          label='Phone'
          value={user.contactPhone}
          // onChange={handleFieldChange('email')}
          sx={{ mb: 1 }}
          size='small'
        />
      </Grid>
      <Grid marginTop='auto'>
        <NavMobileStepper
          activeStep={activeStep}
          setActiveStep={setActiveStep}
          handleBack={handleBack}
          handleNext={handleNext}
        />
      </Grid>
    </div>
  )
}
