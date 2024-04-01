import { Search } from '@mui/icons-material'
import { CardRoot } from '../courses.style'
import { InputAdornment, TextField } from '@mui/material'

function SearchSection() {
  return (
    <CardRoot>
      <TextField
        placeholder="search"
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <Search color="primary" />
            </InputAdornment>
          ),
        }}
      />
    </CardRoot>
  )
}

export default SearchSection
