// ** Next Import
import Link from 'next/link'

// ** MUI Components
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import CardContent from '@mui/material/CardContent'
import { styled, useTheme } from '@mui/material/styles'
import MuiCard from '@mui/material/Card'
import Avatar from 'src/@core/components/mui/avatar'

// ** Custom Component Import
import CustomTextField from 'src/@core/components/mui/text-field'

// ** Icon Imports
import Icon from 'src/@core/components/icon'

// ** Configs
import themeConfig from 'src/configs/themeConfig'

// ** Layout Import
import BlankLayout from 'src/@core/layouts/BlankLayout'

// ** Styled Components
const Card = styled(MuiCard)(({ theme }) => ({
  [theme.breakpoints.up('sm')]: { width: '25rem' }
}))

const LinkStyled = styled(Link)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  textDecoration: 'none',
  justifyContent: 'center',
  color: theme.palette.primary.main,
  fontSize: theme.typography.body1.fontSize
}))

const ForgotPassword = () => {
  // ** Hook
  const theme = useTheme()

  return (
    <Box className='content-center'>
      <Card>
        <CardContent sx={{ p: theme => `${theme.spacing(10.5, 8, 8)} !important` }}>
          <Box sx={{ mb: 8, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Avatar src='/images/logo.png' alt='Logo' />
            <Typography variant='h3' sx={{ ml: 2.5, fontWeight: 700 }}>
              {themeConfig.templateName}
            </Typography>
          </Box>
          <Box sx={{ mb: 6 }}>
            <Typography variant='h4' sx={{ mb: 1.5 }}>
              Forgot Password? 🔒
            </Typography>
            <Typography sx={{ color: 'text.secondary' }}>
              Enter your email and we&prime;ll send you instructions to reset your password
            </Typography>
          </Box>
          <form noValidate autoComplete='off' onSubmit={e => e.preventDefault()}>
            <CustomTextField
              autoFocus
              fullWidth
              type='email'
              label='Email'
              sx={{ display: 'flex', mb: 4 }}
              placeholder='john.doe@gmail.com'
            />
            <Button fullWidth type='submit' variant='contained' sx={{ mb: 4 }}>
              Send reset link
            </Button>
            <Typography sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', '& svg': { mr: 1 } }}>
              <LinkStyled href='/login'>
                <Icon fontSize='1.25rem' icon='tabler:chevron-left' />
                <span>Back to login</span>
              </LinkStyled>
            </Typography>
          </form>
        </CardContent>
      </Card>
    </Box>
  )
}
ForgotPassword.getLayout = page => <BlankLayout>{page}</BlankLayout>
ForgotPassword.guestGuard = true

export default ForgotPassword
