import { useAuth } from 'src/hooks/useAuth'

const navigation = () => {
  const { user } = useAuth()

  const navItems = [
    {
      title: 'Home',
      path: '/admin/home/admin',
      icon: 'tabler:smart-home'
    },
    {
      title: 'Bookings',
      path:
        user.role === 'admin'
          ? '/admin/bookings/admin'
          : user.role === 'organizer'
          ? '/admin/bookings/organizer'
          : user.role === 'artist'
          ? '/admin/bookings/artist'
          : '/admin/bookings',
      icon: 'tabler:address-book'
    },
    {
      title: 'Inbox',
      path: '/admin/inbox',
      icon: 'tabler:mail'
    },

    ...(user && user.role === 'admin'
      ? [
          {
            title: 'Users',
            path: '/admin/users',
            icon: 'tabler:users'
          }
        ]
      : []),
    ...(user
      ? [
          {
            title: 'Finance',
            path:
              user.role === 'admin'
                ? '/admin/finance/admin'
                : user.role === 'organizer'
                ? '/admin/finance/organizer'
                : user.role === 'artist'
                ? '/admin/finance/artist'
                : '/admin/finance',
            icon: 'tabler:report-money'
          }
        ]
      : []),

    {
      path: '/admin/account/account',
      title: 'Account',
      icon: 'tabler:user-circle'
    },
    {
      path: '/',
      title: 'Homepage',
      icon: 'tabler:arrow-back'
    }
  ]

  return navItems
}

export default navigation
