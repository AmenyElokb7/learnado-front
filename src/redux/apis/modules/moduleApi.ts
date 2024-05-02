import { createApi } from '@reduxjs/toolkit/query/react'

import { baseQueryConfig } from '@redux/baseQueryConfig'
import { MethodsEnum } from '@config/enums/method.enum'
import { ENDPOINTS } from '@config/constants/endpoints'
import { ItemDetailsResponse } from 'types/interfaces/ItemDetailsResponse'
import {
  encodeModule,
  encodeQuiz,
  encodeUpdateModule,
} from './modulesApi.transform'
import { Module } from 'types/models/Module'
import { CreateModuleRequest } from './modulesApi.type'
import { Section } from '@features/courses/addCourse/sectionForm/module/Module.type'
import { Quiz } from 'types/models/Quiz'

export const moduleApi = createApi({
  reducerPath: 'moduleApi',
  baseQuery: baseQueryConfig,
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
} = moduleApi
