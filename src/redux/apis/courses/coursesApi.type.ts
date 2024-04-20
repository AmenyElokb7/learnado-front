import { MediaApi } from 'types/models/Media'
import { Language } from 'types/models/Language'
import { UserApi } from '../user/usersApi.type'
import { ModuleApi } from '../modules/modulesApi.type'

export interface CourseApi {
  id: number
  title: string
  category_id: number
  description: string
  language_id: number
  language: Language
  is_paid: 0 | 1
  price: number
  discount: number
  duration: string
  is_public: 0 | 1
  is_sequential: 0 | 1
  teaching_type: number
  start_time?: string
  end_time?: string
  latitude?: number | null
  longitude?: number | null
  created_at: string
  facilitator: UserApi
  media: MediaApi[]
  steps: ModuleApi[]
  lessons_count: number
  subscribed_users_count: number
}
export interface SingleCourseResponseData {
  data: CourseApi
  message: string
}

export interface CreateCourseResponse {
  message: string
  data: CourseApi
}

export interface GetCourseForDesignerResponse {
  message: string
  data: {}
}

export interface CourseForDesignerApi {
  id: number
  title: string
  description: string
  category_id: number
  language_id: number
  is_paid: 0 | 1
  price: string
  discount: string
  facilitator_id: number

  is_public: 0 | 1
  subscribers: number[]
  sequential: 0 | 1
  teaching_type: number
  link: string
  start_time: string
  end_time: string
  latitude: number
  longitude: number
  created_at: string
  media: MediaApi[]
  steps: ApiStep[]
}

export interface ApiStep {
  id: number
  title: string
  description: string
  duration: string
  media: MediaApi[]
  quiz: {
    id: number
    questions: ApiQuestion[]
  }
}

export interface ApiQuestion {
  id: number
  question: string
  type: string
  is_valid: 0 | 1
  answers: ApiAnswer[]
}

export interface ApiAnswer {
  id: number
  answer: string
  is_valid: 0 | 1
}
