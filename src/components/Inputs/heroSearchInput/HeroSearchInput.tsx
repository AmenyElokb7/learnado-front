import SearchIcon from '@mui/icons-material/Search'
import { useTranslation } from 'react-i18next'
import {
  SearchInputText,
  SearchWrapper,
  StyledIconButton,
} from './heroSearchInput.style'
import { Stack } from '@mui/material'
import { KeyboardEvent, useState } from 'react'
import { GLOBAL_VARIABLES } from '@config/constants/globalVariables'
import { useAppDispatch } from '@redux/hooks'
import { useNavigate } from 'react-router-dom'
import { setSearchQuery } from '@redux/slices/appSlice'
import { PATHS } from '@config/constants/paths'

const SearchInput = () => {
  const [inputValue, setInputValue] = useState(GLOBAL_VARIABLES.EMPTY_STRING)
  const dispatch = useAppDispatch()
  const navigate = useNavigate()

  const handleSearch = () => {
    dispatch(setSearchQuery(inputValue))
    navigate(PATHS.COURSES.ROOT)
  }
  const handleKeyPress = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleSearch()
    }
  }

  const { t } = useTranslation()
  return (
    <Stack direction="row" alignItems={'center'}>
      <SearchWrapper>
        <StyledIconButton>
          <SearchIcon onClick={handleSearch} />
        </StyledIconButton>
        <SearchInputText
          value={inputValue}
          placeholder={t('home.search_for_courses')}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyPress={handleKeyPress}
        />
      </SearchWrapper>
    </Stack>
  )
}

export default SearchInput
