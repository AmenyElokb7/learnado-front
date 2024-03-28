import { createApi } from '@reduxjs/toolkit/query/react'

import { CategoryApi, PaginationParams } from './categoriesApi.type'
import { PaginationResponse } from 'types/interfaces/Pagination'
import { PATHS } from '@config/constants/paths'

import { Category } from 'types/models/Category'
import { ApiPaginationResponse } from '../type'
import { transformFetchCategoryResponse } from './categoriesApi.transform'
import {
  QueryParamInjector,
  searchQueryInjector,
} from '@utils/helpers/queryParamInjector'
import { GLOBAL_VARIABLES } from '@config/constants/globalVariables'
import { MethodsEnum } from '@config/enums/method.enum'
import { baseQueryConfig } from '@redux/baseQueryConfig'

export const categoriesApi = createApi({
  reducerPath: 'categoriesApi',
  baseQuery: baseQueryConfig,
  endpoints: (builder) => ({
    getCategories: builder.query<
      PaginationResponse<Category>,
      PaginationParams
    >({
      query: ({
        search = GLOBAL_VARIABLES.EMPTY_STRING,
        filter = GLOBAL_VARIABLES.EMPTY_STRING,
        paginator = {
          page: GLOBAL_VARIABLES.PAGINATION.FIRST_PAGE,
          rowsPerPage: GLOBAL_VARIABLES.PAGINATION.ROWS_PER_PAGE,
        },
      }) => {
        const searchQuery = searchQueryInjector(search, '&search')
        const filterQuery = searchQueryInjector(filter, '&filter')
        return {
          url: QueryParamInjector(
            PATHS.CATEGORIES.ROOT,
            paginator.page,
            paginator.rowsPerPage,
            searchQuery,
            filterQuery,
          ),
          method: MethodsEnum.GET,
        }
      },
      transformResponse: (
        response: ApiPaginationResponse<CategoryApi>,
      ): PaginationResponse<Category> => {
        return transformFetchCategoryResponse(response)
      },
    }),
  }),
})

export const { useGetCategoriesQuery } = categoriesApi
