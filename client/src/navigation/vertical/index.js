import { useAuth } from 'src/hooks/useAuth'

const navigation = () => {
  const { user } = useAuth()

  const navItems = [
    {
      title: 'Home',
      path: '/admin/home',
      icon: 'tabler:smart-home'
    },
    {
      title: 'Bookings',
      path: '/admin/bookings',
      icon: 'tabler:address-book'
    },
    {
      title: 'Inbox',
      path: '/admin/inbox',
      icon: 'tabler:mail'
    },
    // Conditionally include the 'Users' link if the user is an admin
    ...(user && user.role === 'admin'
      ? [
          {
            title: 'Users',
            path: '/admin/users',
            icon: 'tabler:users'
          }
        ]
      : []),
    {
      title: 'Finance',
      path: '/admin/finance',
      icon: 'tabler:report-money'
    },
    {
      path: '/admin/account',
      title: 'Account',
      icon: 'tabler:user-circle'
    }
  ]

  return navItems
}

export default navigation
