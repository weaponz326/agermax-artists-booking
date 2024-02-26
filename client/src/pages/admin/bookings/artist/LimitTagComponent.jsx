import * as React from 'react'
import Autocomplete from '@mui/material/Autocomplete'
import TextField from '@mui/material/TextField'

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

export default function LimitTags({ formData, setFormData, disabled }) {
  const handleGenreInput = (e, newGenreList) => {
    setFormData({ ...formData, genre: newGenreList })
  }

  return (
    <Autocomplete
      multiple
      limitTags={2}
      id='multiple-limit-tags'
      value={formData.genre}
      options={musicGenres}
      // getOptionLabel={option}
      onChange={handleGenreInput}
      renderInput={params => <TextField {...params} label='Genre' placeholder='Genre' disabled={disabled} />}
      size='small'
      sx={modalCardContentInputField}
      disabled={disabled ? true : false}
    />
  )
}
const musicGenres = [
  'Pop',
  'Rock',
  'Jazz',
  'Blues',
  'Classical',
  'Country',
  'Hip Hop/Rap',
  'Electronic',
  'R&B/Soul',
  'Reggae',
  'Folk',
  'Punk',
  'Metal',
  'Funk',
  'Alternative',
  'Gospel',
  'Dance',
  'Indie',
  'World',
  'Latin',
  'Ambient',
  'Experimental',
  'Ska',
  'Techno',
  'Dubstep',
  'House',
  'Trance',
  'Drum and Bass',
  'Grunge',
  'Disco',
  'Psychedelic',
  'New Wave',
  'Salsa',
  'Flamenco',
  'Bluegrass',
  'Bollywood',
  'Celtic',
  'K-Pop',
  'J-Pop',
  'Opera',
  'Baroque',
  'Chamber',
  'Choral',
  'Gregorian Chant',
  'Acoustic',
  'Instrumental',
  'Synth-pop',
  'Shoegaze',
  'Krautrock',
  'Afrobeat'
]
