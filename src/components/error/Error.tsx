import { Stack, Typography } from '@mui/material'
import { useTranslation } from 'react-i18next'
import error from '@assets/logo/something-went-wrong.png'

function Error() {
  const { t } = useTranslation()
  return (
    <Stack alignItems={'center'}>
      <img src={error} alt={t('common.error')} width={400} />
      <Typography variant="h6">{t('errors.something_went_wrong')}</Typography>
    </Stack>
  )
}

export default Error
