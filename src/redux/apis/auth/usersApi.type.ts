import { UserRoleEnum } from '@config/enums/role.enum'
import { MediaApi } from 'types/models/Media'
import { User } from 'types/models/User'

export interface UserApi {
  id: number
  first_name: string
  last_name: string
  email: string
  password: string
  password_confirmation: string
  role: UserRoleEnum
  courses_count?: number

  media: { model_id: number; file_name: string }[]
}
export interface RegisterResponse {
  status?: number
  data: {
    user: User
  }
  message: string
}
export interface RegisterBodyApi {
  first_name: string
  last_name: string
  email: string
  password: string
  password_confirmation: string
  role: UserRoleEnum
  media: MediaApi[]
}
