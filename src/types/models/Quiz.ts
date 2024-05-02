import { QuestionTypeEnum } from '@config/enums/questionType.enum'

export interface Quiz {
  id?: number
  questions: Question[]
  timeLeft?: number
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

export interface QuizApi {
  id?: number
  questions: QuestionApi[]
  time_left?: number
}

export interface QuestionApi {
  id?: number
  question: string
  type: QuestionTypeEnum
  is_valid: 0 | 1
  answers: AnswerApi[]
}

export interface AnswerApi {
  id?: number
  answer: string
  is_valid: 0 | 1
}
