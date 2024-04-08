import { User } from 'types/models/User'
import { ENDPOINTS } from '@config/constants/endpoints'
import { baseQueryConfig } from '@redux/baseQueryConfig'
import { injectPaginationParamsToUrl } from '@utils/helpers/queryParamInjector'
import { PaginationResponse } from 'types/interfaces/Pagination'
import { QueryParams } from 'types/interfaces/QueryParams'
import { ApiPaginationResponse } from '../type'
import { MethodsEnum } from '@config/enums/method.enum'
import { UserApi } from './usersApi.type'
import { transformFetchUsersResponse } from './usersApi.transform'
import { createApi } from '@reduxjs/toolkit/query/react'

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
    getUsersForAdmin: builder.query<PaginationResponse<User>, QueryParams>({
      query: (params) => ({
        url: injectPaginationParamsToUrl(ENDPOINTS.USERS, params),
        method: MethodsEnum.GET,
      }),
      transformResponse: (response: ApiPaginationResponse<UserApi>) =>
        transformFetchUsersResponse(response),
    }),
    getPendingUsers: builder.query<PaginationResponse<User>, QueryParams>({
      query: (params) => ({
        url: injectPaginationParamsToUrl(ENDPOINTS.PENDING_USERS, params),
        method: MethodsEnum.GET,
      }),
      transformResponse: (response: ApiPaginationResponse<UserApi>) =>
        transformFetchUsersResponse(response),
    }),
  }),
})
export const {
  useGetFacilitatorsQuery,
  useGetUsersForAdminQuery,
  useGetPendingUsersQuery,
} = userApi
