import React, { useState } from 'react'
import { useAuth } from 'src/hooks/useAuth'
import { Box, Card, TextField, Button, Typography, CardContent, Grid, Stepper, Step, StepLabel } from '@mui/material'
import axios from 'axios'
import authConfig from 'src/configs/auth'
// Assuming ImageUpload and FileUploaderMultiple are correctly imported based on your folder structure
import ImageUpload from 'src/components/ImageUpload/ImageUpload'
import FileUploaderMultiple from 'src/components/FileUploader/FileUploader'

const TabAccount = () => {
  const { user } = useAuth()
  const [formData, setFormData] = useState({
    profilePhoto: user?.profilePhoto || '',
    firstName: user?.firstName || '',
    lastName: user?.lastName || '',
    email: user?.email || '',
    contactPhone: user?.contactPhone || '',
    address: user?.address || ''
  })
  const [activeStep, setActiveStep] = useState(0)
  const [additionalFormData, setAdditionalFormData] = useState({
    genre: user?.genre || [''],
    bio: user?.bio || '',
    nickName: user?.nickName || '',
    socialMediaLinks: user?.socialMediaLinks || [''],
    availableDates: user?.availableDates || [''],
    eventsHosted: user?.eventsHosted || [''],
    companyName: user?.companyName || '',
    organizationNumber: user?.organizationNumber || '',
    gallery: user?.gallery || ['']
  })

  const handleFormChange = field => event => {
    setFormData({ ...formData, [field]: event.target.value })
  }
  const handleArrayChange = (field, index) => event => {
    const newValues = [...additionalFormData[field]]
    newValues[index] = event.target.value
    setAdditionalFormData({ ...additionalFormData, [field]: newValues })
  }

  const addArrayField = field => {
    const newValues = [...additionalFormData[field], '']
    setAdditionalFormData({ ...additionalFormData, [field]: newValues })
  }

  const removeArrayField = (field, index) => {
    const newValues = additionalFormData[field].filter((_, idx) => idx !== index)
    setAdditionalFormData({ ...additionalFormData, [field]: newValues })
  }

  const handleAdditionalFormChange = field => event => {
    setAdditionalFormData({ ...additionalFormData, [field]: event.target.value })
  }

  const handleSubmit = e => {
    e.preventDefault()
    console.log('Form Data:', formData)
    try {
      axios.put(`${process.env.NEXT_PUBLIC_API_URL}/profile`, formData, {
        headers: { Authorization: `Bearer ${accessToken}` }
      })
      alert('Profile updated successfully.')
    } catch (error) {
      console.error('Error updating profile:', error)
      alert('Error updating profile.')
    }
  }

  const handleNext = () => {
    setActiveStep(prevActiveStep => prevActiveStep + 1)
  }

  const handleBack = () => {
    setActiveStep(prevActiveStep => prevActiveStep - 1)
  }

  const steps = ['Basic Info', 'Additional Info']

  return (
    <Card>
      <CardContent>
        <Typography variant='h6' sx={{ mb: 2 }}>
          Edit Profile
        </Typography>
        <Stepper activeStep={activeStep} sx={{ mb: 3 }}>
          {steps.map(label => (
            <Step key={label}>
              <StepLabel>{label}</StepLabel>
            </Step>
          ))}
        </Stepper>
        <form onSubmit={handleSubmit}>
          {/* Conditional rendering based on activeStep */}
          {activeStep === 0 && (
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <ImageUpload />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label='First Name'
                  value={formData.firstName}
                  onChange={handleFormChange('firstName')}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label='Last Name'
                  value={formData.lastName}
                  onChange={handleFormChange('lastName')}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  type='email'
                  label='Email'
                  value={formData.email}
                  onChange={handleFormChange('email')}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label='Phone'
                  value={formData.contactPhone}
                  onChange={handleFormChange('contactPhone')}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField fullWidth label='Address' value={formData.address} onChange={handleFormChange('address')} />
              </Grid>
            </Grid>
          )}
          {activeStep === 1 && user.role == 'artist' && (
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label='Bio'
                  multiline
                  rows={4}
                  value={additionalFormData.bio}
                  onChange={handleAdditionalFormChange('bio')}
                />
              </Grid>{' '}
              {additionalFormData.genre.map((event, index) => (
                <Grid item xs={12} sm={6} key={index}>
                  <TextField
                    fullWidth
                    label={`Genre ${index + 1}`}
                    value={event}
                    onChange={handleArrayChange('genre', index)}
                  />
                  <Button onClick={() => removeArrayField('genre', index)}>Remove</Button>
                </Grid>
              ))}
              <Button onClick={() => addArrayField('genre')}>Add Genre</Button>
              <Grid item xs={12}>
                <FileUploaderMultiple />
              </Grid>
            </Grid>
          )}

          {activeStep === 1 && user.role === 'organizer' && (
            <Grid container spacing={2}>
              {/* Organizer-specific fields */}
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label='Company Name'
                  value={formData.companyName}
                  onChange={handleFormChange('companyName')}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label='Organization Number'
                  value={formData.organizationNumber}
                  onChange={handleFormChange('organizationNumber')}
                />
              </Grid>
              {additionalFormData.eventsHosted.map((event, index) => (
                <Grid item xs={12} sm={6} key={index}>
                  <TextField
                    fullWidth
                    label={`Event ${index + 1}`}
                    value={event}
                    onChange={handleArrayChange('eventsHosted', index)}
                  />
                  <Button onClick={() => removeArrayField('eventsHosted', index)}>Remove</Button>
                </Grid>
              ))}
              <Button onClick={() => addArrayField('eventsHosted')}>Add Event</Button>
            </Grid>
          )}
          <Box sx={{ mt: 2, display: 'flex', justifyContent: 'space-between' }}>
            <Button disabled={activeStep === 0} onClick={handleBack} type='button'>
              Back
            </Button>
            {/* Check if it's the last step to decide between showing "Submit" or "Next" */}
            {activeStep < steps.length - 1 ? (
              <Button type='button' variant='contained' onClick={handleNext}>
                Next
              </Button>
            ) : (
              <Button type='submit' variant='contained'>
                Submit
              </Button>
            )}
          </Box>
        </form>
      </CardContent>
    </Card>
  )
}

export default TabAccount
