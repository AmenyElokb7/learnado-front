import FallbackLoader from '@components/fallback/FallbackLoader'
import Footer from '@components/footer/Footer'
import Header from '@components/header/Header'
import { TopBar } from '@components/topBar/Topbar'
import { ItemsMain } from '@components/topBar/topBarMenu'
import { Stack } from '@mui/material'
import { Suspense } from 'react'
import { Outlet } from 'react-router-dom'

function DashboardLayout() {
  return (
    <>
      <TopBar items={ItemsMain} />
      <Header />
      <Stack spacing={2} direction={'row'}>
        <Stack direction={'column'} spacing={2}></Stack>
        <Suspense fallback={<FallbackLoader />}>
          <Outlet />
        </Suspense>
      </Stack>
      <Footer />
    </>
  )
}

export default DashboardLayout
