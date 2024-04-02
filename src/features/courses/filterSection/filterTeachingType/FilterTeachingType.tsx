import { Checkbox, FormControlLabel, Stack, Typography } from '@mui/material'
import { CardRoot } from '../../courses.style'
import { BLUE, GREY } from '@config/colors/colors'
import { useTranslation } from 'react-i18next'
import {
  TeachingTypeEnum,
  transformTeachingType,
} from '@config/enums/teachingType.enum'
import { FilterTeachingTypeProps } from './FilterTeachingType.type'
import usePagination from 'src/hooks/usePagination'
import { GLOBAL_VARIABLES } from '@config/constants/globalVariables'

function FilterTeachingType({ onTeachingTypeChange }: FilterTeachingTypeProps) {
  const { t } = useTranslation()
  const { queryParams, handleFilterChange } = usePagination()

  const handleTeachingTypeChange = (teachingType: string) => {
    const transformedTeachingType = transformTeachingType(teachingType)

    const currentTeachingType =
      queryParams.teachingType === transformedTeachingType

    const newTeachingType = currentTeachingType
      ? GLOBAL_VARIABLES.EMPTY_STRING
      : transformedTeachingType

    handleFilterChange('teachingType', newTeachingType)
    onTeachingTypeChange(newTeachingType)
  }

  return (
    <CardRoot>
      <Typography variant="h3" color={BLUE.main}>
        {t('course.teaching_type')}
      </Typography>
      <Stack spacing={1} color={GREY.main}>
        <FormControlLabel
          control={
            <Checkbox
              checked={
                queryParams.teachingType ===
                transformTeachingType(TeachingTypeEnum.ON_A_PLACE)
              }
              onChange={() =>
                handleTeachingTypeChange(TeachingTypeEnum.ON_A_PLACE)
              }
              name="onAPlace"
            />
          }
          label={t(`course.${TeachingTypeEnum.ON_A_PLACE}`)}
        />
        <FormControlLabel
          control={
            <Checkbox
              checked={
                queryParams.teachingType ===
                transformTeachingType(TeachingTypeEnum.ONLINE)
              }
              onChange={() => handleTeachingTypeChange(TeachingTypeEnum.ONLINE)}
              name="online"
            />
          }
          label={t(`course.${TeachingTypeEnum.ONLINE}`)}
        />
      </Stack>
    </CardRoot>
  )
}

export default FilterTeachingType
