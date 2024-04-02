import { Checkbox, FormControlLabel, Stack, Typography } from '@mui/material'
import { CardRoot } from '../../courses.style'
import { BLUE, GREY } from '@config/colors/colors'
import { useTranslation } from 'react-i18next'
import { FilterPriceProps } from './FilterPrice.type'
import { FilterPriceEnum } from '@config/enums/filterPrice.enum'

function FilterPrice({ handleFiltersChange }: FilterPriceProps) {
  const { t } = useTranslation()

  return (
    <CardRoot>
      <Typography variant="h3" color={BLUE.main}>
        {t('course.price')}
      </Typography>
      <Stack spacing={1} color={GREY.main}>
        <FormControlLabel
          control={
            <Checkbox
              onChange={() =>
                handleFiltersChange({
                  id: FilterPriceEnum.isPaid,
                  name: 'isPaid',
                })
              }
              name="isPaid"
            />
          }
          label={t('course.paid')}
        />
        <FormControlLabel
          control={
            <Checkbox
              onChange={() =>
                handleFiltersChange({
                  id: FilterPriceEnum.isFree,
                  name: 'isPaid',
                })
              }
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
