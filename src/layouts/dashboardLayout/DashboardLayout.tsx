import FallbackLoader from '@components/fallback/FallbackLoader'
import Footer from '@components/footer/Footer'
import Header from '@components/header/Header'
import ProfileCard from '@components/cards/profileCard/ProfileCard'
import Sidebar from '@components/sidebar/Sidebar'
import { ItemsSidebar } from '@components/sidebar/SidebarMenu'
import { StackWithBackground } from '@components/stackWithBackground/stackWithBackground.style'
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
      <StackWithBackground>
        <Stack
          spacing={2}
          direction={{ lg: 'row', sm: 'column', md: 'row' }}
          m={{ lg: 10, sm: 5, md: 5 }}>
          <Stack direction="column" spacing={2}>
            <ProfileCard />
            <Sidebar sidebarItem={ItemsSidebar} />
          </Stack>
          <Suspense fallback={<FallbackLoader />}>
            <Outlet />
          </Suspense>
        </Stack>
      </StackWithBackground>
      <Footer />
    </>
  )
}

export default DashboardLayout
