import React, { useState } from 'react'
import styles from './CustomBookingCard.module.css'

import { LocalizationProvider, TimePicker, DatePicker, DateCalendar } from '@mui/x-date-pickers'
import dayjs from 'dayjs'
import { useTheme, ThemeProvider, createTheme } from '@mui/material/styles'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import useBookingFormData from 'src/hooks/useBookingFormData'
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
  activeStep,
  setActiveStep,
  formData,
  handleChangeFormData,
  disableNext
}) => {
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

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <ThemeProvider theme={customTheme}>
        <div className={styles.bookingScheduleCard}>
          <div className={styles.cardTitle}>
            {artist.firstName} {artist.lastName}
          </div>
          <div style={{ gap: '8px', marginBottom: '32px', display: 'flex' }}>
            {artist.genre.length > 0 && artist.genre.map((g, index) => <Tag key={`${g}-$${index}`}>{g}</Tag>)}
          </div>
          <div className={styles.calendarInstruction}>Choose When 👇</div>
          <div>
            <DateCalendar
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
          <div className={styles.timePickersWrapper}>
            <div className={styles.timePicker}>
              <div className={styles.specificTime}>Get-In Time</div>
              <div className={styles.chosenTime}>Choose</div>
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
