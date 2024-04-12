import { User } from 'types/models/User'
import { ENDPOINTS } from '@config/constants/endpoints'
import { baseQueryConfig } from '@redux/baseQueryConfig'
import { injectPaginationParamsToUrl } from '@utils/helpers/queryParamInjector'
import { PaginationResponse } from 'types/interfaces/Pagination'
import { QueryParams } from 'types/interfaces/QueryParams'
import { ApiPaginationResponse } from '../type'
import { MethodsEnum } from '@config/enums/method.enum'
import { UserApi } from './usersApi.type'
import { encodeUser, transformFetchUsersResponse } from './usersApi.transform'
import { createApi } from '@reduxjs/toolkit/query/react'
import { ItemDetailsResponse } from 'types/interfaces/ItemDetailsResponse'
import { transformRegisterResponse } from '../auth/authApi.transform'
import { FieldValues } from 'react-hook-form'

export const userApi = createApi({
  reducerPath: 'userApi',
  baseQuery: baseQueryConfig,
  tagTypes: ['Users'],
  endpoints: (builder) => ({
    getFacilitators: builder.query<PaginationResponse<User>, QueryParams>({
      query: (params) => ({
        url: injectPaginationParamsToUrl(ENDPOINTS.FACILITATORS, params),
        method: MethodsEnum.GET,
      }),
      transformResponse: (response: ApiPaginationResponse<UserApi>) =>
        transformFetchUsersResponse(response),
    }),
    getUsersForAdmin: builder.query<PaginationResponse<User>, QueryParams>({
      query: (params) => ({
        url: injectPaginationParamsToUrl(ENDPOINTS.USERS, params),
        method: MethodsEnum.GET,
      }),
      transformResponse: (response: ApiPaginationResponse<UserApi>) =>
        transformFetchUsersResponse(response),
      providesTags: ['Users'],
    }),
    getPendingUsers: builder.query<PaginationResponse<User>, QueryParams>({
      query: (params) => ({
        url: injectPaginationParamsToUrl(ENDPOINTS.PENDING_USERS, params),
        method: MethodsEnum.GET,
      }),
      transformResponse: (response: ApiPaginationResponse<UserApi>) =>
        transformFetchUsersResponse(response),
    }),
    getAcceptedUsers: builder.query<PaginationResponse<User>, QueryParams>({
      query: (params) => ({
        url: injectPaginationParamsToUrl(ENDPOINTS.ACCEPTED_USERS, params),
        method: MethodsEnum.GET,
      }),
      transformResponse: (response: ApiPaginationResponse<UserApi>) =>
        transformFetchUsersResponse(response),
    }),
    createUser: builder.mutation<ItemDetailsResponse<User>, FieldValues>({
      query: (user) => ({
        url: ENDPOINTS.ADD_USER,
        method: MethodsEnum.POST,
        body: encodeUser(user),
      }),
      transformResponse: (response: ItemDetailsResponse<UserApi>) =>
        transformRegisterResponse(response),
      invalidatesTags: ['Users'],
    }),
    deleteUser: builder.mutation<ItemDetailsResponse<User>, number>({
      query: (id) => ({
        url: `${ENDPOINTS.DELETE_USER}/${id}`,
        method: MethodsEnum.DELETE,
      }),
      transformResponse: (response: ItemDetailsResponse<UserApi>) =>
        transformRegisterResponse(response),
      invalidatesTags: ['Users'],
    }),
    validateUser: builder.mutation<ItemDetailsResponse<User>, number>({
      query: (id) => ({
        url: `${ENDPOINTS.VALIDATE_USER}/${id}`,
        method: MethodsEnum.POST,
      }),
      transformResponse: (response: ItemDetailsResponse<UserApi>) =>
        transformRegisterResponse(response),
      invalidatesTags: ['Users'],
    }),
    rejectUser: builder.mutation<ItemDetailsResponse<User>, number>({
      query: (id) => ({
        url: `${ENDPOINTS.REJECT_USER}/${id}`,
        method: MethodsEnum.POST,
      }),
      transformResponse: (response: ItemDetailsResponse<UserApi>) =>
        transformRegisterResponse(response),
      invalidatesTags: ['Users'],
    }),
    suspendUser: builder.mutation<ItemDetailsResponse<User>, number>({
      query: (id) => ({
        url: `${ENDPOINTS.SUSPEND_USER}/${id}`,
        method: MethodsEnum.POST,
      }),
      transformResponse: (response: ItemDetailsResponse<UserApi>) =>
        transformRegisterResponse(response),
      invalidatesTags: ['Users'],
    }),
  }),
})
export const {
  useGetFacilitatorsQuery,
  useGetUsersForAdminQuery,
  useGetPendingUsersQuery,
  useCreateUserMutation,
  useDeleteUserMutation,
  useValidateUserMutation,
  useRejectUserMutation,
  useGetAcceptedUsersQuery,
  useSuspendUserMutation,
} = userApi
