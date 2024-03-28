import { createApi } from '@reduxjs/toolkit/query/react'

import { CategoryApi } from './categoriesApi.type'
import { PaginationResponse } from '@types/interfaces/Pagination'
import { PATHS } from '@config/constants/paths'

import { ApiPaginationResponse } from '../type'
import { transformFetchCategoryResponse } from './categoriesApi.transform'
import { injectPaginationParamsToUrl } from '@utils/helpers/queryParamInjector'
import { MethodsEnum } from '@config/enums/method.enum'
import { baseQueryConfig } from '@redux/baseQueryConfig'
import { QueryParams } from 'types/interfaces/QueryParams'
import { Category } from 'types/models/Category'
export const categoriesApi = createApi({
  reducerPath: 'categoriesApi',
  baseQuery: baseQueryConfig,
  endpoints: (builder) => ({
    getCategories: builder.query<PaginationResponse<Category>, QueryParams>({
      query: (params) => {
        return {
          url: injectPaginationParamsToUrl(PATHS.CATEGORIES.ROOT, params),
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
