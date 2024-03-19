import * as React from 'react'
import Autocomplete from '@mui/material/Autocomplete'
import TextField from '@mui/material/TextField'
import { useAuth } from 'src/hooks/useAuth'

const modalCardContentInputField = {
  textAlign: 'left',
  // padding: '0.5rem 0.75rem',
  width: '100%',
  backgroundColor: '#f2f4f8',
  color: 'black',
  borderRadius: '0.7rem',
  border: 'none',
  outlineColor: '#4428f2',
  ':focus': {
    outlineColor: '#4428f2'
  }
}

export default function LimitTags({ formData, setFormData }) {
  const { user } = useAuth()

  const handleGenreInput = (e, newValue) => {
    const title = [...newValue]
    setFormData({ ...formData, genre: newValue })

    // setFormData({ ...formData, genre: [e.target.value] })
    console.log(formData)
  }

  return (
    <Autocomplete
      multiple
      limitTags={2}
      id='multiple-limit-tags'
      value={formData.genre}
      options={genreOptions}
      // getOptionLabel={option}
      onChange={handleGenreInput}
      renderInput={params => <TextField {...params} label='Genre' placeholder='Genre' />}
      size='small'
      sx={modalCardContentInputField}
      disabled={user.role === 'artist'}
    />
  )
}
const genreOptions = [
  'Troubadour',
  'Cover Band',
  'Musician',
  'Singer',
  'Confrensier',
  'DJ',
  'Stand up Comedian',
  'Show Group',
  'Bar Piano',
  'Magician'
]

// const musicGenres = [
//   { title: 'Pop' },
//   { title: 'Rock' },
//   { title: 'Jazz' },
//   { title: 'Blues' },
//   { title: 'Classical' },
//   { title: 'Country' },
//   { title: 'Hip Hop/Rap' },
//   { title: 'Electronic' },
//   { title: 'R&B/Soul' },
//   { title: 'Reggae' },
//   { title: 'Folk' },
//   { title: 'Punk' },
//   { title: 'Metal' },
//   { title: 'Funk' },
//   { title: 'Alternative' },
//   { title: 'Gospel' },
//   { title: 'Dance' },
//   { title: 'Indie' },
//   { title: 'World' },
//   { title: 'Latin' },
//   { title: 'Ambient' },
//   { title: 'Experimental' },
//   { title: 'Ska' },
//   { title: 'Techno' },
//   { title: 'Dubstep' },
//   { title: 'House' },
//   { title: 'Trance' },
//   { title: 'Drum and Bass' },
//   { title: 'Grunge' },
//   { title: 'Disco' },
//   { title: 'Psychedelic' },
//   { title: 'New Wave' },
//   { title: 'Salsa' },
//   { title: 'Flamenco' },
//   { title: 'Bluegrass' },
//   { title: 'Bollywood' },
//   { title: 'Celtic' },
//   { title: 'K-Pop' },
//   { title: 'J-Pop' },
//   { title: 'Opera' },
//   { title: 'Baroque' },
//   { title: 'Chamber' },
//   { title: 'Choral' },
//   { title: 'Gregorian Chant' },
//   { title: 'Acoustic' },
//   { title: 'Instrumental' },
//   { title: 'Synth-pop' },
//   { title: 'Shoegaze' },
//   { title: 'Krautrock' },
//   { title: 'Afrobeat' }
// ]
