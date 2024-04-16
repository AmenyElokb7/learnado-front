import { UserRoleEnum } from '@config/enums/role.enum'
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
  is_valid?: 0 | 1
  media?: { model_id: number; file_name: string }[]
}
export interface SingleUserResponseData {
  message: string
  data: UserApi
}

export interface APIFacilitatorsResponse {
  message: string
  data: UserApi[]
}

export interface FacilitatorsResponse {
  facilitators: User[]
  message: string
}
