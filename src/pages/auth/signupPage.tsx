import { StyledPaper, WelcomeContainer } from '@features/auth/auth.style'
import { Stack, Typography } from '@mui/material'
import { useTranslation } from 'react-i18next'
import learnado from '@assets/logo/lernado.png'
import SignUpForm from '@features/auth/signup/SignupForm'
export const signupPage = () => {
  const { t } = useTranslation()
  return (
    <Stack direction={'row'} marginTop={5}>
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

          <Typography variant="h1">{t('auth.signup')}</Typography>
        </Stack>
        <SignUpForm />
      </StyledPaper>
    </Stack>
  )
}

export default signupPage
