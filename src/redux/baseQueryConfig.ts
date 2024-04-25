import {
  BaseQueryApi,
  BaseQueryFn,
  FetchArgs,
  FetchBaseQueryError,
  fetchBaseQuery,
} from '@reduxjs/toolkit/query'
import { ConfigEnv } from '@config/configEnv'
import i18n from 'i18n'
import {
  getFromLocalStorage,
  removeFromLocalStorage,
  setToLocalStorage,
} from '@utils/localStorage/storage'
import { LocalStorageKeysEnum } from '@config/enums/localStorage.enum'

import { logout } from './slices/authSlice'
import { MethodsEnum } from '@config/enums/method.enum'

interface RefreshResponse {
  accessToken: string
  refreshToken?: string
}

const baseQuery = fetchBaseQuery({
  baseUrl: `${ConfigEnv.API_ENDPOINT}`,
  prepareHeaders: (headers) => {
    headers.set('Accept-Language', i18n.language)
    headers.set('Accept', 'application/json')
    const token = getFromLocalStorage(LocalStorageKeysEnum.AccessToken)
    if (token) {
      headers.set('Authorization', `Bearer ${token}`)
    }
    return headers
  },
})

async function tryToRefreshToken(
  api: BaseQueryApi,
): Promise<RefreshResponse | undefined> {
  const refreshToken = getFromLocalStorage(LocalStorageKeysEnum.RefreshToken)
  if (!refreshToken) return undefined

  const refreshResult = (await baseQuery(
    {
      url: '/refresh-token',
      method: MethodsEnum.POST,
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${refreshToken}`,
      },
      body:{ refreshToken },
    },
    api,
    {},
  )) as {
    data: RefreshResponse | undefined
    error: FetchBaseQueryError | undefined
  }

  if (refreshResult.data) {
    return refreshResult.data as RefreshResponse
  } else {
    api.dispatch(logout())
    return undefined
  }
}

const baseQueryWithReauth: BaseQueryFn<
  string | FetchArgs,
  unknown,
  FetchBaseQueryError,
  {}
> = async (args, api, extraOptions) => {
  let result = await baseQuery(args, api, extraOptions)
  if (result.error && result.error.status === 401) {
    const refreshResult = await tryToRefreshToken(api)
    if (refreshResult) {
      setToLocalStorage(
        LocalStorageKeysEnum.AccessToken,
        refreshResult.accessToken,
      )
      if (refreshResult.refreshToken) {
        setToLocalStorage(
          LocalStorageKeysEnum.RefreshToken,
          refreshResult.refreshToken,
        )
      }

      // Retry the original query with the new token
      return baseQuery(args, api, extraOptions)
    } else {
      // Logout logic or handle token refresh failure
      removeFromLocalStorage(LocalStorageKeysEnum.AccessToken)
      removeFromLocalStorage(LocalStorageKeysEnum.RefreshToken)
      // Optionally dispatch logout action or redirect to login
    }
  }
  return result
}
export const baseQueryConfig = baseQueryWithReauth
