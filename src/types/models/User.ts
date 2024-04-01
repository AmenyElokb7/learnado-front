export interface User {
  id: number
  firstName: string
  lastName: string
  email: string
  role: number
  media: {
    modelId: number
    fileName: string
  }[]
}
