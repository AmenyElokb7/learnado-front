import { ENDPOINTS } from '@config/constants/endpoints'
import { MethodsEnum } from '@config/enums/method.enum'
import { injectPaginationParamsToUrl } from '@utils/helpers/queryParamInjector'
import { PaginationResponse } from 'types/interfaces/Pagination'
import { QueryParams } from 'types/interfaces/QueryParams'
import { ApiPaginationResponse } from '../type'
import { Language } from 'types/models/Language'
import { transformFetchLanguageResponse } from './languagesApi.transform'
import { baseQueryConfig } from '@redux/baseQueryConfig'
import { createApi } from '@reduxjs/toolkit/query/react'

export const languagesApi = createApi({
  reducerPath: 'languagesApi',
  baseQuery: baseQueryConfig,
  tagTypes: ['Languages'],
  endpoints: (builder) => ({
    getLanguages: builder.query<PaginationResponse<Language>, QueryParams>({
      query: (params) => {
        return {
          url: injectPaginationParamsToUrl(ENDPOINTS.LANGUAGES, params),
          method: MethodsEnum.GET,
        }
      },

      transformResponse: (
        response: ApiPaginationResponse<Language>,
      ): PaginationResponse<Language> => {
        return transformFetchLanguageResponse(response)
      },
      providesTags: ['Languages'],
    }),
    deleteLanguage: builder.mutation<void, number>({
      query: (id) => ({
        url: `${ENDPOINTS.DELETE_LANGUAGE}/${id}`,
        method: MethodsEnum.DELETE,
      }),
      invalidatesTags: ['Languages'],
    }),
  }),
})

export const { useGetLanguagesQuery, useDeleteLanguageMutation } = languagesApi
