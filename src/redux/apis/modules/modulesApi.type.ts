import { Section } from '@features/courses/addCourse/sectionForm/module/Module.type'
import { MediaApi } from 'types/models/Media'
import { Quiz } from 'types/models/Quiz'

export interface ModuleApi {
  id: number
  title: string
  course_id: number
  description: string
  duration: number
  media: MediaApi[]
  created_at: string
  quiz: Quiz
}

export interface CreateModuleRequest {
  courseId: string
  sections: Section[]
  files: Record<number, File[]>
}
