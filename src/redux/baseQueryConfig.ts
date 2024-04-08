import { fetchBaseQuery } from '@reduxjs/toolkit/query'
import { ConfigEnv } from '@config/configEnv'
import i18n from 'i18n'
import { getFromLocalStorage } from '@utils/localStorage/storage'
import { LocalStorageKeysEnum } from '@config/enums/localStorage.enum'

export const baseQueryConfig = fetchBaseQuery({
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
