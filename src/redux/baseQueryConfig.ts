import { Mutex } from 'async-mutex'
import i18n from 'i18n'
import {
  fetchBaseQuery,
  FetchArgs,
  FetchBaseQueryError,
  BaseQueryApi,
  BaseQueryFn,
} from '@reduxjs/toolkit/query/react'
import {
  clearLocalStorage,
  getFromLocalStorage,
  setToLocalStorage,
} from '@utils/localStorage/storage'
import { LocalStorageKeysEnum } from '@config/enums/localStorage.enum'
import { ConfigEnv } from '@config/configEnv'
import { ENDPOINTS } from '@config/constants/endpoints'
import { MethodsEnum } from '@config/enums/method.enum'

export const baseQueryConfig = (
  args: string | FetchArgs,
  api: BaseQueryApi,
  extraOptions: {},
) =>
  fetchBaseQuery({
    baseUrl: `${ConfigEnv.API_ENDPOINT}`,
    prepareHeaders: (headers) => {
      const token = getFromLocalStorage(LocalStorageKeysEnum.AccessToken)
      if (token) {
        headers.set('Authorization', `Bearer ${token}`)
      }
      headers.set('Accept', 'application/json')
      headers.set('Accept-Language', i18n.language)
      return headers
    },
  })(args, api, extraOptions)

const mutex = new Mutex()
const refreshTokenBaseQuery = fetchBaseQuery({
  baseUrl: `${ConfigEnv.API_ENDPOINT}`,
  prepareHeaders: (headers) => {
    headers.set('Accept', 'application/json')
    headers.set('Accept-Language', i18n.language)
    headers.set(
      'Authorization',
      `Bearer ${getFromLocalStorage(LocalStorageKeysEnum.RefreshToken)}`,
    )
    return headers
  },
})

export const baseQueryConfigWithRefresh: BaseQueryFn<
  string | FetchArgs,
  unknown,
  FetchBaseQueryError
> = async (args, api, extraOptions) => {
  let result = await baseQueryConfig(args, api, extraOptions)

  if (result.error && result.error.status === 401) {
    if (!mutex.isLocked()) {
      const release = await mutex.acquire()
      try {
        const refreshResult = await refreshTokenBaseQuery(
          {
            url: ENDPOINTS.REFRESH_TOKEN,
            method: MethodsEnum.POST,
            body: JSON.stringify({
              refresh_token: getFromLocalStorage(
                LocalStorageKeysEnum.RefreshToken,
              ),
            }),
          },
          api,
          extraOptions,
        )

        if (refreshResult.data) {
          setToLocalStorage(
            LocalStorageKeysEnum.AccessToken,
            (refreshResult.data as { data: { access_token: string } }).data
              .access_token,
          )
          result = await baseQueryConfig(args, api, extraOptions)
        } else {
          clearLocalStorage()
        }
      } finally {
        release()
      }
    } else {
      await mutex.waitForUnlock()
      result = await baseQueryConfig(args, api, extraOptions)
    }
  }
  return result
}
