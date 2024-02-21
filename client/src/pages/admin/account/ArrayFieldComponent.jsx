// ArrayFieldComponent.jsx
import React, { useState, useEffect } from 'react';
import { Chip, Input, Paper, TextField } from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers/DatePicker'; // Adjust import based on your setup
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'; // Needed for DatePicker
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns'; // Choose the correct adapter for your date library

const ArrayFieldComponent = ({ initialValues = [], type = 'text' }) => {
  const [items, setItems] = useState(initialValues);
  const [inputValue, setInputValue] = useState('');

  useEffect(() => {
    if (initialValues.length) {
      setItems(initialValues);
    }
  }, [initialValues]);

  // For text type fields (genres, eventsHosted)
  const handleKeyDown = (event) => {
    if (['Enter', ','].includes(event.key) && inputValue && type === 'text') {
      event.preventDefault();
      const newItem = inputValue.trim();
      if (!items.includes(newItem)) {
        setItems([...items, newItem]);
        setInputValue('');
      }
    }
  };

  const handleChange = (event) => {
    setInputValue(event.target.value);
  };

  const handleDelete = (itemToDelete) => () => {
    setItems(items.filter((item) => item !== itemToDelete));
  };

  // For date type fields (availableDates)
  const handleDateChange = (newValue) => {
    setItems(newValue);
  };

  if (type === 'text') {
    return (
      <Paper sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5, alignItems: 'center', padding: '0.5rem' }}>
        {items.map((item, index) => (
          <Chip key={index} label={item} onDelete={handleDelete(item)} />
        ))}
        <Input
          value={inputValue}
          onChange={handleChange}
          onKeyDown={handleKeyDown}
          placeholder="Type and press enter..."
          sx={{ flex: 1 }}
        />
      </Paper>
    );
  } else if (type === 'date') {
    return (
      <LocalizationProvider dateAdapter={AdapterDateFns}>
        <DatePicker
          multiple
          value={items}
          onChange={handleDateChange}
          renderInput={(params) => <TextField {...params} />}
        />
      </LocalizationProvider>
    );
  }

  return null;
};

export default ArrayFieldComponent;

// Use these components inside your form like so:
// <GenresInput initialValues={additionalFormData.genre} />
// <AvailableDatesInput initialValues={additionalFormData.availableDates} />
