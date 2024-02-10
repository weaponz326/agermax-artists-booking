// ** React Import
import React, { useRef, useState } from 'react';

// ** MUI Imports
import { Button, List, Box, IconButton, Typography, Divider, Paper, styled, ThemeProvider } from '@mui/material';
import Link from 'next/link'; // Import Link from Next.js
import Icon from 'src/@core/components/icon';
import CalendarIcon from 'src/components/AdminPagesSharedComponents/CalendarIcon/CalendarIcon';

// ** Styled Component Imports
import { createTheme, responsiveFontSizes } from '@mui/material/styles';
import PerfectScrollbar from 'react-perfect-scrollbar';

// ** Theme Config and Utils Import
import themeConfig from 'src/configs/themeConfig';
import themeOptions from 'src/@core/theme/ThemeOptions';
import { hexToRGBA } from 'src/@core/utils/hex-to-rgba';
import { useRouter } from 'next/router';

// ** Drawer, Nav Items, and Header Imports (Assuming these are local components)
import Drawer from './Drawer';
import VerticalNavItems from './VerticalNavItems';
import VerticalNavHeader from './VerticalNavHeader';

// Styled components based on the CSS provided
const EventCard = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(2),
  margin: theme.spacing(2, 0),
  textAlign: 'center',
  borderRadius: theme.shape.borderRadius,
  boxShadow: theme.shadows[1]
}));

const StyledButton = styled(Button)(({ theme }) => ({
  marginTop: theme.spacing(1),
  marginBottom: theme.spacing(1),
  color: theme.palette.grey[900],
  backgroundColor: '#fff',
  width: '100%',
  '&:hover': {
    backgroundColor: theme.palette.grey[300]
  }
}));

const DateBox = styled(Box)(({ theme }) => ({
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
}));

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
}));

const QuickLinksContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  justifyContent: 'space-around',
  padding: theme.spacing(2),
  '& .quick-link': {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    borderRadius: theme.shape.borderRadius,
    boxShadow: theme.shadows[2],
    backgroundColor: '#fff',
    border: '1px solid #c0c0c0',
    '&:hover': {
      backgroundColor: theme.palette.action.hover,
      color: '#4428F2',
      border: '1px solid #4428F2'
    },
    '& .icon': {
      fontSize: '1.75rem'
    },
    '& .quick-link-text': {
      marginTop: theme.spacing(1),
      fontSize: '0.875rem'
    }
  }
}));

const QuickActions = () => {
  const router = useRouter();
  const quickLinks = [
    { title: 'Invoice', icon: 'tabler:receipt', path: '/admin/invoice' },
    { title: 'Profile', icon: 'tabler:user', path: '/admin/account' },
    { title: 'Notifs', icon: 'tabler:bell', path: '/admin/notifications' }
  ];

  return (
    <QuickLinksContainer>
      {quickLinks.map((link, index) => (
        <div key={index} onClick={() => router.push(`${link.path}`)}>
          <IconButton className='quick-link' sx={{ width: 'auto', height: 'auto' }}>
            <Icon icon={link.icon} className='icon' />
            <Typography variant='caption' className='quick-link-text'>
              {link.title}
            </Typography>
          </IconButton>
        </div>
      ))}
    </QuickLinksContainer>
  );
};

const CalendarComponent = () => (
  <Box sx={{ m: 2, borderRadius: 'borderRadius' }}>
    <EventCard sx={{ bgcolor: '#eaeaea', border: '1px solid #d0d0d0' }}>
      <DateBox>
        <CalendarIcon />
      </DateBox>
      <Box sx={{ float: 'left', width: 'calc(100% - 60px)' }}>
        <Typography variant="body1" component="p" sx={{ textAlign: 'left' }}>
          Stockholm music fes..
        </Typography>
        <Typography variant="body1" component="p" sx={{ fontWeight: 'bold', textAlign: 'left' }}>
          John Doe
        </Typography>
      </Box>
      <Divider sx={{ width: '100%' }} />
      <Typography variant="h3" component="p" sx={{ my: 2 }}>
        21:00 to 01:00
      </Typography>
      <StyledButton size="small">Details</StyledButton>
    </EventCard>
  </Box>
);

const Navigation = (props) => {
  const {
    hidden,
    settings,
    afterNavMenuContent,
    beforeNavMenuContent,
    navigationBorderWidth,
    navMenuContent: userNavMenuContent,
  } = props;

  const [navHover, setNavHover] = useState(false);
  const shadowRef = useRef(null);
  let theme = createTheme(themeOptions(settings, settings.theme));

  if (themeConfig.responsiveFontSizes) {
    theme = responsiveFontSizes(theme);
  }

  if (theme.palette.mode === 'light') {
    theme.palette.background.default = '#f0f0f0';
    theme.palette.background.paper = '#f0f0f0';
  }

  const scrollMenu = (container) => {
    container = hidden ? container.target : container;
    if (shadowRef.current && container.scrollTop > 0) {
      shadowRef.current.classList.add('scrolled');
    } else if (shadowRef.current) {
      shadowRef.current.classList.remove('scrolled');
    }
  };

  const ScrollWrapper = hidden ? Box : PerfectScrollbar;

  return (
    <ThemeProvider theme={theme}>
      <Drawer {...props} navHover={navHover} setNavHover={setNavHover} navigationBorderWidth={navigationBorderWidth}>
        <VerticalNavHeader {...props} navHover={navHover} />
        {beforeNavMenuContent && (
          <StyledBoxForShadow ref={shadowRef} />
        )}
        <Box sx={{ position: 'relative', overflow: 'hidden' }}>
          <ScrollWrapper
            {...(hidden
              ? {
                  onScroll: scrollMenu,
                  sx: { height: '100%', overflowY: 'auto', overflowX: 'hidden' }
                }
              : {
                  options: { wheelPropagation: false },
                  onScrollY: scrollMenu,
                })}
          >
            {userNavMenuContent || (
              <List sx={{ pt: 0, '& > :first-child': { mt: '0' } }}>
                <VerticalNavItems {...props} />
              </List>
            )}
            <Box sx={{ px: 2, py: 2 }}>
              <Typography variant='overline' sx={{ pl: 6, my: 2 }}>
                Quick Links
              </Typography>
              <QuickActions />
              <Typography variant='overline' sx={{ pl: 6, my: 2 }}>
                Next Event
              </Typography>
              <CalendarComponent />
            </Box>
          </ScrollWrapper>
        </Box>
      </Drawer>
    </ThemeProvider>
  );
};

export default Navigation;
