
// ** React Import
import { useRef, useState } from 'react'
import styles from './NavStyles.module.css';

// ** MUI Imports
import { Button, List } from '@mui/material'
import Box from '@mui/material/Box'
import IconButton from '@mui/material/IconButton'
import Typography from '@mui/material/Typography'
import Divider from '@mui/material/Divider'
import Tooltip from '@mui/material/Tooltip'
import Link from 'next/link' // Import Link from Next.js
import Icon from 'src/@core/components/icon'
import CalendarIcon from 'src/components/AdminPagesSharedComponents/CalendarIcon/CalendarIcon'

import Paper from '@mui/material/Paper'

const EventCard = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(2),
  margin: theme.spacing(2, 0),
  textAlign: 'center',
  borderRadius: theme.shape.borderRadius,
  boxShadow: theme.shadows[1]
}))

const StyledButton = styled(Button)(({ theme }) => ({
  marginTop: theme.spacing(1),
  marginBottom: theme.spacing(1),
  color: theme.palette.grey[900],
  backgroundColor: '#fff',
  width: '100%',
  '&:hover': {
    backgroundColor: theme.palette.grey[300]
  }
}))

const DateBox = styled(Box)(({ theme }) => ({
  // border: '1px solid #d0d0d0',
  // borderRadius: theme.shape.borderRadius,
  float: 'left',
  marginRight: theme.spacing(2),
  padding: 0,
  '& .month': {
    color: 'white',
    backgroundColor: 'red'
  },
  '& .day': {
    backgroundColor: 'white'
  }
}))

const CalendarComponent = () => {
  return (
    <Box
      sx={{
        // bgcolor: '#fff', // Here's where you set the background color
        // p: 2, // You can add padding
        m: 2,
        borderRadius: 'borderRadius'
      }}
    >
      <EventCard
        sx={{
          bgcolor: '#eaeaea', // Here's where you set the background color
          border: '1px solid #d0d0d0'
        }}
      >
        <DateBox>
          <CalendarIcon />
        </DateBox>
        <Box sx={{ float: 'left', width: 'calc(100% - 60px)' }}>
          <Typography variant='body1' component='p' sx={{ textAlign: 'left' }}>
            Stockholm music fes..
          </Typography>
          <Typography variant='body1' component='p' sx={{ fontWeight: 'bold', textAlign: 'left' }}>
            John Doe
          </Typography>
        </Box>
        <Divider sx={{ width: '100%' }} />
        <Typography variant='h3' component='p' sx={{ my: 2 }}>
          21:00 to 01:00
        </Typography>
        <StyledButton size='small'>Details</StyledButton>
      </EventCard>
    </Box>
  )
}

// Define a Box to contain the quick links, with appropriate styling
const QuickLinksContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  justifyContent: 'space-around',
  padding: theme.spacing(2), // Add some padding for spacing
  '& .quick-link': {
    display: 'flex',
    flexDirection: 'column', // Stack icon and text vertically
    alignItems: 'center',
    borderRadius: theme.shape.borderRadius,
    boxShadow: theme.shadows[2], // Add shadow to the icons
    backgroundColor: '#fff',
    border: '1px solid #c0c0c0',
    '&:hover': {
      backgroundColor: theme.palette.action.hover,
      color: '#4428F2',
      border: '1px solid #4428F2'
    },
    '& .icon': {
      fontSize: '1.75rem' // Slightly increase the icon size
    },
    '& .quick-link-text': {
      marginTop: theme.spacing(1), // Space between icon and text
      fontSize: '0.875rem' // Small text size for the names
    }
  }
}))

// Define the QuickActions component
const QuickActions = () => {
  const router = useRouter()
  const quickLinks = [
    { title: 'Invoice', icon: 'tabler:receipt', path: '/admin/invoice' },
    { title: 'Profile', icon: 'tabler:user', path: '/admin/account' },
    { title: 'Notifs', icon: 'tabler:bell', path: '/admin/notifications' }
  ]

  return (
    <QuickLinksContainer>
      {quickLinks.map((link, index) => (
        //Replace the Link tag with div, which we can use useRouter to push to new Links
        <div key={index} href={link.path} onClick={() => router.push(`${link.path}`)}>
          {/* <Tooltip title={link.title} arrow> */}
            <IconButton className='quick-link' component='a' sx={{ width: 'auto', height: 'auto' }}>
              <Icon icon={link.icon} className='icon' />
              <Typography variant='caption' className='quick-link-text'>
                {link.title}
              </Typography>
            </IconButton>
          {/* </Tooltip> */}
        </div>
      ))}
    </QuickLinksContainer>
  )
}

import { createTheme, responsiveFontSizes, styled, ThemeProvider } from '@mui/material/styles'

// ** Third Party Components
import PerfectScrollbar from 'react-perfect-scrollbar'

// ** Theme Config
import themeConfig from 'src/configs/themeConfig'

// ** Component Imports
import Drawer from './Drawer'
import VerticalNavItems from './VerticalNavItems'
import VerticalNavHeader from './VerticalNavHeader'

// ** Theme Options
import themeOptions from 'src/@core/theme/ThemeOptions'

// ** Util Import
import { hexToRGBA } from 'src/@core/utils/hex-to-rgba'
import { useRouter } from 'next/router'

