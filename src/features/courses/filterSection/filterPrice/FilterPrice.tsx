import { Checkbox, FormControlLabel, Stack, Typography } from '@mui/material'
import { CardRoot } from '../../courses.style'
import { BLUE, GREY } from '@config/colors/colors'
import { useTranslation } from 'react-i18next'

function FilterPrice() {
  const { t } = useTranslation()
  return (
    <CardRoot>
      <Typography variant="h3" color={BLUE.main}>
        {t('course.price')}
      </Typography>
      <Stack spacing={1} color={GREY.main}>
        <FormControlLabel control={<Checkbox />} label={t('course.free')} />
        <FormControlLabel control={<Checkbox />} label={t('course.paid')} />
      </Stack>
    </CardRoot>
  )
}

export default FilterPrice
