import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

import { CategoryApi } from './categoriesApi.type'
import { PaginationResponse } from 'types/interfaces/Pagination'
import { PATHS } from '@config/constants/paths'
import { ConfigEnv } from '@config/configEnv'

export const categoriesApi = createApi({
  reducerPath: 'categoriesApi',
  baseQuery: fetchBaseQuery({
    baseUrl: ConfigEnv.API_ENDPOINT,
  }),
  endpoints: (builder) => ({
    getCategories: builder.query<
      PaginationResponse<CategoryApi>,
      {
        search?: string
        filter?: string
        paginator?: { page: number; rowsPerPage: number }
      }
    >({
      query: ({
        search = '',
        filter = '',
        paginator = { page: 1, rowsPerPage: 10 },
      } = {}) => {
        const searchQuery = search ? `&search=${search}` : ''
        const filterQuery = filter ? `&filter=${filter}` : ''
        return {
          url: `${PATHS.CATEGORIES.ROOT}?page=${paginator.page}&rowsPerPage=${paginator.rowsPerPage}${searchQuery}${filterQuery}`,
          method: 'GET',
        }
      },
    }),
  }),
})

export const { useGetCategoriesQuery } = categoriesApi
