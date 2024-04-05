import { UserRoleEnum } from '@config/enums/role.enum'

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

export interface LoginResponse {
  message: string
  data: {
    accessToken: string
    refreshToken: string
  }
}
