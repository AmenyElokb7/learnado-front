import { createApi } from '@reduxjs/toolkit/query/react'

import { baseQueryConfig } from '@redux/baseQueryConfig'
import { MethodsEnum } from '@config/enums/method.enum'
import { ENDPOINTS } from '@config/constants/endpoints'
import { ItemDetailsResponse } from 'types/interfaces/ItemDetailsResponse'
import { encodeModule } from './modulesApi.transform'
import { Module } from 'types/models/Module'
import { CreateModuleRequest } from './modulesApi.type'

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
  }),
})

export const { useCreateModuleMutation } = moduleApi
