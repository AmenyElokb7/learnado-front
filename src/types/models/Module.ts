import { QuestionTypeEnum } from '@config/enums/questionType.enum'
import { Media } from './Media'

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
    title: string
    type: QuestionTypeEnum
    isValid?: 0 | 1
    answers: {
      title: string
      isValid: 0 | 1
    }[]
  }[]
}
