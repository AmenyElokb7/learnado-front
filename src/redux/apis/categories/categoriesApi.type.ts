import { MediaApi } from 'types/models/Media'

export interface CategoryApi {
  id: number
  category: string
  courses_count: number

  media: MediaApi[]
}

export interface CategoriesApiResponse {
  status: number
  data: CategoryApi[]
  message: string
}
