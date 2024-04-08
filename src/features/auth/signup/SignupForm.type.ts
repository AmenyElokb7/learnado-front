import { UserRoleEnum } from '@config/enums/role.enum'
import { MediaApi } from 'types/models/Media'

export type RegisterBody = {
  firstName: string
  lastName: string
  email: string
  password: string
  confirmPassword: string
  role: UserRoleEnum
  media: MediaApi[]
}
export type SignupUserType = {
  id: number
  label: string
}
