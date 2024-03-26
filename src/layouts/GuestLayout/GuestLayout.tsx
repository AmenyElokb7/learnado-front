import { TopBar } from 'components/home/topBar/Topbar'
import { ItemsMain } from 'components/home/topBar/topBarMenu'
import { Outlet } from 'react-router-dom'

function GuestLayout() {
  return (
    <div>
      <TopBar Items={ItemsMain} />

      <Outlet />
    </div>
  )
}

export default GuestLayout
