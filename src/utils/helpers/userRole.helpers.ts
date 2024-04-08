import { GLOBAL_VARIABLES } from '@config/constants/globalVariables'
import { UserRoleEnum } from '@config/enums/role.enum'

export const getUserRole = (role: UserRoleEnum) => {
  switch (role) {
    case UserRoleEnum.ADMIN:
      return 'auth.admin'
    case UserRoleEnum.FACILITATOR:
      return 'auth.facilitator'
    case UserRoleEnum.USER:
      return 'auth.user'
    case UserRoleEnum.DESIGNER:
      return 'auth.designer'
    default:
      return GLOBAL_VARIABLES.EMPTY_STRING
  }
}
