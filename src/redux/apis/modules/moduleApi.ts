import { MediaApi } from 'types/models/Media'

export interface ModuleApi {
  id: number
  title: string
  course_id: number
  description: string
  duration: number
  media: MediaApi[]
  created_at: string
}
