import { createApi } from '@reduxjs/toolkit/query/react'

import { baseQueryConfig } from '@redux/baseQueryConfig'
import { MethodsEnum } from '@config/enums/method.enum'
import { ENDPOINTS } from '@config/constants/endpoints'
import { ItemDetailsResponse } from 'types/interfaces/ItemDetailsResponse'
import { encodeModule, transformModuleResponse } from './modulesApi.transform'
import { Module } from 'types/models/Module'
import { CreateModuleRequest, ModuleApi } from './modulesApi.type'
import { Section } from '@features/courses/addCourse/sectionForm/module/Module.type'

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
    getModuleMedia: builder.query<ItemDetailsResponse<Section>, number>({
      query: (stepId) => ({
        url: `${ENDPOINTS.STEPS}/${stepId}`,
        method: MethodsEnum.GET,
      }),
      transformResponse: (response: ItemDetailsResponse<ModuleApi>) =>
        transformModuleResponse(response),
      providesTags: ['Modules'],
    }),
    deleteModule: builder.mutation<void, number | undefined>({
      query: (moduleId) => ({
        url: `${ENDPOINTS.DELETE_MODULE}/${moduleId}`,
        method: MethodsEnum.DELETE,
      }),
      invalidatesTags: ['Modules'],
    }),
  }),
})

export const {
  useCreateModuleMutation,
  useGetModuleMediaQuery,
  useDeleteModuleMutation,
} = moduleApi
