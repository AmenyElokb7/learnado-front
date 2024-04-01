import { Media } from './Media'
import { Quiz } from './Quiz'

export interface Module {
  id: number
  title: string
  description: string
  duration: number
  courseId: number
  createdAt: string
  media: Media[]
  // TODO: Quiz is not optional
  quiz?: Quiz[]
}
