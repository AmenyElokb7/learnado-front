import {
  FormControl,
  MenuItem,
  OutlinedInput,
  Select,
  SelectChangeEvent,
  Stack,
  Typography,
} from '@mui/material'
import FilterAltOutlinedIcon from '@mui/icons-material/FilterAltOutlined'

import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { GREY } from '@config/colors/colors'
import { filterOptions } from './FilterHeader.constants'
import { FilterHeaderProps } from './FilterHeader.type'
import { GLOBAL_VARIABLES } from '@config/constants/globalVariables'

function FilterHeader({
  total,
  handleOrderChange,
  hasFilter,
}: FilterHeaderProps) {
  const { t } = useTranslation()

  const [selectedOption, setSelectedOption] = useState<number>(1)

  const handleChange = (event: SelectChangeEvent) => {
    const selectedId = Number(event.target.value)
    setSelectedOption(selectedId)

    const selectedOptionDetails = filterOptions.find(
      (option) => option.id === selectedId,
    )
    if (selectedOptionDetails) {
      handleOrderChange?.(
        selectedOptionDetails.direction,
        selectedOptionDetails.orderBy,
      )
    }
  }

  return (
    <Stack
      direction={{ lg: 'row', sm: 'column' }}
      justifyContent={'space-between'}
      m={4}>
      <Stack direction={'row'} spacing={2} alignItems={'center'}>
        <Typography variant="h3" color={GREY.main}>
          {t('pagination.showing_total', { total })}
        </Typography>
      </Stack>
      {hasFilter === GLOBAL_VARIABLES.TRUE_STRING && (
        <Stack direction={'row'} spacing={2} alignItems={'center'}>
          <FormControl sx={{ m: 1, width: 300 }}>
            <Select
              value={selectedOption.toString()}
              onChange={handleChange}
              input={<OutlinedInput />}>
              {filterOptions.map((option) => (
                <MenuItem key={option.id} value={option.id}>
                  {t(option.label)}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <FilterAltOutlinedIcon fontSize="large" sx={{ color: GREY.main }} />
          <Typography variant="h3" color={GREY.main}>
            {t('pagination.filter')}
          </Typography>
        </Stack>
      )}
    </Stack>
  )
}

export default FilterHeader
