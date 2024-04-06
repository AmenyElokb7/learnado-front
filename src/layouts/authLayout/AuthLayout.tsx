import { Stack } from '@mui/material'
import { Outlet } from 'react-router-dom'
import { StyledPaper, WelcomeContainer } from './AuthLayout.style'
import { TopBar } from '@components/topBar/Topbar'
import { ItemsMain } from '@components/topBar/topBarMenu'
import { Suspense } from 'react'
import FallbackLoader from '@components/fallback/FallbackLoader'

function AuthLayout() {
  return (
    <>
      <TopBar items={ItemsMain} />
      <Stack direction={'row'} mt={8}>
        <WelcomeContainer />
        <StyledPaper>
          <Suspense fallback={<FallbackLoader />}>
            <Outlet />
          </Suspense>
        </StyledPaper>
      </Stack>
    </>
  )
}

export default AuthLayout
