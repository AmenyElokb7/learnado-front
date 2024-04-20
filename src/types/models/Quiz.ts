import { QuestionTypeEnum } from '@config/enums/questionType.enum'

export interface Quiz {
  id?: number
  questions: Question[]
}

export interface Question {
  id?: number
  question: string
  type: QuestionTypeEnum
  isValid: 0 | 1
  answers: Answer[]
}

export interface Answer {
  id?: number
  answer: string
  isValid: 0 | 1
}
