import DateCalendarPicker from '../MiddleFormItemDropdown/DateCalendarPicker/DateCalendarPicker'
import SearchArtistDropdown from '../MiddleFormItemDropdown/SearchArtistsDropdown/SearchArtistDropdown'

export const formItems = {
  stays: {
    desitnation: {
      isInput: true,
      label: 'Artists',
      placeholder: 'Search artists',
      dropdownContent: SearchArtistDropdown
    },
    date: [
      {
        label: 'Check in',
        placeholder: 'Add dates',
        isInput: false,
        dropdownContent: DateCalendarPicker
      },
      {
        label: 'Check out',
        placeholder: 'Add dates',
        isInput: false,
        dropdownContent: DateCalendarPicker
      }
    ],
    guests: {
      label: 'Who',
      placeholder: 'Add guests',
      isInput: false,
      isSearch: true,
      dropdownContent: SearchArtistDropdown
    }
  },
  experiences: {
    desitnation: {
      label: 'Where',
      isInput: true,
      placeholder: 'Search destinations',
      dropdownContent: SearchArtistDropdown
    },
    date: {
      label: 'Date',
      placeholder: 'Add dates',
      dropdownContent: DateCalendarPicker
    },
    guests: {
      label: 'Who',
      isInput: false,
      isSearch: true,
      placeholder: 'Add guests',
      dropdownContent: SearchArtistDropdown
    }
  }
}
