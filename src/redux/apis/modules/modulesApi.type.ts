import { Section } from '@features/courses/addCourse/sectionForm/module/Module.type'
import { MediaApi } from 'types/models/Media'
import { ApiStep } from '../courses/coursesApi.type'

export interface ModuleApi {
  id: number
  title: string
  course_id: number
  description: string
  duration: number
  media: MediaApi[]
  created_at: string

  sections?: ApiStep[]
}

export interface CreateModuleRequest {
  courseId: string
  sections: Section[]
  files: Record<number, File[]>
}
