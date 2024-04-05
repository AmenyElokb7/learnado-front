import { Stack, Typography } from '@mui/material'
import learnado from '@assets/logo/lernado.png'
import { useTranslation } from 'react-i18next'

function AuthHeader({ title }: { title: string }) {
  const { t } = useTranslation()
  return (
    <Stack direction="column" spacing={2}>
      <Stack
        direction={{ md: 'column', lg: 'row' }}
        justifyContent={'space-between'}
        alignItems={{ md: 'flex-start', lg: 'center' }}
        gap={2}>
        <img src={learnado} alt="logo" width={250} />
      </Stack>

      <Typography variant="h1">{t(title)}</Typography>
    </Stack>
  )
}

export default AuthHeader
