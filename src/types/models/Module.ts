import { Media } from './Media'
import { Question } from './Quiz'

export interface Module {
  id: number
  title: string
  description: string
  duration: string
  courseId: number
  createdAt: string
  media: Media[]
  hasQuiz: 1 | 0
  quiz?: {
    id: number
    questions: Question[]
  }
}
