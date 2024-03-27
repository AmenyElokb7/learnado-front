import SearchIcon from '@mui/icons-material/Search'
import { useTranslation } from 'react-i18next'
import {
  SearchInputText,
  SearchWrapper,
  StyledIconButton,
} from './heroSearchInput.style'
import { Stack } from '@mui/material'

const SearchInput = () => {
  const { t } = useTranslation()
  return (
    <Stack direction="row" alignItems={'center'}>
      <SearchWrapper>
        <StyledIconButton>
          <SearchIcon />
        </StyledIconButton>
        <SearchInputText placeholder={t('home.search') + '...'} />
      </SearchWrapper>
    </Stack>
  )
}

export default SearchInput
