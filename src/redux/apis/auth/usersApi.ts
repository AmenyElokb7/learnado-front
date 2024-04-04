import { User } from 'types/models/User'
import { ENDPOINTS } from '@config/constants/endpoints'
import { baseQueryConfig } from '@redux/baseQueryConfig'
import { injectPaginationParamsToUrl } from '@utils/helpers/queryParamInjector'
import { PaginationResponse } from 'types/interfaces/Pagination'
import { QueryParams } from 'types/interfaces/QueryParams'
import { ApiPaginationResponse } from '../type'
import { MethodsEnum } from '@config/enums/method.enum'
import { RegisterResponse, UserApi } from './usersApi.type'
import {
  signupEncoder,
  transformFetchUsersResponse,
} from './usersApi.transform'
import { createApi } from '@reduxjs/toolkit/query/react'
import { RegisterBody } from '@features/auth/signup/SignupForm.type'
import { decodeRegisterResponse } from './decoders'

export const userApi = createApi({
  reducerPath: 'userApi',
  baseQuery: baseQueryConfig,
  endpoints: (builder) => ({
    getFacilitators: builder.query<PaginationResponse<User>, QueryParams>({
      query: (params) => ({
        url: injectPaginationParamsToUrl(ENDPOINTS.FACILITATORS, params),
        method: MethodsEnum.GET,
      }),
      transformResponse: (response: ApiPaginationResponse<UserApi>) =>
        transformFetchUsersResponse(response),
    }),
    signup: builder.mutation<RegisterResponse, RegisterBody>({
      query: (user) => ({
        url: ENDPOINTS.REGISTER,
        method: MethodsEnum.POST,
        body: signupEncoder(user),
      }),
      transformResponse: (response: RegisterResponse) =>
        decodeRegisterResponse(response),
    }),
  }),
})
export const { useGetFacilitatorsQuery, useSignupMutation } = userApi
