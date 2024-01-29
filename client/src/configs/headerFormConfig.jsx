export const formItems = {
  stays: {
    destination: {
      label: 'Where',
      placeholder: 'Search destinations',
      isInput: true
    },
    date: [
      {
        label: 'Check in',
        placeholder: 'Add dates',
        isInput: false
      },
      {
        label: 'Check out',
        placeholder: 'Add dates',
        isInput: false
      }
    ],
    guests: {
      label: 'Who',
      placeholder: 'Add guests',
      isInput: false,
      isSearch: true
    }
  },
  experiences: {
    destination: {
      label: 'Where',
      isInput: true,
      placeholder: 'Search destinations'
    },
    date: {
      label: 'Date',
      placeholder: 'Add dates'
    },
    guests: {
      label: 'Who',
      placeholder: 'Add guests',
      isInput: false,
      isSearch: true
    }
  }
}
