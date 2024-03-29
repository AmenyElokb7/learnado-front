import { MediaApi } from 'types/models/Media'
import { Language } from 'types/models/Language'
import { Category } from 'types/models/Category'
import { UserApi } from '../auth/userApi.type'
import { ModuleApi } from '../modules/moduleApi'

export interface CourseApi {
  id: number
  title: string
  category_id: Category
  description: string
  language_id: Language
  is_paid: 0 | 1
  price: number
  discount: number
  duration: number
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
}
export interface SingleCourseResponseData {
  status: number
  data: CourseApi
  message: string
}
