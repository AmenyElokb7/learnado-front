import { Media } from './Media'
import { Quiz } from './Quiz'

export interface Module {
  id: number
  title: string
  description: string
  duration: string
  courseId: number
  createdAt: string
  media: Media[]
  quiz?: Quiz[]
}
