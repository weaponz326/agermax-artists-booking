const navigation = () => {
  return [
    {
      title: 'Home',
      path: '/admin/home',
      icon: 'tabler:smart-home',
    },
    {
      title: 'Bookings',
      path: '/admin/bookings',
      icon: 'tabler:address-book',
    },
    {
      title: 'Inbox',
      path: '/admin/inbox',
      icon: 'tabler:mail',
    },
    {
      title: 'Users',
      path: '/admin/users',
      icon: 'tabler:users',
    },
    {
      title: 'Finance',
      path: '/admin/finance',
      icon: 'tabler:report-money',
    },
    {
      path: '/acl',
      action: 'read',
      subject: 'acl-page',
      title: 'Account',
      icon: 'tabler:user-circle',
    }
  ]
}

export default navigation
