export interface User {
  id: number
  firstName: string
  lastName: string
  email: string
  role: number
  coursesCount?: number
  media?: {
    modelId: number
    fileName: string
  }[]
}
