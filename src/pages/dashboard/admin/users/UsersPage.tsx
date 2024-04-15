import BodyCard from '@components/cards/bodyCard/BodyCard'
import { PATHS } from '@config/constants/paths'
import { useTranslation } from 'react-i18next'
import { Outlet, useNavigate } from 'react-router-dom'
import UsersTabs from './usersTabs/UsersTabs'

function UsersPage() {
  const { t } = useTranslation()
  const navigate = useNavigate()
  return (
    <BodyCard
      title={t('users.all_users')}
      buttonText={t('users.add_user')}
      onClick={() => navigate(PATHS.DASHBOARD.ADMIN.USERS.ADD_USER)}>
      <UsersTabs />
      <Outlet />
    </BodyCard>
  )
}

export default UsersPage
