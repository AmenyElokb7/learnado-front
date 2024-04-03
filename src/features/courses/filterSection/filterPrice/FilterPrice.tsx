import { Checkbox, FormControlLabel, Stack, Typography } from '@mui/material'
import { CardRoot } from '../../courses.style'
import { BLUE, GREY } from '@config/colors/colors'
import { useTranslation } from 'react-i18next'
import { FilterPriceProps } from './FilterPrice.type'
import usePagination from 'src/hooks/usePagination'
import { GLOBAL_VARIABLES } from '@config/constants/globalVariables'

function FilterPrice({ onPriceChange }: FilterPriceProps) {
  const { queryParams, handleFilterChange } = usePagination()

  const { t } = useTranslation()
  const isPaid = queryParams.isPaid

  const handleIsPaidChange = (isPaid: string) => {
    const newIsPaid =
      isPaid === queryParams.isPaid ? GLOBAL_VARIABLES.EMPTY_STRING : isPaid
    handleFilterChange('isPaid', newIsPaid)
    onPriceChange(newIsPaid)
  }
  return (
    <CardRoot>
      <Typography variant="h3" color={BLUE.main}>
        {t('course.price')}
      </Typography>
      <Stack spacing={1} color={GREY.main}>
        <FormControlLabel
          control={
            <Checkbox
              checked={isPaid === GLOBAL_VARIABLES.TRUE_STRING}
              onChange={() => handleIsPaidChange(GLOBAL_VARIABLES.TRUE_STRING)}
              name="isPaid"
            />
          }
          label={t('course.paid')}
        />
        <FormControlLabel
          control={
            <Checkbox
              checked={isPaid === GLOBAL_VARIABLES.FALSE_STRING}
              onChange={() => handleIsPaidChange(GLOBAL_VARIABLES.FALSE_STRING)}
              name="isFree"
            />
          }
          label={t('course.free')}
        />
      </Stack>
    </CardRoot>
  )
}

export default FilterPrice
