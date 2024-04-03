import { FormControlLabel, Radio, RadioGroup, Typography } from '@mui/material'
import { CardRoot } from '../../courses.style'
import { BLUE } from '@config/colors/colors'
import { useTranslation } from 'react-i18next'
import { FilterPriceProps } from './FilterPrice.type'

import { PRICE_FILTERS } from './FilterPrice.constants'

function FilterPrice({
  filtersQueryParams,
  handleFiltersChange,
}: FilterPriceProps) {
  const { t } = useTranslation()

  return (
    <CardRoot>
      <Typography variant="h3" color={BLUE.main}>
        {t('course.price')}
      </Typography>

      <RadioGroup>
        {PRICE_FILTERS.map((price) => {
          const isChecked = filtersQueryParams.filters?.some(
            (item) => item.id === Number(price.id),
          )
          return (
            <FormControlLabel
              key={price.id}
              control={
                <Radio
                  checked={isChecked ? true : false}
                  value={price.id}
                  onChange={() =>
                    handleFiltersChange({
                      id: Number(price.id),
                      name: 'price',
                    })
                  }
                  name={price.label}
                />
              }
              label={t(price.label)}
            />
          )
        })}
      </RadioGroup>
    </CardRoot>
  )
}

export default FilterPrice
