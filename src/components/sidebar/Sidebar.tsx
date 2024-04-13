import {
  SidebarTitle,
  StyledSidebarCard,
  StyledSidebarMenu,
} from './Sidebar.style'
import { useTranslation } from 'react-i18next'
import { SidebarItemsProps } from './SidebarItems.type'
import { getUserFromLocalStorage } from '@utils/localStorage/storage'
import { UserRoleEnum } from '@config/enums/role.enum'
import { Logout, Settings } from '@mui/icons-material'
import { PATHS } from '@config/constants/paths'
import CustomSidebarLink from '@components/customLink/customSidebarLink/CustomSidebarLink'

function Sidebar({ sidebarItem }: SidebarItemsProps) {
  const { t } = useTranslation()
  const user = getUserFromLocalStorage()
  return (
    <StyledSidebarCard>
      <SidebarTitle>{t('sidebar.dashboard')}</SidebarTitle>

      {sidebarItem
        .filter((item) =>
          item.accessibleRoles?.includes(user?.role as UserRoleEnum),
        )
        .map((item) => (
          <StyledSidebarMenu key={item.id}>
            <item.icon />
            <CustomSidebarLink
              to={item.path}
              label={t(item.label)}
              isActive={item.path === window.location.pathname}
            />
          </StyledSidebarMenu>
        ))}

      <SidebarTitle>{t('sidebar.account_settings')}</SidebarTitle>
      <StyledSidebarMenu>
        <Settings />
        <CustomSidebarLink
          to={PATHS.DASHBOARD.PROFILE.SETTINGS}
          label={t('sidebar.account_settings')}
          isActive={
            PATHS.DASHBOARD.PROFILE.SETTINGS === window.location.pathname
          }
        />
      </StyledSidebarMenu>
      <StyledSidebarMenu>
        <Logout />
        <CustomSidebarLink
          to={PATHS.AUTH.ROOT}
          label={t('auth.logout')}
          isActive={PATHS.AUTH.ROOT === window.location.pathname}
        />
      </StyledSidebarMenu>
    </StyledSidebarCard>
  )
}

export default Sidebar
