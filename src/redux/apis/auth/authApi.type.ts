import { UserRoleEnum } from '@config/enums/role.enum'
import { User } from 'types/models/User'
import { UserApi } from '../user/usersApi.type'
import { MediaApi } from 'types/models/Media'

export interface RegisterBodyApi {
  first_name: string
  last_name: string
  email: string
  password: string
  password_confirmation: string
  role: UserRoleEnum
}

export interface LoginRequest {
  email: string
  password: string
}

export interface LoginResponseApi {
  message: string
  data: {
    access_token: string
    refresh_token: string
    user: UserApi
    media: MediaApi
  }
}
export interface LoginResponse {
  message: string
  data: {
    accessToken: string
    refreshToken: string
    user: User
  }
}
