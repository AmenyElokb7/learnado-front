import { User } from 'types/models/User'
import { ENDPOINTS } from '@config/constants/endpoints'
import { baseQueryConfig } from '@redux/baseQueryConfig'
import { MethodsEnum } from '@config/enums/method.enum'
import { createApi } from '@reduxjs/toolkit/query/react'
import { ItemDetailsResponse } from 'types/interfaces/ItemDetailsResponse'
import { RegisterBody } from '@features/auth/signup/SignupForm.type'
import { UserApi } from '../user/usersApi.type'
import { LoginRequest, LoginResponse, LoginResponseApi } from './authApi.type'
import {
  decodeLoginResponse,
  setPasswordEncoder,
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
      transformResponse: (response: LoginResponseApi): LoginResponse =>
        decodeLoginResponse(response),
    }),
    logout: builder.mutation<void, void>({
      query: () => ({
        url: ENDPOINTS.LOGOUT,
        method: MethodsEnum.POST,
      }),
    }),
    setPassword: builder.mutation<
      void,
      {
        token: string
        data: { password: string; passwordConfirmation: string }
      }
    >({
      query: ({ token, data }) => ({
        url: `${ENDPOINTS.SET_PASSWORD}${token}`,
        method: MethodsEnum.POST,
        body: setPasswordEncoder(data),
      }),
    }),
    sendResetPasswordEmail: builder.mutation<void, { email: string }>({
      query: ({ email }) => ({
        url: ENDPOINTS.SEND_RESET_PASSWORD_EMAIL,
        method: MethodsEnum.POST,
        body: { email },
      }),
    }),
    
  }),
})
export const {
  useLoginMutation,
  useSignupMutation,
  useLogoutMutation,
  useSetPasswordMutation,
  useSendResetPasswordEmailMutation,
} = authApi
