import React, { useState } from 'react'
import styles from './CustomBookingCard.module.css'
import { useForm } from 'react-hook-form'

import { LocalizationProvider, TimePicker, DatePicker, DateCalendar } from '@mui/x-date-pickers'
import dayjs from 'dayjs'
import { useTheme, ThemeProvider, createTheme } from '@mui/material/styles'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import useBookingFormData from 'src/hooks/useBookingFormData'
import { Tag } from 'src/pages/artists/[id]'
import { NavMobileStepper } from './BookingCard'
import { Button, Popover } from '@mui/material'

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
  activeStep,
  setActiveStep,
  formData,
  handleChangeFormData,
  disableNext
}) => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting }
  } = useForm()

  //Handlers for Next and Back Buttons Click and Submission of Date
  const handleNext = () => {
    setActiveStep(prevActiveStep => prevActiveStep + 1)
    //Handle Condition, Embed Artist ID and submit form
    if (activeStep === 1) handleSubmit()
  }

  const handleBack = () => {
    if (activeStep !== 0) setActiveStep(prevActiveStep => prevActiveStep - 1)
    if (activeStep === 0) setOpen(false)
    return
  }

  /*************************Popover****************** */
  const [anchorEl, setAnchorEl] = useState(null)
  const [selectedTime, setSelectedTime] = useState(null)

  const handleChooseClick = event => {
    setAnchorEl(event.currentTarget)
  }

  const handleClose = () => {
    setAnchorEl(null)
  }

  const handleTimeSelection = time => {
    setSelectedTime(time)
    handleClose()
  }

  /*************************Popover****************** */

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
              // onChange={date => handleChangeFormData('dateTimeRequested', dayjs(date), artist)}
              // className={styles.modalCardContentInputField}
              label='Select Event Date'
              // value={formData.dateTimeRequested ? dayjs(formData.dateTimeRequested) : null}
              disablePast
              // name='dateTimeRequested'
            />
          </div>
          <div className={styles.calendarInstruction}>What Time?</div>
          <div className={styles.timePickersWrapper}>
            <div className={styles.timePicker}>
              <div className={styles.specificTime}>Get-In Time</div>
              <div className={styles.chosenTime} onClick={handleChooseClick}>
                Choose
              </div>
              <Popover
                open={Boolean(anchorEl)}
                anchorEl={anchorEl}
                onClose={handleClose}
                anchorOrigin={{
                  vertical: 'bottom',
                  horizontal: 'left'
                }}
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'left'
                }}
              >
                {/* TimePicker component hidden by default */}
                <TimePicker
                  open={Boolean(anchorEl)}
                  onClose={handleClose}
                  value={selectedTime}
                  onChange={time => handleTimeSelection(time)}
                />
              </Popover>
            </div>
            <VerticalDivider />
            <div className={styles.timePicker}>
              <div className={styles.specificTime}>Start Time</div>
              <div className={styles.chosenTime}>Choose</div>
            </div>
            <VerticalDivider />

            <div className={styles.timePicker}>
              <div className={styles.specificTime}>End Time</div>
              <div className={styles.chosenTime}>Choose</div>
            </div>
          </div>
          <div className={styles.stepper}>
            <NavMobileStepper
              activeStep={activeStep}
              setActiveStep={setActiveStep}
              handleBack={handleBack}
              handleNext={handleNext}
              disableNext={disableNext}
              // allowCancel={allowCancel}
            />
          </div>
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
