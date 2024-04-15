import { UserRoleEnum } from '@config/enums/role.enum'
import { MUIDefaultColors } from 'types/interfaces/MUI'

export interface UserRoleChipProps {
  roleId: UserRoleEnum
}

export type UserRoleNameAndColor = {
  label: string
  color: MUIDefaultColors
}
