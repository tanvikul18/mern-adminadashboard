import React from 'react';
import { TextField, InputAdornment, IconButton, Toolbar } from '@mui/material';
import { Search } from '@mui/icons-material';

export default function DataGridCustomToolbar({ searchInput, setSearchInput, setSearch }) {
  return (
    <Toolbar sx={{ justifyContent: 'space-between' }}>
      <TextField
        label="Search..."
        variant="outlined"
        size="small"
        value={searchInput}
        onChange={(e) => setSearchInput(e.target.value)}
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <IconButton
                onClick={() => {
                  setSearch(searchInput);
                  setSearchInput('');
                }}
              >
                <Search />
              </IconButton>
            </InputAdornment>
          ),
        }}
      />
    </Toolbar>
  );
}
