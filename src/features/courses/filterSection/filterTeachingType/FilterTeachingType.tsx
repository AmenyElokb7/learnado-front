import {
  FormControlLabel,
  Radio,
  RadioGroup,
  Typography,
} from '@mui/material'
import { CardRoot } from '../../courses.style'
import { BLUE } from '@config/colors/colors'
import { useTranslation } from 'react-i18next'
import { FilterTeachingTypeProps } from './FilterTeachingType.type'
import { TEACHING_TYPE_FILTERS } from './FiltersTeachingType.constants'

function FilterTeachingType({
  filtersQueryParams,
  handleFiltersChange,
}: FilterTeachingTypeProps) {
  const { t } = useTranslation()

  return (
    <CardRoot>
      <Typography variant="h3" color={BLUE.main}>
        {t('course.teaching_type')}
      </Typography>

      <RadioGroup>
        {TEACHING_TYPE_FILTERS.map((teachingType) => {
          const isChecked = filtersQueryParams.filters?.some(
            (item) => item.id === Number(teachingType.id),
          )
          return (
            <FormControlLabel
              key={teachingType.id}
              control={
                <Radio
                  checked={isChecked ? true : false}
                  value={teachingType.id}
                  onChange={() =>
                    handleFiltersChange({
                      id: Number(teachingType.id),
                      name: 'teachingType',
                    })
                  }
                  name={teachingType.label}
                />
              }
              label={t(teachingType.label)}
            />
          )
        })}
      </RadioGroup>
    </CardRoot>
  )
}

export default FilterTeachingType
