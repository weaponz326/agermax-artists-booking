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
      ...(user
        ? [
            {
              title: 'Finance',
              // Check the user's role and change the path accordingly
              path: user.role === 'admin' ? '/admin/finance/admin' :
                    user.role === 'organizer' ? '/admin/finance/organizer' :
                    user.role === 'artist' ? '/admin/finance/artist' : '/admin/finance',
              icon: 'tabler:report-money'
            }
          ]
        : []),

    {
      path: '/admin/account',
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
