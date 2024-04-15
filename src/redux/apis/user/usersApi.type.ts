import { UserRoleEnum } from '@config/enums/role.enum'

export interface UserApi {
  id: number
  first_name: string
  last_name: string
  email: string
  password: string
  password_confirmation: string
  role: UserRoleEnum
  courses_count?: number
  is_valid?: 0 | 1
  media?: { model_id: number; file_name: string }[]
}
