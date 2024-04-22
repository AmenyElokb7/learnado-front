import { Search } from '@mui/icons-material'
import { InputAdornment, TextField } from '@mui/material'
import { SearchSectionProps } from './SearchSection.type'
import { useTranslation } from 'react-i18next'

function SearchSection({
  searchValue,
  handleSearchChange,
}: SearchSectionProps) {
  const { t } = useTranslation()
  return (
    <TextField
      placeholder={t('common.search_placeholder')}
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
