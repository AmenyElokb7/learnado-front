import { createApi } from '@reduxjs/toolkit/query/react'

import { PaginationResponse } from 'types/interfaces/Pagination'
import {
  CourseApi,
  CreateCourseResponse,
  SingleCourseResponseData,
} from './coursesApi.type'
import { baseQueryConfig } from '@redux/baseQueryConfig'
import { Course } from 'types/models/Course'
import { QueryParams } from 'types/interfaces/QueryParams'
import { MethodsEnum } from '@config/enums/method.enum'
import { injectPaginationParamsToUrl } from '@utils/helpers/queryParamInjector'
import { ENDPOINTS } from '@config/constants/endpoints'
import { ApiPaginationResponse } from '../type'
import {
  encodeCourse,
  transformFetchCourseResponse,
  transformFetchCoursesResponse,
} from './coursesApi.transform'
import { ItemDetailsResponse } from 'types/interfaces/ItemDetailsResponse'
import { FieldValues } from 'react-hook-form'

export const courseApi = createApi({
  reducerPath: 'courseApi',
  baseQuery: baseQueryConfig,
  tagTypes: ['Courses'],
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
    getDesignerCourses: builder.query<PaginationResponse<Course>, QueryParams>({
      query: (params) => ({
        url: injectPaginationParamsToUrl(ENDPOINTS.DESIGNER_COURSES, params),
        method: MethodsEnum.GET,
      }),
      transformResponse: (response: ApiPaginationResponse<CourseApi>) =>
        transformFetchCoursesResponse(response),
      providesTags: ['Courses'],
    }),
    deleteCourse: builder.mutation<void, number>({
      query: (id) => ({
        url: ENDPOINTS.DELETE_COURSE + `/${id}`,
        method: MethodsEnum.DELETE,
      }),
      invalidatesTags: ['Courses'],
    }),
    createCourse: builder.mutation<CreateCourseResponse, FieldValues>({
      query: (course) => ({
        url: ENDPOINTS.CREATE_COURSE,
        method: MethodsEnum.POST,
        body: encodeCourse(course),
      }),
      invalidatesTags: ['Courses'],
    }),
  }),
})

export const {
  useGetCoursesQuery,
  useGetCourseByIdQuery,
  useGetDesignerCoursesQuery,
  useDeleteCourseMutation,
  useCreateCourseMutation,
} = courseApi
