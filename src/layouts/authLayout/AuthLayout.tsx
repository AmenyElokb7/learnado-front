import { Box, Stack } from '@mui/material'
import { Outlet } from 'react-router-dom'
import { StyledPaper, WelcomeContainer } from './AuthLayout.style'
import { TopBar } from '@components/topBar/Topbar'
import { ItemsAuth, ItemsMain } from '@components/topBar/topBarMenu'
import { Suspense } from 'react'
import FallbackLoader from '@components/fallback/FallbackLoader'
import CustomLink from '@components/customLink/CustomLink'
import { useTranslation } from 'react-i18next'
import { PATHS } from '@config/constants/paths'

function AuthLayout() {
  const { t } = useTranslation()
  return (
    <>
      <TopBar items={ItemsMain} authItems={ItemsAuth} />
      <Stack direction={'row'} mt={8}>
        <WelcomeContainer />
        <StyledPaper>
          <Suspense fallback={<FallbackLoader />}>
            <Outlet />
          </Suspense>

          <Box textAlign="center" marginTop={2}>
            <CustomLink
              to={`/${PATHS.AUTH.ROOT}/${PATHS.AUTH.FORGET_PASSWORD}`}
              label={t('auth.forget_password')}
              isActive={false}
            />
          </Box>
        </StyledPaper>
      </Stack>
    </>
  )
}

export default AuthLayout
