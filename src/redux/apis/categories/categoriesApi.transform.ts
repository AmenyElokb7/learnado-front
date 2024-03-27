import { ApiPaginationResponse } from '../type'
import { PaginationResponse } from 'types/interfaces/Pagination'
import { Category } from 'types/models/Category'
export const transformFetchCoursesResponse = (
  response: ApiPaginationResponse<Category>,
): PaginationResponse<Category> => {
  return {
    message: response.message,
    meta: {
      currentPage: response.meta.current_page,
      perPage: response.meta.per_page,
      total: response.meta.total,
    },
    data: response.data,
  }
}
