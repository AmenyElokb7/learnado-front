import { Checkbox, FormControlLabel, Stack, Typography } from '@mui/material'
import { CardRoot } from '../../courses.style'
import { BLUE, GREY } from '@config/colors/colors'
import { useTranslation } from 'react-i18next'
import { TeachingTypeEnum } from '@config/enums/teachingType.enum'

function FilterTeachingType() {
  const { t } = useTranslation()
  return (
    <CardRoot>
      <Typography variant="h3" color={BLUE.main}>
        {t('course.teaching_type')}
      </Typography>
      <Stack spacing={1} color={GREY.main}>
        <FormControlLabel
          control={<Checkbox />}
          label={t(TeachingTypeEnum.ON_A_PLACE)}
        />
        <FormControlLabel
          control={<Checkbox />}
          label={t(TeachingTypeEnum.ONLINE)}
        />
      </Stack>
    </CardRoot>
  )
}

export default FilterTeachingType
