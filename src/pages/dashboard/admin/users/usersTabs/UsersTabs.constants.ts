import { PATHS } from '@config/constants/paths'
import { UserTabStep } from './UsersTabs.type'

export const UserTabSteps: UserTabStep[] = [
  {
    label: 'users.all_users',
    path: PATHS.DASHBOARD.ADMIN.USERS.ALL,
    value: 0,
  },
  {
    label: 'users.pending_users',
    path: PATHS.DASHBOARD.ADMIN.USERS.PENDING,
    value: 1,
  },
  {
    label: 'users.accepted_users',
    path: PATHS.DASHBOARD.ADMIN.USERS.ACCEPTED,
    value: 2,
  },
]
