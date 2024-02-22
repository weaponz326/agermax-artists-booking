import React, { useState, useEffect } from 'react';
import { Chip, Stack, TextField, Box } from '@mui/material';
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import CustomTextField from 'src/@core/components/mui/text-field'; // Adjust this path as necessary

const ArrayFieldComponent = ({ initialValues = [], type = 'text', onChange }) => {
  const [items, setItems] = useState(initialValues.map(item =>
    type === 'date' && !(item instanceof Date) ? new Date(item) : item
  ));
  const [inputValue, setInputValue] = useState('');

  useEffect(() => {
    // Adjust here for date type to keep the full ISO string
    if (type === 'date') {
      onChange(items.map(item => item.toISOString()));
    } else {
      onChange(items);
    }
  }, [items, onChange, type]);

  const handleKeyDown = (event) => {
    if (['Enter', ','].includes(event.key) && inputValue.trim() && type === 'text') {
      event.preventDefault();
      const newItem = inputValue.trim();
      if (!items.includes(newItem)) {
        setItems(prevItems => [...prevItems, newItem]);
        setInputValue('');
      }
    }
  };

  const handleChange = (event) => {
    setInputValue(event.target.value);
  };

  const handleDelete = (itemToDelete) => () => {
    setItems(items.filter(item => item !== itemToDelete));
  };

  const handleDateChange = (newDate) => {
    // Adjust here to not split the ISO string, keeping the full date-time format
    if (newDate && !items.find(item => item.toISOString() === newDate.toISOString())) {
      setItems(prevItems => [...prevItems, newDate]);
    }
  };

  if (type === 'text') {
    return (
      <CustomTextField
        fullWidth
        value={inputValue}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
        placeholder="Type and press enter..."
        InputProps={{
          startAdornment: (
            <Box sx={{ display: 'flex' }}>
              {items.map((item, index) => (
                <Chip
                  key={index}
                  label={item}
                  onDelete={handleDelete(item)}
                  size="small"
                />
              ))}
            </Box>
          ),
        }}
        variant="outlined"
      />
    );
  } else if (type === 'date') {
    return (
      <LocalizationProvider dateAdapter={AdapterDateFns}>
        <Stack direction="row" spacing={1} alignItems="center" flexWrap="wrap">
          <DatePicker
            label="Select Date"
            value={null}
            onChange={handleDateChange}
            renderInput={(params) => <TextField {...params} />}
          />
          {items.map((date, index) => (
            <Chip
              key={index}
              label={date.toLocaleDateString()}
              onDelete={handleDelete(date)}
            />
          ))}
        </Stack>
      </LocalizationProvider>
    );
  }

  return null;
};

export default ArrayFieldComponent;
