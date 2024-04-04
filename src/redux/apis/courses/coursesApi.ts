import { createApi } from '@reduxjs/toolkit/query/react'

import { PaginationResponse } from 'types/interfaces/Pagination'
import { CourseApi, SingleCourseResponseData } from './coursesApi.type'
import { baseQueryConfig } from '@redux/baseQueryConfig'
import { Course } from 'types/models/Course'
import { QueryParams } from 'types/interfaces/QueryParams'
import { MethodsEnum } from '@config/enums/method.enum'
import { injectPaginationParamsToUrl } from '@utils/helpers/queryParamInjector'
import { ENDPOINTS } from '@config/constants/endpoints'
import { ApiPaginationResponse } from '../type'
import {
  transformFetchCourseResponse,
  transformFetchCoursesResponse,
} from './coursesApi.transform'
import { ItemDetailsResponse } from 'types/interfaces/ItemDetailsResponse'

export const courseApi = createApi({
  reducerPath: 'courseApi',
  baseQuery: baseQueryConfig,
  endpoints: (builder) => ({
    getCourses: builder.query<PaginationResponse<Course>, QueryParams>({
      query: (params) => ({
        url: injectPaginationParamsToUrl(ENDPOINTS.COURSES, params),
        method: MethodsEnum.GET,
      }),
      transformResponse: (response: ApiPaginationResponse<CourseApi>) =>
        transformFetchCoursesResponse(response),
    }),
    getCourseById: builder.query<ItemDetailsResponse<Course>, string>({
      query(id) {
        return {
          url: ENDPOINTS.COURSES + `/${id}`,
          method: MethodsEnum.GET,
        }
      },
      transformResponse: (response: SingleCourseResponseData) =>
        transformFetchCourseResponse(response),
    }),
  }),
})

export const { useGetCoursesQuery, useGetCourseByIdQuery } = courseApi
