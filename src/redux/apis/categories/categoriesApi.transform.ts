import noImage from '@assets/images/image_not_available.png'
import { ApiPaginationResponse } from '../type'
import { PaginationResponse } from 'types/interfaces/Pagination'
import { Category } from 'types/models/Category'
import { CategoryApi } from './categoriesApi.type'
import { ConfigEnv } from '@config/configEnv'
import { transformPaginationResponse } from '@redux/apis/transform'

export const transformFetchCategoryResponse = (
  response: ApiPaginationResponse<CategoryApi>,
): PaginationResponse<Category> => {
  return {
    ...transformPaginationResponse(response),
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
