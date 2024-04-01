import { Search } from '@mui/icons-material'
import { CardRoot } from '../courses.style'
import { InputAdornment, TextField } from '@mui/material'
import { SearchSectionProps } from './SearchSection.type'

function SearchSection({ seachValue, handleSearchChange }: SearchSectionProps) {
  return (
    <CardRoot>
      <TextField
        placeholder="search"
        value={seachValue}
        onChange={(e) => handleSearchChange(e.target.value)}
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
