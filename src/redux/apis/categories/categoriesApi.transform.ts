import noImage from '@assets/images/image_not_available.png'
import { ApiPaginationResponse } from '../type'
import { PaginationResponse } from 'types/interfaces/Pagination'
import { Category } from 'types/models/Category'
import { CategoryApi } from './categoriesApi.type'
import { ConfigEnv } from '@config/configEnv'
import { transformPaginationResponse } from '@redux/apis/transform'
import { GLOBAL_VARIABLES } from '@config/constants/globalVariables'
import { ItemDetailsResponse } from 'types/interfaces/ItemDetailsResponse'
import { FieldValues } from 'react-hook-form'

export const transformFetchCategoryResponse = (
  response: ApiPaginationResponse<CategoryApi>,
): PaginationResponse<Category> => {
  if (response.meta) {
    return {
      ...transformPaginationResponse(response),
      data: transformCategories(response.data),
    }
  }
  return {
    message: response.message,
    data: transformCategories(response.data),
    meta: {
      currentPage: GLOBAL_VARIABLES.PAGINATION.FIRST_PAGE,
      perPage: GLOBAL_VARIABLES.PAGINATION.ROWS_PER_PAGE,
      total: GLOBAL_VARIABLES.PAGINATION.TOTAL_ITEMS,
      count: GLOBAL_VARIABLES.PAGINATION.TOTAL_ITEMS,
    },
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

const transformCategory = (data: CategoryApi): Category => {
  return {
    id: data.id,
    title: data.category,
    nbrOfLessons: data.courses_count,
    url: data.media[0]?.file_name
      ? `${ConfigEnv.MEDIA_BASE_URL}/${data.media[0].file_name}`
      : noImage,
  }
}
export const transformSingleCategory = (
  response: ItemDetailsResponse<CategoryApi>,
): ItemDetailsResponse<Category> => {
  return {
    data: transformCategory(response.data),
    message: response.message,
  }
}
export const encodeCategory = (values: FieldValues): FormData => {
  const formData = new FormData()

  if (values.category) {
    formData.append('category', values.category)
  }
  if (values.media) {
    formData.append('media', values.media)
  }
  return formData
}
