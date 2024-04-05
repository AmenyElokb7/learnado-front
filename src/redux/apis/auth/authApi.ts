import { User } from 'types/models/User'
import { ENDPOINTS } from '@config/constants/endpoints'
import { baseQueryConfig } from '@redux/baseQueryConfig'
import { MethodsEnum } from '@config/enums/method.enum'
import { createApi } from '@reduxjs/toolkit/query/react'
import { ItemDetailsResponse } from 'types/interfaces/ItemDetailsResponse'
import { RegisterBody } from '@features/auth/signup/SignupForm.type'
import { UserApi } from '../user/usersApi.type'
import { LoginRequest, LoginResponse } from './authApi.type'
import {
  decodeLoginResponse,
  signupEncoder,
  transformRegisterResponse,
} from './authApi.transform'

export const authApi = createApi({
  reducerPath: 'authApi',
  baseQuery: baseQueryConfig,
  endpoints: (builder) => ({
    signup: builder.mutation<ItemDetailsResponse<User>, RegisterBody>({
      query: (user) => ({
        url: ENDPOINTS.REGISTER,
        method: MethodsEnum.POST,
        body: signupEncoder(user),
      }),
      transformResponse: (response: ItemDetailsResponse<UserApi>) =>
        transformRegisterResponse(response),
    }),
    login: builder.mutation<LoginResponse, LoginRequest>({
      query: (LoginRequest) => ({
        url: ENDPOINTS.LOGIN,

        method: MethodsEnum.POST,
        body: LoginRequest,
      }),
      transformResponse: (response: LoginResponse) =>
        decodeLoginResponse(response),
    }),
    logout: builder.mutation<void, void>({
      query: () => ({
        url: ENDPOINTS.LOGOUT,
        method: MethodsEnum.POST,
      }),
    }),
  }),
})
export const { useLoginMutation, useSignupMutation, useLogoutMutation } =
  authApi
