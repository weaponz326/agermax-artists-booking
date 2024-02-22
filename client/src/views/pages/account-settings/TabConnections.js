// ** Next Import
import Link from 'next/link'

// ** MUI Imports
import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import Card from '@mui/material/Card'
import Switch from '@mui/material/Switch'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import CardHeader from '@mui/material/CardHeader'
import CardContent from '@mui/material/CardContent'

// ** Icon Imports
import Icon from 'src/@core/components/icon'

const socialAccountsArr = [
  {
    title: 'Facebook',
    isConnected: false,
    logo: '/images/logos/facebook.png'
  },
  {
    title: 'Twitter',
    isConnected: true,
    username: '@Pixinvent',
    logo: '/images/logos/twitter.png'
  },
  {
    title: 'Instagram',
    isConnected: true,
    username: '@Pixinvent',
    logo: '/images/logos/instagram.png'
  },
]

const TabConnections = () => {
  return (
    <Grid container spacing={6}>
      {/* Social Accounts Cards */}
      <Grid item xs={12} md={6}>
        <Card>
          <CardHeader
            title='Social Accounts'
            titleTypographyProps={{ sx: { mb: 1 } }}
            subheader={
              <Typography sx={{ color: 'text.secondary' }}>
                Display content from social accounts on your site
              </Typography>
            }
          />
          <CardContent>
            {socialAccountsArr.map(account => {
              return (
                <Box
                  key={account.title}
                  sx={{
                    gap: 2,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    '&:not(:last-of-type)': { mb: 4 }
                  }}
                >
                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <Box sx={{ mr: 4, minWidth: 45, display: 'flex', justifyContent: 'center' }}>
                      <img src={account.logo} alt={account.title} height='38' />
                    </Box>
                    <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                      <Typography variant='h6'>{account.title}</Typography>
                      {account.isConnected ? (
                        <Typography
                          href='/'
                          component={Link}
                          onClick={e => e.preventDefault()}
                          sx={{ color: 'primary.main', textDecoration: 'none' }}
                        >
                          {account.username}
                        </Typography>
                      ) : (
                        <Typography variant='body2' sx={{ color: 'text.disabled' }}>
                          Not Connected
                        </Typography>
                      )}
                    </Box>
                  </Box>
                  <Button
                    variant='tonal'
                    sx={{ p: 1.5, minWidth: 38 }}
                    color={account.isConnected ? 'error' : 'secondary'}
                  >
                    <Icon icon={account.isConnected ? 'tabler:trash' : 'tabler:link'} />
                  </Button>
                </Box>
              )
            })}
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  )
}

export default TabConnections
