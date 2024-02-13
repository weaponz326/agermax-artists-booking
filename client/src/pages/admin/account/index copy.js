import React, { useState } from 'react'
import { useAuth } from 'src/hooks/useAuth'
import { Box, Card, TextField, Button, Typography, CardContent, Grid, Stepper, Step, StepLabel } from '@mui/material'
import axios from 'axios'
import authConfig from 'src/configs/auth'
import ImageUpload from 'src/components/ImageUpload/ImageUpload'
import FileUploaderMultiple from 'src/components/FileUploader/FileUploader'

const TabAccount = () => {
  const accessToken = window.localStorage.getItem(authConfig.storageTokenKeyName)
  const { user } = useAuth()
  const [activeStep, setActiveStep] = useState(0)
  const [formData, setFormData] = useState({
    firstName: user?.firstName || '',
    lastName: user?.lastName || '',
    email: user?.email || '',
    contactPhone: user?.contactPhone || '',
    address: user?.address || '',
    companyName: user?.companyName || '',
    organizationNumber: user?.organizationNumber || '',
    nickName: user?.nickName || '',
    genre: user?.genre || [''],
    bio: user?.bio || '',
    socialMediaLinks: user?.socialMediaLinks || [''],
    availableDates: user?.availableDates || [''],
    gallery: user?.gallery || [''],
    eventsHosted: user?.eventsHosted || ['']
  })

  const handleFormChange = field => event => {
    setFormData({ ...formData, [field]: event.target.value })
  }

  const handleArrayChange = (field, index) => event => {
    const newValues = [...formData[field]]
    newValues[index] = event.target.value
    setFormData({ ...formData, [field]: newValues })
  }

  const addArrayField = field => {
    setFormData({ ...formData, [field]: [...formData[field], ''] })
  }

  const removeArrayField = (field, index) => {
    const newValues = formData[field].filter((_, i) => i !== index)
    setFormData({ ...formData, [field]: newValues })
  }

  const handleSubmit = async e => {
    e.preventDefault()
    try {
      await axios.put(`${process.env.NEXT_PUBLIC_API_URL}/profile`, formData, {
        headers: { Authorization: `Bearer ${accessToken}` }
      })
      alert('Profile updated successfully.')
    } catch (error) {
      console.error('Error updating profile:', error)
      alert('Error updating profile.')
    }
  }

  const handleNext = () => setActiveStep(prevActiveStep => prevActiveStep + 1)
  const handleBack = () => setActiveStep(prevActiveStep => prevActiveStep - 1)

  const steps = ['Basic Information', 'Additional Information']

  // Render array fields dynamically
  const renderArrayFields = (field, label) =>
    formData[field].map((value, index) => (
      <Grid item xs={12} key={`${field}-${index}`}>
        <TextField
          fullWidth
          label={`${label} ${index + 1}`}
          value={value}
          onChange={e => handleArrayChange(field, index)(e)}
          InputProps={{
            endAdornment:
              formData[field].length > 1 ? <Button onClick={() => removeArrayField(field, index)}>Remove</Button> : null
          }}
        />
      </Grid>
    ))

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
          {activeStep === 0 && (
            <Grid container spacing={2}>
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
                <Grid item xs={12}>
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
                  <TextField
                    fullWidth
                    label='Address'
                    value={formData.address}
                    onChange={handleFormChange('address')}
                  />
                </Grid>
              </Grid>
            </Grid>
          )}
          {activeStep === 1 && user.role === 'artist' && (
            <Grid container spacing={2}>
              <TextField
                fullWidth
                label='Nick Name'
                value={formData.nickName}
                onChange={handleFormChange('nickName')}
              />
              {renderArrayFields('genre', 'Genre')}
              <TextField
                fullWidth
                multiline
                rows={4}
                label='Bio'
                value={formData.bio}
                onChange={handleFormChange('bio')}
              />
              {renderArrayFields('socialMediaLinks', 'Social Media Link')}
              {renderArrayFields('availableDates', 'Available Date')}
              {/* Assuming FileUploaderMultiple handles 'gallery' field */}
            </Grid>
          )}
          {activeStep === 1 && user.role === 'organizer' && (
            <Grid container spacing={2}>
              <TextField
                fullWidth
                label='Company Name'
                value={formData.companyName}
                onChange={handleFormChange('companyName')}
              />
              <TextField
                fullWidth
                label='Organization Number'
                value={formData.organizationNumber}
                onChange={handleFormChange('organizationNumber')}
              />
              {renderArrayFields('eventsHosted', 'Event Hosted')}
            </Grid>
          )}
          <Box sx={{ mt: 2, display: 'flex', justifyContent: 'space-between' }}>
            <Button disabled={activeStep === 0} onClick={handleBack}>
              Back
            </Button>
            <Button
              type={activeStep < steps.length - 1 ? 'button' : 'submit'}
              variant='contained'
              onClick={activeStep < steps.length - 1 ? handleNext : undefined}
            >
              {activeStep < steps.length - 1 ? 'Next' : 'Submit'}
            </Button>
          </Box>
          {['socialMediaLinks', 'availableDates', 'gallery', 'eventsHosted'].map(field => (
            <Button key={field} onClick={() => addArrayField(field)}>
              Add More {field}
            </Button>
          ))}
        </form>
      </CardContent>
    </Card>
  )
}

export default TabAccount
