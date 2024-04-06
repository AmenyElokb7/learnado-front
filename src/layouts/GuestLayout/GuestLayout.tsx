import FallbackLoader from '@components/fallback/FallbackLoader'
import { TopBar } from '@components/topBar/Topbar'
import { ItemsMain } from '@components/topBar/topBarMenu'
import { Suspense } from 'react'
import { Outlet } from 'react-router-dom'
import Footer from '@components/footer/Footer'

function GuestLayout() {
  return (
    <>
      <TopBar items={ItemsMain} />
      <Suspense fallback={<FallbackLoader />}>
        <Outlet />
      </Suspense>
      <Footer />
    </>
  )
}

export default GuestLayout
