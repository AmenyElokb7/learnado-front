import { GLOBAL_VARIABLES } from '@config/constants/globalVariables'
import { UserRoleEnum } from '@config/enums/role.enum'
import { getUserRole } from '@utils/helpers/userRole.helpers'
import { UserRoleNameAndColor } from './UserRoleChip.type'

export const getUserRoleNameAndColor = (
  roleId: UserRoleEnum,
): UserRoleNameAndColor => {
  let userRoleObject: UserRoleNameAndColor = {
    label: getUserRole(roleId),
    color: 'primary',
  }

  switch (roleId) {
    case UserRoleEnum.USER:
      userRoleObject = {
        ...userRoleObject,
        color: 'primary',
      }
      break
    case UserRoleEnum.FACILITATOR:
      userRoleObject = {
        ...userRoleObject,
        color: 'secondary',
      }
      break
    case UserRoleEnum.DESIGNER:
      userRoleObject = {
        ...userRoleObject,
        color: 'warning',
      }
      break
    default:
      userRoleObject = {
        label: GLOBAL_VARIABLES.EMPTY_STRING,
        color: 'primary',
      }
  }
  return userRoleObject
}
