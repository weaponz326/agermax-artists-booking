import React, { useState } from 'react'
import { Stepper, Step, StepLabel, Button, Typography } from '@mui/material'
import { DatePicker } from '@mui/x-date-pickers/DatePicker'
import { TimePicker } from '@mui/x-date-pickers/TimePicker'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'

function MultiStepForm() {
  const [activeStep, setActiveStep] = useState(0)
  const [selectedDate, setSelectedDate] = useState(null)
  const [getInTime, setGetInTime] = useState(null)
  const [startTime, setStartTime] = useState(null)
  const [endTime, setEndTime] = useState(null)

  const handleNext = () => {
    setActiveStep(prevActiveStep => prevActiveStep + 1)
  }

  const handleBack = () => {
    setActiveStep(prevActiveStep => prevActiveStep - 1)
  }

  const handleReset = () => {
    setActiveStep(0)
  }

  const getSteps = () => {
    return ['Select Date', 'Select Get-In Time', 'Select Start and End Time', 'Confirm Details']
  }

  const steps = getSteps()

  const getStepContent = stepIndex => {
    switch (stepIndex) {
      case 0:
        return (
          <DatePicker
            label='Select Date'
            value={selectedDate}
            onChange={date => setSelectedDate(date)}
            renderInput={params => <TextField {...params} />}
          />
        )
      case 1:
        return (
          <TimePicker
            label='Select Get-In Time'
            value={getInTime}
            onChange={time => setGetInTime(time)}
            renderInput={params => <TextField {...params} />}
          />
        )
      case 2:
        return (
          <>
            <TimePicker
              label='Select Start Time'
              value={startTime}
              onChange={time => setStartTime(time)}
              renderInput={params => <TextField {...params} />}
            />
            <TimePicker
              label='Select End Time'
              value={endTime}
              onChange={time => setEndTime(time)}
              renderInput={params => <TextField {...params} />}
            />
          </>
        )
      case 3:
        return (
          <>
            <Typography>Date: {selectedDate?.toString()}</Typography>
            <Typography>Get-In Time: {getInTime?.toString()}</Typography>
            <Typography>Start Time: {startTime?.toString()}</Typography>
            <Typography>End Time: {endTime?.toString()}</Typography>
          </>
        )
      default:
        return 'Unknown stepIndex'
    }
  }

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <div>
        <Stepper activeStep={activeStep} alternativeLabel>
          {steps.map(label => (
            <Step key={label}>
              <StepLabel>{label}</StepLabel>
            </Step>
          ))}
        </Stepper>
        <div>
          {activeStep === steps.length ? (
            <div>
              <Typography>All steps completed - confirm details:</Typography>
              <Button onClick={handleReset}>Reset</Button>
            </div>
          ) : (
            <div>
              <div>{getStepContent(activeStep)}</div>
              <div>
                <Button disabled={activeStep === 0} onClick={handleBack}>
                  Back
                </Button>
                <Button variant='contained' color='primary' onClick={handleNext}>
                  {activeStep === steps.length - 1 ? 'Confirm' : 'Next'}
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>
    </LocalizationProvider>
  )
}

export default MultiStepForm
