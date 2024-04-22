import { UserStatusColorProps } from './UserStatusChip.type'

export const gerUserStatusChipColor = (
  status: 0 | 1 | undefined,
): UserStatusColorProps => {
  let userStatusColor: UserStatusColorProps = {
    label: getUserStatus(status || 0),
    color: 'primary',
  }
  switch (status) {
    case 1:
      userStatusColor = {
        ...userStatusColor,
        color: 'success',
      }
      break

    case 0:
      userStatusColor = {
        ...userStatusColor,
        color: 'warning',
      }
      break
    default:
      userStatusColor = {
        label: getUserStatus(status || 0),
        color: 'primary',
      }
  }
  return userStatusColor
}

export const getUserStatus = (isActive: 0 | 1): string => {
  if (isActive) return 'users.active'
  return 'users.Pending'
}
