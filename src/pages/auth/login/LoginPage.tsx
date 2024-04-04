import { StyledPaper, WelcomeContainer } from '@features/auth/auth.style'
import { Box, Stack, Typography } from '@mui/material'
import learnado from '@assets/logo/lernado.png'
import LoginForm from '@features/auth/login/LoginForm'
import { useTranslation } from 'react-i18next'
import CustomLink from '@components/customLink/CustomLink'
import { PATHS } from '@config/constants/paths'

function LoginPage() {
  const { t } = useTranslation()
  return (
    <Stack direction={'row'} mt={8}>
      <WelcomeContainer />
      <StyledPaper>
        <Stack direction="column" spacing={2}>
          <Stack
            direction={{ md: 'column', lg: 'row' }}
            justifyContent={'space-between'}
            alignItems={{ md: 'flex-start', lg: 'center' }}
            gap={2}>
            <img src={learnado} alt="logo" width={250} />
          </Stack>

          <Typography variant="h1">{t('auth.login')}</Typography>
        </Stack>
        <LoginForm />

        <Box textAlign="center" marginTop={2}>
          <Typography variant="body2">
            {t('auth.dont_have_account')}
            <CustomLink
              to={PATHS.AUTH.SIGNUP}
              label={t('auth.signup')}
              isActive={false}
            />
          </Typography>
        </Box>
      </StyledPaper>
    </Stack>
  )
}

export default LoginPage
