import { Stack } from '@mui/system'
import FallbackLoader from 'components/fallback/FallbackLoader'
import { TopBar } from 'components/topBar/Topbar'
import { ItemsMain } from 'components/topBar/topBarMenu'
import { Suspense } from 'react'
import { Outlet } from 'react-router-dom'

function GuestLayout() {
  return (
    <Stack>
      <TopBar items={ItemsMain} />
      <Suspense fallback={<FallbackLoader />}>
        <Outlet />
      </Suspense>
    </Stack>
  )
}

export default GuestLayout
