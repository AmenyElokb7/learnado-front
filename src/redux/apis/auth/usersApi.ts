import { User } from 'types/models/User'
import { ENDPOINTS } from '@config/constants/endpoints'
import { baseQueryConfig } from '@redux/baseQueryConfig'
import { injectPaginationParamsToUrl } from '@utils/helpers/queryParamInjector'
import { PaginationResponse } from 'types/interfaces/Pagination'
import { QueryParams } from 'types/interfaces/QueryParams'
import { ApiPaginationResponse } from '../type'
import { MethodsEnum } from '@config/enums/method.enum'
import { LoginRequest, UserApi } from './usersApi.type'
import {
  signupEncoder,
  transformFetchUsersResponse,
  transformRegisterResponse,
} from './usersApi.transform'
import { createApi } from '@reduxjs/toolkit/query/react'
import { RegisterBody } from '@features/auth/signup/SignupForm.type'
import { ItemDetailsResponse } from 'types/interfaces/ItemDetailsResponse'
import i18n from 'i18n'

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
    signup: builder.mutation<ItemDetailsResponse<User>, RegisterBody>({
      query: (user) => ({
        url: ENDPOINTS.REGISTER,
        AcceptLanguage: i18n.language,
        method: MethodsEnum.POST,
        body: signupEncoder(user),
      }),
      transformResponse: (response: ItemDetailsResponse<UserApi>) =>
        transformRegisterResponse(response),
    }),
    login: builder.mutation<ItemDetailsResponse<User>, LoginRequest>({
      query: (LoginRequest) => ({
        url: ENDPOINTS.LOGIN,
        headers: {
          Accept: 'application/json',
          AcceptLanguage: i18n.language,
        },
        method: MethodsEnum.POST,
        body: LoginRequest,
      }),
      transformResponse: (response: ItemDetailsResponse<UserApi>) =>
        transformRegisterResponse(response),
    }),
  }),
})
export const { useGetFacilitatorsQuery, useSignupMutation, useLoginMutation } =
  userApi
