import React, { useState } from 'react'
import {
  Card,
  CardContent,
  Typography,
  Button,
  Grid,
  Stepper,
  Step,
  StepLabel,
  Snackbar,
  IconButton
} from '@mui/material'
import { LocalizationProvider, TimePicker, DateCalendar } from '@mui/x-date-pickers'
import CheckCircleIcon from '@mui/icons-material/CheckCircle'
import CloseIcon from '@mui/icons-material/Close'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { useTheme, ThemeProvider, createTheme } from '@mui/material/styles'
import MobileStepper from '@mui/material/MobileStepper'
import KeyboardArrowLeft from '@mui/icons-material/KeyboardArrowLeft'
import KeyboardArrowRight from '@mui/icons-material/KeyboardArrowRight'
import { Tag } from 'src/pages/artist-profile'
import { borderRadius } from '@mui/system'
import { Calendar } from 'iconsax-react'

const customLocale = {
  weekdays: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'] // Override the day abbreviations
}

const customTheme = createTheme({
  components: {
    MuiPickersCalendarHeader: {
      styleOverrides: {
        root: {
          color: '#4B627F',
          padding: '0',
          justifyContent: 'space-between'
        }
      }
    },

    MuiCard: {
      styleOverrides: {
        root: {
          boxShadow: 'none',
          padding: '24px'
        }
      }
    },
    MuiCardContent: {
      styleOverrides: {
        root: {
          boxShadow: 'none',
          padding: '0'
        }
      }
    },

    MuiMobileStepper: {
      styleOverrides: {
        root: {
          fontSize: '16px'
        }
      }
    },
    MuiPickersDay: {
      styleOverrides: {
        root: {
          color: '#4B627F',
          padding: '0',
          fontSize: '16px',
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

function BookingCard() {
  const [activeStep, setActiveStep] = useState(0)
  const [selectedDate, setSelectedDate] = useState(null)
  const [getInTime, setGetInTime] = useState(null)
  const [startTime, setStartTime] = useState(null)
  const [endTime, setEndTime] = useState(null)
  const [openSnackbar, setOpenSnackbar] = useState(false)

  const steps = ['Select Date', 'Select Times', 'Summary']

  const handleNext = () => {
    setActiveStep(prevActiveStep => prevActiveStep + 1)
  }

  const handleBack = () => {
    setActiveStep(prevActiveStep => prevActiveStep - 1)
  }

  const handleSnackbarClose = () => {
    setOpenSnackbar(false)
  }

  const handleConfirmBooking = () => {
    // Logic to confirm booking
    setOpenSnackbar(true)
  }

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale={customLocale}>
      <ThemeProvider theme={customTheme}>
        <Card>
          <CardContent>
            {activeStep === 0 && (
              <Grid>
                <Typography sx={{ fontSize: '24px', fontWeight: '500' }} gutterBottom>
                  John Doe
                </Typography>
                <Grid container gap={1} marginBottom={4}>
                  <Tag>Rock</Tag>
                  <Tag>Afrobeat</Tag>
                </Grid>
                <Typography sx={{ fontSize: '19px', fontWeight: '400' }} gutterBottom>
                  Choose When 👇
                </Typography>
                <Grid marginBottom={2} padding='16px' borderRadius='20px' boxShadow='0 7px 36px #00000014 '>
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
                    disablePast
                  />
                </Grid>
                <Typography gutterBottom fontSize='17px' color='#183D4C'>
                  What time?
                </Typography>
                <Grid container border='1px solid #CBD4DC' borderRadius='12px'>
                  <Grid item xs={4} border='none'>
                    <TimePicker
                      label='Get In Time'
                      value={getInTime}
                      onChange={time => setGetInTime(time)}
                      renderInput={params => <TextField {...params} />}
                    />
                  </Grid>
                  <Grid item border='none' xs={4}>
                    <TimePicker
                      label='Start Time'
                      value={startTime}
                      onChange={time => setStartTime(time)}
                      renderInput={params => <TextField {...params} />}
                    />
                  </Grid>
                  <Grid item xs={4}>
                    <TimePicker
                      label='End Time'
                      value={endTime}
                      onChange={time => setEndTime(time)}
                      renderInput={params => <TextField {...params} />}
                    />
                  </Grid>
                </Grid>
                <NavMobileStepper
                  activeStep={activeStep}
                  setActiveStep={setActiveStep}
                  handleBack={handleBack}
                  handleNext={handleNext}
                />
              </Grid>
            )}

            {activeStep === 1 && (
              <Grid container flexDirection='column'>
                <Typography fontSize='24px' fontWeight='500' gutterBottom>
                  John Doe
                </Typography>
                <Grid container gap={1} marginBottom={4}>
                  <Tag>Rock</Tag>
                  <Tag>Afrobeat</Tag>
                </Grid>
                <Grid container justifyContent='space-between'>
                  <Typography fontSize='19px' color='#183D4C'>
                    Summary
                  </Typography>
                  <Typography fontSize='15px' color='#62AFE8'>
                    Change
                  </Typography>
                </Grid>
                <Grid container>
                  <Grid item>
                    <Calendar />
                  </Grid>
                  <Grid container>
                    <Typography>Date</Typography>
                    <Typography>2024-01-24</Typography>
                  </Grid>
                </Grid>
                <Typography>
                  Date: {selectedDate ? selectedDate.toDateString() : 'Not selected'}
                  <br />
                  Get In Time: {getInTime ? getInTime.toLocaleTimeString() : 'Not selected'}
                  <br />
                  Start Time: {startTime ? startTime.toLocaleTimeString() : 'Not selected'}
                  <br />
                  End Time: {endTime ? endTime.toLocaleTimeString() : 'Not selected'}
                </Typography>
                <NavMobileStepper
                  activeStep={activeStep}
                  setActiveStep={setActiveStep}
                  handleBack={handleBack}
                  handleNext={handleNext}
                />
              </Grid>
            )}
            {activeStep === 2 && (
              <Grid>
                <Typography>
                  Date: {selectedDate ? selectedDate.toDateString() : 'Not selected'}
                  <br />
                  Get In Time: {getInTime ? getInTime.toLocaleTimeString() : 'Not selected'}
                  <br />
                  Start Time: {startTime ? startTime.toLocaleTimeString() : 'Not selected'}
                  <br />
                  End Time: {endTime ? endTime.toLocaleTimeString() : 'Not selected'}
                </Typography>
              </Grid>
            )}
          </CardContent>
        </Card>
      </ThemeProvider>
    </LocalizationProvider>
  )
}

const NavMobileStepper = ({ activeStep, setActiveStep, handleNext, handleBack }) => {
  const theme = useTheme()

  return (
    <MobileStepper
      variant='dots'
      sx={{
        marginTop: 'auto',
        color: '#FC8A5E',
        '& .MuiMobileStepper-dotActive': {
          backgroundColor: '#f07a4b'
        }
      }}
      steps={3}
      position='static'
      activeStep={activeStep}
      nextButton={
        <Button
          size='small'
          sx={{ background: '#FC8A5E', color: 'white', ':hover': { background: '#f07a4b' } }}
          onClick={handleNext}
          disabled={activeStep === 3}
        >
          Next
          {theme.direction === 'rtl' ? <KeyboardArrowLeft /> : <KeyboardArrowRight />}
        </Button>
      }
      backButton={
        <Button
          size='small'
          onClick={handleBack}
          disabled={activeStep === 0}
          sx={{ background: '#D5DFEC', color: '#4B627F', ':hover': { background: '#f07a4b' } }}
        >
          {theme.direction === 'rtl' ? <KeyboardArrowRight /> : <KeyboardArrowLeft />}
          Back
        </Button>
      }
    />
  )
}

export default BookingCard
