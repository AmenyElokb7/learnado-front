import noImage from '@assets/images/image_not_available.png'
import { ApiPaginationResponse } from '../type'
import { PaginationResponse } from 'types/interfaces/Pagination'
import { Category } from 'types/models/Category'
import { CategoryApi } from './categoriesApi.type'
import { ConfigEnv } from '@config/configEnv'

export const transformFetchCategoryResponse = (
  response: ApiPaginationResponse<CategoryApi>,
): PaginationResponse<Category> => {
  return {
    message: response.message,
    meta: {
      currentPage: response.meta.current_page,
      perPage: response.meta.per_page,
      total: response.meta.total,
    },
    data: transformCategories(response.data),
  }
}

const transformCategories = (data: CategoryApi[]): Category[] => {
  return data.map((category) => ({
    id: category.id,
    title: category.category,
    nbrOfLessons: category.courses_count,
    url: category.media[0]?.file_name
      ? `${ConfigEnv.MEDIA_BASE_URL}/${category.media[0].file_name}`
      : noImage,
  }))
}
