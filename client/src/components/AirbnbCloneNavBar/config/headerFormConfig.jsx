import DateCalendarPicker from '../MiddleFormItemDropdown/DateCalendarPicker/DateCalendarPicker'
import SearchArtistDropdown from '../MiddleFormItemDropdown/SearchArtistsDropdown/SearchArtistDropdown'
import RangeDatePicker from 'src/components/RangeDatePicker/RangeDatePicker'

export const formItems = {
  stays: {
    destination: {
      isInput: true,
      label: 'Artists',
      placeholder: 'Search Artists',
      dropdownContent: SearchArtistDropdown
    },
    date: [
      {
        label: 'Start Date',
        placeholder: 'Add dates',
        isInput: false,
        dropdownContent: DateCalendarPicker
      },
      {
        label: 'End Date',
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
    destination: {
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
