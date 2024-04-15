import { UserRoleEnum } from '@config/enums/role.enum'

export interface User {
  id: number
  firstName: string
  lastName: string
  email: string
  role: UserRoleEnum
  coursesCount?: number
  isValid?: 0 | 1
  media?: {
    modelId: number
    fileName: string
  }[]
}
