import { Checkbox, FormControlLabel, Stack, Typography } from '@mui/material'
import { CardRoot } from '../../courses.style'
import { BLUE, GREY } from '@config/colors/colors'
import { useTranslation } from 'react-i18next'
import {
  TeachingTypeEnum,
  TeachingTypeFilterEnum,
} from '@config/enums/teachingType.enum'
import { FilterTeachingTypeProps } from './FilterTeachingType.type'

function FilterTeachingType({ handleFiltersChange }: FilterTeachingTypeProps) {
  const { t } = useTranslation()

  return (
    <CardRoot>
      <Typography variant="h3" color={BLUE.main}>
        {t('course.teaching_type')}
      </Typography>
      <Stack spacing={1} color={GREY.main}>
        <FormControlLabel
          control={
            <Checkbox
              onChange={() =>
                handleFiltersChange({
                  id: TeachingTypeFilterEnum.ON_A_PLACE,
                  name: 'teachingType',
                })
              }
              name="onAPlace"
            />
          }
          label={t(`course.${TeachingTypeEnum.ON_A_PLACE}`)}
        />
        <FormControlLabel
          control={
            <Checkbox
              onChange={() =>
                handleFiltersChange({
                  id: TeachingTypeFilterEnum.ONLINE,
                  name: 'teachingType',
                })
              }
            />
          }
          label={t(`course.${TeachingTypeEnum.ONLINE}`)}
        />
      </Stack>
    </CardRoot>
  )
}

export default FilterTeachingType
