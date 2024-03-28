export interface Quiz {
  id: number
  stepId: number
  isExam: boolean
  createdAt: string
  questions: Question[]
}

export interface Question {
  id: number
  quizId: number
  question: string
  type: number
  isValid: boolean
  answers: Answer[]
}

export interface Answer {
  id: number
  questionId: number
  answer: string
  isValid: boolean
}
