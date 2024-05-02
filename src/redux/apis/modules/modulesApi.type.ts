import { Section } from '@features/courses/addCourse/sectionForm/module/Module.type'
import { MediaApi } from 'types/models/Media'
import { QuestionApi } from 'types/models/Quiz'

export interface ModuleApi {
  id: number
  title: string
  course_id: number
  description: string
  duration: number
  media: MediaApi[]
  created_at: string
  has_quiz: 0 | 1
  quiz: {
    id: number
    questions: QuestionApi[]
    time_left?: number
  }
}

export interface CreateModuleRequest {
  courseId: string
  sections: Section[]
  files: Record<number, File[]>
}

export interface QuizSubmissionApi {
  score: number
  total_score_possible: number
  needs_review: boolean
  passed: boolean
}

export interface QuizSubmission {
  score: number
  totalScorePossible: number
  needsReview: boolean
  passed: boolean
}

export interface StudentQuiz {
  id: number
  score: number
  totalScorePossible: number
  passed: boolean
  createAt: string

  quiz: {
    id: number
    step: {
      id: number
      title: string
      course: {
        id: number
        title: string
      }
    }
  }
}
export interface StudentQuizApi {
  id: number
  score: number
  total_score_possible: number
  passed: boolean
  created_at: string
  quiz: {
    id: number
    step: {
      id: number
      title: string
      course: {
        id: number
        title: string
      }
    }
  }
}