const StyledBoxForShadow = styled(Box)(({ theme }) => ({
  top: 60,
  left: -8,
  zIndex: 2,
  opacity: 0,
  position: 'absolute',
  pointerEvents: 'none',
  width: 'calc(100% + 15px)',
  height: theme.mixins.toolbar.minHeight,
  transition: 'opacity .15s ease-in-out',
  background: `linear-gradient(${theme.palette.background.paper} ${
    theme.direction === 'rtl' ? '95%' : '5%'
  },${hexToRGBA(theme.palette.background.paper, 0.85)} 30%,${hexToRGBA(
    theme.palette.background.paper,
    0.5
  )} 65%,${hexToRGBA(theme.palette.background.paper, 0.3)} 75%,transparent)`,
  '&.scrolled': {
    opacity: 1
  }
}))

const Navigation = props => {
  // ** Props
  const {
    hidden,
    settings,
    afterNavMenuContent,
    beforeNavMenuContent,
    navigationBorderWidth,
    navMenuContent: userNavMenuContent
  } = props

  // ** States
  const [navHover, setNavHover] = useState(false)
  const [groupActive, setGroupActive] = useState([])
  const [currentActiveGroup, setCurrentActiveGroup] = useState([])

  // ** Ref
  const shadowRef = useRef(null)

  // ** Var
  const { afterVerticalNavMenuContentPosition, beforeVerticalNavMenuContentPosition } = themeConfig

  const navMenuContentProps = {
    ...props,
    navHover,
    groupActive,
    setGroupActive,
    currentActiveGroup,
    setCurrentActiveGroup
  }

  // ** Create a theme based on the settings
  let theme = createTheme(themeOptions(settings, settings.theme))

  // ** Enhance the theme with responsive fonts if needed
  if (themeConfig.responsiveFontSizes) {
    theme = responsiveFontSizes(theme)
  }

  // ** Adjust the theme only if the theme mode is 'light'
  if (theme.palette.mode === 'light') {
    theme.palette.background.default = '#f0f0f0' // light grey background for the nav drawer in light mode
    theme.palette.background.paper = '#f0f0f0' // same color for paper elements in the drawer in light mode
  }

  // ** Fixes Navigation InfiniteScroll
  const handleInfiniteScroll = ref => {
    if (ref) {
      // @ts-ignore
      ref._getBoundingClientRect = ref.getBoundingClientRect
      ref.getBoundingClientRect = () => {
        // @ts-ignore
        const original = ref._getBoundingClientRect()

        return { ...original, height: Math.floor(original.height) }
      }
    }
  }

  // ** Scroll Menu
  const scrollMenu = container => {
    if (beforeVerticalNavMenuContentPosition === 'static' || !beforeNavMenuContent) {
      container = hidden ? container.target : container
      if (shadowRef && container.scrollTop > 0) {
        // @ts-ignore
        if (!shadowRef.current.classList.contains('scrolled')) {
          // @ts-ignore
          shadowRef.current.classList.add('scrolled')
        }
      } else {
        // @ts-ignore
        shadowRef.current.classList.remove('scrolled')
      }
    }
  }
  const ScrollWrapper = hidden ? Box : PerfectScrollbar

  return (
    <ThemeProvider theme={theme}>
      <Drawer {...props} navHover={navHover} setNavHover={setNavHover} navigationBorderWidth={navigationBorderWidth}>
        <VerticalNavHeader {...props} navHover={navHover} />
        {beforeNavMenuContent && beforeVerticalNavMenuContentPosition === 'fixed'
          ? beforeNavMenuContent(navMenuContentProps)
          : null}
        {(beforeVerticalNavMenuContentPosition === 'static' || !beforeNavMenuContent) && (
          <StyledBoxForShadow ref={shadowRef} />
        )}
        <Box sx={{ position: 'relative', overflow: 'hidden' }}>
          {/* @ts-ignore */}
          <ScrollWrapper
            {...(hidden
              ? {
                  onScroll: container => scrollMenu(container),
                  sx: { height: '100%', overflowY: 'auto', overflowX: 'hidden' }
                }
              : {
                  options: { wheelPropagation: false },
                  onScrollY: container => scrollMenu(container),
                  containerRef: ref => handleInfiniteScroll(ref)
                })}
          >
            {beforeNavMenuContent && beforeVerticalNavMenuContentPosition === 'static'
              ? beforeNavMenuContent(navMenuContentProps)
              : null}
            {userNavMenuContent ? (
              userNavMenuContent(navMenuContentProps)
            ) : (
              <List className='nav-items' sx={{ pt: 0, '& > :first-child': { mt: '0' } }}>
                <VerticalNavItems
                  navHover={navHover}
                  groupActive={groupActive}
                  setGroupActive={setGroupActive}
                  currentActiveGroup={currentActiveGroup}
                  setCurrentActiveGroup={setCurrentActiveGroup}
                  {...props}
                />
              </List>
            )}
            {afterNavMenuContent && afterVerticalNavMenuContentPosition === 'static'
              ? afterNavMenuContent(navMenuContentProps)
              : null}
            <Box sx={{ px: 2, py: 2 }}>
              <Typography variant='overline' sx={{ pl: 6, my: 2 }}>
                Quick Links
              </Typography>
              <QuickActions sx={{ mx: 12 }} />

              <Typography variant='overline' sx={{ pl: 6, my: 2 }}>
                Next Event
              </Typography>
              <CalendarComponent sx={{ mx: 12 }} />
            </Box>
          </ScrollWrapper>
        </Box>
        {afterNavMenuContent && afterVerticalNavMenuContentPosition === 'fixed'
          ? afterNavMenuContent(navMenuContentProps)
          : null}
      </Drawer>
    </ThemeProvider>
  )
}

export default Navigation
