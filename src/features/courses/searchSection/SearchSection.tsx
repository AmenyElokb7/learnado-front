import { Search } from '@mui/icons-material'
import { InputAdornment, TextField } from '@mui/material'
import { SearchSectionProps } from './SearchSection.type'

function SearchSection({
  searchValue,
  handleSearchChange,
}: SearchSectionProps) {
  return (
    <TextField
      placeholder="search"
      value={searchValue}
      onChange={(e) => handleSearchChange(e.target.value)}
      InputProps={{
        startAdornment: (
          <InputAdornment position="start">
            <Search color="primary" />
          </InputAdornment>
        ),
      }}
    />
  )
}

export default SearchSection
