import React, { useEffect, useState } from 'react'
import { Card, CardContent, Typography, Button, Grid } from '@mui/material'
import { LocalizationProvider, TimePicker, DatePicker } from '@mui/x-date-pickers'
import { DateCalendar } from '@mui/x-date-pickers/DateCalendar'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'

import dayjs from 'dayjs'
// import moment from 'moment'

import { useTheme, ThemeProvider, createTheme } from '@mui/material/styles'
import MobileStepper from '@mui/material/MobileStepper'
// import { Tag } from 'src/pages/artist-profile'
import { Tag } from 'src/pages/artists/[id]'
import { ArrowLeft, ArrowRight, Calendar, Clock } from 'iconsax-react'
import styles from './BookingCard.module.css'
import { createBooking } from 'src/services/bookings'
import { useAuth } from 'src/hooks/useAuth'
import Link from 'next/link'
import { useRouter } from 'next/router'
import BookingCardSchedular from './CustomBookingCard'
import useBookingFormData from 'src/hooks/useBookingFormData'
import { NavMobileStepper } from './BookingCard'

function NavBarBookingCard({
  onDone,
  open,
  setOpen,
  artist,
  allowCancel,
  formData,
  handleChangeFormData,
  setFormData,
  selectedArtist,
  setSelectedArtist,
  setActiveInputTab,
  activeInputTab,
  setIsScheduled
}) {
  /****************Fetch Artist ********************/
  useEffect(() => {
    if (artist) setSelectedArtist(artist)
  }, [artist])

  const [activeStep, setActiveStep] = useState(0)
  const [disableNext, setDisableNext] = useState(true)

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

  const handleChange = (name, value) => {
    setFormData({
      ...formData,
      [name]: value
    })
    console.log(formData)
  }

  const handleSubmit = async e => {
    // e.preventDefault()
    try {
      const newBooking = await createBooking(formData)
      console.log('New booking created: ', newBooking)
      // Optionally, you can redirect or perform any other action after successful booking creation
    } catch (error) {
      console.error('Error creating booking: ', error)
      // Handle error, e.g., display an error message to the user
    }
  }

  //Handle Disable or Enable effects of buttons
  useEffect(() => {
    if (formData.getInTime && formData.startTime && formData.endTime && formData.dateTimeRequested) {
      setDisableNext(false)
    } else {
      setDisableNext(true)
    }
  }, [formData])

  //Handlers for Next and Back Buttons Click and Submission of Date
  const handleNext = () => {
    if (activeStep === 1) {
      setActiveInputTab(2)
      setIsScheduled(true)
    } else {
      setActiveStep(prevActiveStep => prevActiveStep + 1)
    }
  }

  const handleBack = () => {
    if (activeStep !== 0) setActiveStep(prevActiveStep => prevActiveStep - 1)
    if (activeStep === 0) setActiveInputTab(0)
    return
  }

  if (selectedArtist != null) {
    return (
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <ThemeProvider theme={customTheme}>
          <div
            style={{
              height: '100%',
              display: 'flex',
              flexDirection: 'column',
              overflow: 'auto',
              padding: '20px',
              fontFamily: 'var(--main-font-family)'
            }}
            className='bookingCardWrapper'
          >
            <div style={{ height: '100%' }}>
              {activeStep === 1 && (
                <div>
                  <Typography fontSize='24px' fontWeight='500' gutterBottom>
                    {selectedArtist.firstName} {selectedArtist.lastName}
                  </Typography>
                  <Grid container gap={1} marginBottom={4}>
                    {selectedArtist.genre.length > 0 &&
                      selectedArtist.genre.map((g, index) => <Tag key={`${g} index`}>{g}</Tag>)}
                  </Grid>
                </div>
              )}
              {activeStep === 0 && (
                <BookingCardSchedular
                  artist={selectedArtist}
                  allowCancel={false}
                  formData={formData}
                  setFormData={setFormData}
                  handleChangeFormData={handleChangeFormData}
                  selectedArtist={selectedArtist}
                  setSelectedArtist={setSelectedArtist}
                  onDone={() => setOpenDropdown(false)}
                  activeInputTab={activeInputTab}
                  setActiveInputTab={setActiveInputTab}
                  setIsScheduled={setIsScheduled}
                  activeStep={activeStep}
                  setActiveStep={setActiveStep}
                  handleBack={handleBack}
                  handleNext={handleNext}
                  disableNext={disableNext}
                />
              )}

              {activeStep === 1 && (
                <Grid height='100%' container flexDirection='column'>
                  <Grid container justifyContent='space-between' alignItems='center'>
                    <Typography fontSize='19px' fontWeight='450'>
                      Summary
                    </Typography>
                    <Typography
                      sx={{ cursor: 'pointer' }}
                      fontSize='15px'
                      color='#62AFE8'
                      onClick={() => setActiveStep(0)}
                    >
                      Change
                    </Typography>
                  </Grid>
                  <Grid container className={styles.summaryDetailsContainer}>
                    <Grid item>
                      <Calendar />
                    </Grid>
                    <Grid item>
                      <Typography fontSize='15px' color='#4B627F'>
                        Date
                      </Typography>
                      <Typography sx={{ fontSize: '19px', fontWeight: '450' }}>
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
                        <Typography sx={{ fontSize: '19px', fontWeight: '450' }}>
                          {dayjs(formData.getInTime).format('HH:mm')}
                        </Typography>
                      </Grid>
                      <Grid item textAlign='center'>
                        <Typography fontSize='15px' color='#4B627F'>
                          Start
                        </Typography>
                        <Typography sx={{ fontSize: '19px', fontWeight: '450' }}>
                          {dayjs(formData.startTime).format('HH:mm')}
                        </Typography>
                      </Grid>
                      <Grid item textAlign='center'>
                        <Typography fontSize='15px' color='#4B627F'>
                          End
                        </Typography>
                        <Typography sx={{ fontSize: '19px', fontWeight: '450' }}>
                          {dayjs(formData.endTime).format('HH:mm')}
                        </Typography>
                      </Grid>
                    </Grid>
                  </Grid>

                  <Grid marginTop='auto'>
                    <NavMobileStepper
                      activeStep={activeStep}
                      setActiveStep={setActiveStep}
                      handleBack={handleBack}
                      handleNext={handleNext}
                    />
                  </Grid>
                </Grid>
              )}
            </div>
          </div>
        </ThemeProvider>
      </LocalizationProvider>
    )
  } else {
    return <p onClick={() => setActiveInputTab(0)}>Please Select Performer First</p>
  }
}

export default NavBarBookingCard
