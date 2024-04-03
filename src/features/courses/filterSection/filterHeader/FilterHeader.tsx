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

function FilterHeader({ total }: FilterHeaderProps) {
  const { t } = useTranslation()

  const [options, setOptions] = useState('newest')

  const handleChange = (event: SelectChangeEvent) => {
    setOptions(event.target.value)
  }

  return (
    <Stack
      direction={{ lg: 'row', sm: 'column' }}
      justifyContent={'space-between'}
      m={4}>
      <Stack direction={'row'} spacing={2} alignItems={'center'}>
        <Typography variant="h3" color={GREY.main}>
          {t('course.showing_total_courses', { total })}
        </Typography>
      </Stack>
      <Stack direction={'row'} spacing={2} alignItems={'center'}>
        <FormControl sx={{ m: 1, width: 300 }}>
          <Select
            value={options}
            onChange={handleChange}
            input={<OutlinedInput />}>
            {Object.entries(filterOptions).map(([key, value]) => (
              <MenuItem key={key} value={key}>
                {t(value)}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <FilterAltOutlinedIcon fontSize="large" sx={{ color: GREY.main }} />
        <Typography variant="h3" color={GREY.main}>
          {t('pagination.filter')}
        </Typography>
      </Stack>
    </Stack>
  )
}

export default FilterHeader
