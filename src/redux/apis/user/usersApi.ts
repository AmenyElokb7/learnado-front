import { User } from 'types/models/User'
import { ENDPOINTS } from '@config/constants/endpoints'
import { baseQueryConfigWithRefresh } from '@redux/baseQueryConfig'
import { injectPaginationParamsToUrl } from '@utils/helpers/queryParamInjector'
import { PaginationResponse } from 'types/interfaces/Pagination'
import { QueryParams } from 'types/interfaces/QueryParams'
import { ApiPaginationResponse } from '../type'
import { MethodsEnum } from '@config/enums/method.enum'
import { SingleUserResponseData, UserApi } from './usersApi.type'
import {
  encodeUser,
  transformFetchUsersResponse,
  transformUserResponse,
} from './usersApi.transform'
import { createApi } from '@reduxjs/toolkit/query/react'
import { ItemDetailsResponse } from 'types/interfaces/ItemDetailsResponse'
import { transformRegisterResponse } from '../auth/authApi.transform'
import { FieldValues } from 'react-hook-form'

export const userApi = createApi({
  reducerPath: 'userApi',
  baseQuery: baseQueryConfigWithRefresh,
  tagTypes: ['Users', 'User', 'Profile'],
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
    getUserById: builder.query<ItemDetailsResponse<User>, string>({
      query: (id) => ({
        url: ENDPOINTS.USERS + `/${id}`,
        method: MethodsEnum.GET,
      }),
      transformResponse: (response: SingleUserResponseData) =>
        transformUserResponse(response),
      providesTags: ['User'],
    }),

    getPendingUsers: builder.query<PaginationResponse<User>, QueryParams>({
      query: (params) => ({
        url: injectPaginationParamsToUrl(ENDPOINTS.PENDING_USERS, params),
        method: MethodsEnum.GET,
      }),
      transformResponse: (response: ApiPaginationResponse<UserApi>) =>
        transformFetchUsersResponse(response),
      providesTags: ['Users'],
    }),

    getAcceptedUsers: builder.query<PaginationResponse<User>, QueryParams>({
      query: (params) => ({
        url: injectPaginationParamsToUrl(ENDPOINTS.ACCEPTED_USERS, params),
        method: MethodsEnum.GET,
      }),
      transformResponse: (response: ApiPaginationResponse<UserApi>) =>
        transformFetchUsersResponse(response),
      providesTags: ['Users'],
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

    editUser: builder.mutation<void, { id: number; user: FieldValues }>({
      query: ({ id, user }) => ({
        url: `${ENDPOINTS.EDIT_USER}/${id}`,
        method: MethodsEnum.POST,
        body: encodeUser(user),
      }),

      invalidatesTags: ['Users', 'User'],
    }),

    deleteUser: builder.mutation<ItemDetailsResponse<User>, number>({
      query: (id) => ({
        url: `${ENDPOINTS.DELETE_USER}/${id}`,
        method: MethodsEnum.DELETE,
      }),
      invalidatesTags: ['Users'],
    }),

    validateUser: builder.mutation<ItemDetailsResponse<User>, number>({
      query: (id) => ({
        url: `${ENDPOINTS.VALIDATE_USER}/${id}`,
        method: MethodsEnum.POST,
      }),
      invalidatesTags: ['Users'],
    }),

    rejectUser: builder.mutation<ItemDetailsResponse<User>, number>({
      query: (id) => ({
        url: `${ENDPOINTS.REJECT_USER}/${id}`,
        method: MethodsEnum.POST,
      }),
      invalidatesTags: ['Users'],
    }),

    suspendUser: builder.mutation<ItemDetailsResponse<User>, number>({
      query: (id) => ({
        url: `${ENDPOINTS.SUSPEND_USER}/${id}`,
        method: MethodsEnum.POST,
      }),
      invalidatesTags: ['Users'],
    }),
    getActiveUsers: builder.query<PaginationResponse<User>, QueryParams>({
      query: (params) => ({
        url: injectPaginationParamsToUrl(ENDPOINTS.ACTIVE_USERS, params),
        method: MethodsEnum.GET,
      }),
      transformResponse: (response: ApiPaginationResponse<UserApi>) =>
        transformFetchUsersResponse(response),
      providesTags: ['Users'],
    }),
    getUserProfile: builder.query<ItemDetailsResponse<User>, void>({
      query: () => ({
        url: ENDPOINTS.USER_PROFILE,
        method: MethodsEnum.GET,
      }),
      transformResponse: (response: SingleUserResponseData) =>
        transformUserResponse(response),
      providesTags: ['Profile'],
    }),
    updateProfile: builder.mutation<void, FieldValues>({
      query: (data) => ({
        url: ENDPOINTS.UPDATE_PROFILE,
        method: MethodsEnum.POST,
        body: encodeUser(data),
      }),
      invalidatesTags: ['Profile'],
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
  useEditUserMutation,
  useGetUserByIdQuery,
  useGetActiveUsersQuery,
  useGetUserProfileQuery,
  useUpdateProfileMutation,
} = userApi
