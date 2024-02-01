import React, { useState, useEffect } from 'react'
import axios from 'axios'
import authConfig from 'src/configs/auth'

// ** MUI Imports
import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import Step from '@mui/material/Step'
import Grid from '@mui/material/Grid'
import Button from '@mui/material/Button'
import Stepper from '@mui/material/Stepper'
import StepLabel from '@mui/material/StepLabel'
import TextField from '@mui/material/TextField'
import Typography from '@mui/material/Typography'
import CardContent from '@mui/material/CardContent'

// ** Custom Hooks and Components
import { useAuth } from 'src/hooks/useAuth'
import ImageUpload from 'src/components/ImageUpload/ImageUpload'

const steps = ['Basic Information', 'Additional Information']

const TabAccount = () => {
  const accessToken = window.localStorage.getItem(authConfig.storageTokenKeyName)
  const { user } = useAuth() // Assume useAuth provides accessToken directly
  const [activeStep, setActiveStep] = useState(0)
  const [formData, setFormData] = useState({
    _id: '',
    firstName: '',
    lastName: '',
    email: '',
    role: '',
    contactPhone: '',
    address: '',
    nickName: '',
    genre: '',
    bio: '',
    companyName: '',
    organizationNumber: '',
    socialMediaLinks: [],
    availableDates: [],
    gallery: [],
    eventsHosted: []
  })

  // useEffect(() => {
  //   // Fetch and set user data
  //   if (user && accessToken) {
  //     const fetchUserData = async () => {
  //       try {
  //         const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/profile`, {
  //           headers: { Authorization: `Bearer ${accessToken}` }
  //         })
  //         setFormData(response.data.userData)
  //       } catch (error) {
  //         console.error('Error fetching user data:', error)
  //       }
  //     }

  //     fetchUserData()
  //   }
  // }, [user, accessToken])

  const handleNext = () => {
    setActiveStep(prevActiveStep => prevActiveStep + 1)
  }

  const handleBack = () => {
    setActiveStep(prevActiveStep => prevActiveStep - 1)
  }

  const handleFormChange = (field, value) => {
    setFormData({ ...formData, [field]: value })
  }

  const handleSubmit = async e => {
    e.preventDefault()
    // Submit form data
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

  const BasicInformationForm = () => (
    <>
      <Grid item xs={12}>
        <ImageUpload />
      </Grid>
      <Grid item xs={12} sm={6}>
        <TextField
          fullWidth
          label='First Name'
          value={formData.firstName}
          onChange={e => handleFormChange('firstName', e.target.value)}
        />
      </Grid>
      <Grid item xs={12} sm={6}>
        <TextField
          fullWidth
          label='Last Name'
          value={formData.lastName}
          onChange={e => handleFormChange('lastName', e.target.value)}
        />
      </Grid>
      <Grid item xs={12} sm={6}>
        <TextField
          fullWidth
          type='email'
          label='Email'
          value={formData.email}
          onChange={e => handleFormChange('email', e.target.value)}
        />
      </Grid>
      <Grid item xs={12} sm={6}>
        <TextField
          fullWidth
          label='Phone'
          value={formData.contactPhone}
          onChange={e => handleFormChange('contactPhone', e.target.value)}
        />
      </Grid>
      <Grid item xs={12}>
        <TextField
          fullWidth
          label='Address'
          value={formData.address}
          onChange={e => handleFormChange('address', e.target.value)}
        />
      </Grid>
    </>
  )

  const AdditionalInformationForm = () => (
    <>
      {formData.role === 'artist' && (
        <>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label='Nickname'
              value={formData.nickName}
              onChange={e => handleFormChange('nickName', e.target.value)}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label='Genre'
              value={formData.genre}
              onChange={e => handleFormChange('genre', e.target.value)}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label='Bio'
              multiline
              rows={4}
              value={formData.bio}
              onChange={e => handleFormChange('bio', e.target.value)}
            />
          </Grid>
        </>
      )}
      {formData.role === 'organizer' && (
        <>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label='Company Name'
              value={formData.companyName}
              onChange={e => handleFormChange('companyName', e.target.value)}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label='Organization Number'
              value={formData.organizationNumber}
              onChange={e => handleFormChange('organizationNumber', e.target.value)}
            />
          </Grid>
        </>
      )}
      {/* You can add admin-specific fields here if needed */}
    </>
  )

  return (
    <Card>
      <CardContent>
        <Stepper activeStep={activeStep}>
          {steps.map(label => (
            <Step key={label}>
              <StepLabel>{label}</StepLabel>
            </Step>
          ))}
        </Stepper>
        <form onSubmit={handleSubmit}>
          <Grid container spacing={3} sx={{ marginTop: 2 }}>
            {activeStep === 0 && <BasicInformationForm />}
            {activeStep === 1 && <AdditionalInformationForm />}
          </Grid>
          <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2, marginTop: 2 }}>
            <Button color='inherit' disabled={activeStep === 0} onClick={handleBack} sx={{ mr: 1 }}>
              Back
            </Button>
            <Box sx={{ flex: '1 1 auto' }} />
            {activeStep === steps.length - 1 ? (
              <Button onClick={handleSubmit} variant='contained'>
                Submit
              </Button>
            ) : (
              <Button onClick={handleNext} variant='contained'>
                Next
              </Button>
            )}
          </Box>
        </form>
      </CardContent>
    </Card>
  )
}

export default TabAccount
