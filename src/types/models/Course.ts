import { Media } from './Media'

export interface Course {
  id: number
  title: string
  category: string
  description: string
  language: string
  isPaid: boolean
  price: number
  discount: number
  isPublic: boolean
  isSequential: boolean
  teachingType: number
  link?: string
  startTime?: string
  endTime?: string
  lat?: string
  long?: string
  createdAt: string
  facilitatorId: number
  media: Media[]
}
