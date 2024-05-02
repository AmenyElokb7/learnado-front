import { createApi } from '@reduxjs/toolkit/query/react'

import { baseQueryConfigWithRefresh } from '@redux/baseQueryConfig'
import { MethodsEnum } from '@config/enums/method.enum'
import { ENDPOINTS } from '@config/constants/endpoints'
import { ItemDetailsResponse } from 'types/interfaces/ItemDetailsResponse'
import {
  encodeModule,
  encodeQuiz,
  encodeQuizSubmission,
  encodeUpdateModule,
  transformQuizScoreResponse,
  transformQuizSubmissionResponse,
} from './modulesApi.transform'
import { Module } from 'types/models/Module'
import {
  CreateModuleRequest,
  QuizSubmission,
  QuizSubmissionApi,
  StudentQuiz,
  StudentQuizApi,
} from './modulesApi.type'
import { Section } from '@features/courses/addCourse/sectionForm/module/Module.type'
import { Quiz } from 'types/models/Quiz'
import { FieldValues } from 'react-hook-form'
import { PaginationResponse } from 'types/interfaces/Pagination'
import { QueryParams } from 'types/interfaces/QueryParams'
import { injectPaginationParamsToUrl } from '@utils/helpers/queryParamInjector'
import { ApiPaginationResponse } from '../type'

export const moduleApi = createApi({
  reducerPath: 'moduleApi',
  baseQuery: baseQueryConfigWithRefresh,
  tagTypes: ['Modules'],
  endpoints: (builder) => ({
    createModule: builder.mutation<
      ItemDetailsResponse<Module>,
      CreateModuleRequest
    >({
      query: ({ courseId, sections, files }) => ({
        url: `${ENDPOINTS.CREATE_MODULE}/${courseId}`,
        method: MethodsEnum.POST,
        body: encodeModule(sections, files),
      }),
      invalidatesTags: ['Modules'],
    }),

    deleteModule: builder.mutation<void, number | undefined>({
      query: (moduleId) => ({
        url: `${ENDPOINTS.DELETE_MODULE}/${moduleId}`,
        method: MethodsEnum.DELETE,
      }),
      invalidatesTags: ['Modules'],
    }),
    deleteQuiz: builder.mutation<void, number | undefined>({
      query: (quizId) => ({
        url: `${ENDPOINTS.DELETE_QUIZ}/${quizId}`,
        method: MethodsEnum.DELETE,
      }),
    }),
    deleteQuestion: builder.mutation<void, number | undefined>({
      query: (questionId) => ({
        url: `${ENDPOINTS.DELETE_QUESTION}/${questionId}`,
        method: MethodsEnum.DELETE,
      }),
    }),
    deleteAnswer: builder.mutation<void, number | undefined>({
      query: (answerId) => ({
        url: `${ENDPOINTS.DELETE_ANSWER}/${answerId}`,
        method: MethodsEnum.DELETE,
      }),
    }),
    updateQuiz: builder.mutation<
      void,
      { sectionId: number | undefined; data: Quiz }
    >({
      query: ({ sectionId, data }) => ({
        url: `${ENDPOINTS.UPDATE_QUIZ}/${sectionId}`,
        method: MethodsEnum.POST,
        body: encodeQuiz(data),
        invalidatesTags: ['Modules'],
      }),
    }),
    updateModule: builder.mutation<
      void,
      { sectionId: number | undefined; data: Section; files: File[] }
    >({
      query: ({ sectionId, data, files }) => ({
        url: `${ENDPOINTS.UPDATE_MODULE}/${sectionId}`,
        method: MethodsEnum.POST,
        body: encodeUpdateModule(data, files),
        invalidatesTags: ['Modules'],
      }),
    }),

    submitQuiz: builder.mutation<
      ItemDetailsResponse<QuizSubmission>,
      { quizId: number | undefined; data: FieldValues }
    >({
      query: ({ quizId, data }) => ({
        url: `${ENDPOINTS.SUBMIT_QUIZ}/${quizId}`,
        method: MethodsEnum.POST,
        body: encodeQuizSubmission(data),
      }),
      transformResponse: (response: ItemDetailsResponse<QuizSubmissionApi>) =>
        transformQuizSubmissionResponse(response),
      invalidatesTags: ['Modules'],
    }),
    getQuizzesScore: builder.query<
      PaginationResponse<StudentQuiz>,
      QueryParams
    >({
      query: (params) => ({
        url: injectPaginationParamsToUrl(ENDPOINTS.INDEX_QUIZZES_SCORE, params),
        method: MethodsEnum.GET,
      }),
      transformResponse: (response: ApiPaginationResponse<StudentQuizApi>) =>
        transformQuizScoreResponse(response),
    }),
  }),
})

export const {
  useCreateModuleMutation,
  useDeleteModuleMutation,
  useDeleteQuizMutation,
  useDeleteQuestionMutation,
  useDeleteAnswerMutation,
  useUpdateQuizMutation,
  useUpdateModuleMutation,
  useSubmitQuizMutation,
  useGetQuizzesScoreQuery,
} = moduleApi
