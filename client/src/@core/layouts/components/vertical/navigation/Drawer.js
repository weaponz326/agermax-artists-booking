// ** MUI Imports
import { styled } from '@mui/material/styles'
import { StyledEngineProvider } from '@mui/material/styles'
import MuiSwipeableDrawer from '@mui/material/SwipeableDrawer'
import styles from './Drawer.module.css'
import { width } from '@mui/system'

const SwipeableDrawer = styled(MuiSwipeableDrawer)({
  overflowX: 'hidden',
  transition: 'width .25s ease-in-out',
  '& ul': {
    listStyle: 'none'
  },
  '& .MuiListItem-gutters': {
    paddingLeft: 4,
    paddingRight: 4
  },
  '& .MuiDrawer-paper': {
    left: 'unset',
    right: 'unset',
    overflowX: 'hidden',
    transition: 'width .25s ease-in-out, box-shadow .25s ease-in-out'
  }
})

const Drawer = props => {
  // ** Props
  const {
    hidden,
    children,
    navHover,
    navWidth,
    settings,
    navVisible,
    setNavHover,
    navMenuProps,
    setNavVisible,
    collapsedNavWidth,
    navigationBorderWidth
  } = props

  // ** Vars
  const { skin, navCollapsed } = settings
  let flag = true

  // Drawer Props for Mobile & Tablet screens
  const MobileDrawerProps = {
    open: navVisible,
    onOpen: () => setNavVisible(true),
    onClose: () => setNavVisible(false),
    ModalProps: {
      keepMounted: true // Better open performance on mobile.
    }
  }

  // Drawer Props for Laptop & Desktop screens
  const DesktopDrawerProps = {
    open: true,
    onOpen: () => null,
    onClose: () => null,
    onMouseEnter: () => {
      // Declared flag to resolve first time flicker issue while trying to collapse the menu
      if (flag || navCollapsed) {
        setNavHover(true)
        flag = false
      }
    },
    onMouseLeave: () => {
      if (navCollapsed) {
        setNavHover(false)
      }
    }
  }
  let userNavMenuStyle = {}
  let userNavMenuPaperStyle = {}
  if (navMenuProps && navMenuProps.sx) {
    userNavMenuStyle = navMenuProps.sx
  }
  if (navMenuProps && navMenuProps.PaperProps && navMenuProps.PaperProps.sx) {
    userNavMenuPaperStyle = navMenuProps.PaperProps.sx
  }
  const userNavMenuProps = Object.assign({}, navMenuProps)
  delete userNavMenuProps.sx
  delete userNavMenuProps.PaperProps

  return (
    <StyledEngineProvider injectFirst>
      <SwipeableDrawer
        className={styles.sideNavLayoutVerticalNav}
        variant={hidden ? 'temporary' : 'permanent'}
        {...(hidden ? { ...MobileDrawerProps } : { ...DesktopDrawerProps })}
        PaperProps={{
          sx: {
            backgroundColor: 'background.paper',
            ...(!hidden && skin !== 'bordered' && { boxShadow: 2 }),
            width: navCollapsed && !navHover ? collapsedNavWidth : navWidth,
            borderRight: theme =>
              navigationBorderWidth === 0 ? 0 : `${navigationBorderWidth}px solid ${theme.palette.divider}`,
            ...userNavMenuPaperStyle
          },
          ...navMenuProps?.PaperProps
        }}
        sx={{
          width: navCollapsed ? collapsedNavWidth : navWidth,
          ...userNavMenuStyle,
          '& .MuiIconButton-root': {
            display: 'flex',
            flex: '1',
            justifyContent: 'flex-end',
            alignItems: 'center',
            // margin: '0px 0.875rem',

            minWidth: '0px',
            borderRadius: '12px',
            width: '100%',
            transition: 'padding-left 0.25s ease-in-out 0s, padding-right 0.25s ease-in-out 0s'
            // padding: '0.5rem 1rem'
          }
        }}
        {...userNavMenuProps}
      >
        {children}
      </SwipeableDrawer>
    </StyledEngineProvider>
  )
}

export default Drawer
