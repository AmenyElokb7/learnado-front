import { QuestionTypeEnum } from '@config/enums/questionType.enum'

export interface Quiz {
  questions: Question[]
}

export interface Question {
  question: string
  type: QuestionTypeEnum
  isValid: 0 | 1
  answers: Answer[]
}

export interface Answer {
  answer: string
  isValid: 0 | 1
}
