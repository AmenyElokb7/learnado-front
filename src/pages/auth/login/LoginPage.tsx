import { StyledPaper, WelcomeContainer } from '@features/auth/auth.style'
import { Box, Stack, Typography } from '@mui/material'
import learnado from '@assets/logo/lernado.png'
import LoginForm from '@features/auth/login/LoginForm'
import { useTranslation } from 'react-i18next'
import CustomLink from '@components/customLink/CustomLink'
import { PATHS } from '@config/constants/paths'
import CustomAlert from '@components/customAlert/CustomAlert'
import { useLocation } from 'react-router-dom'
import { GLOBAL_VARIABLES } from '@config/constants/globalVariables'
import { useState } from 'react'

function LoginPage() {
  const { t } = useTranslation()
  const location = useLocation()

  const { message, severity } = location.state || {
    message: GLOBAL_VARIABLES.EMPTY_STRING,
    severity: GLOBAL_VARIABLES.EMPTY_STRING,
  }
  const [open, setOpen] = useState(true)

  const handleClose = () => {
    setOpen(false)
  }
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
          {open && (
            <CustomAlert
              message={message}
              severity={severity}
              onClose={handleClose}
            />
          )}

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
