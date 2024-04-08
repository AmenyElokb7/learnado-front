import { fetchBaseQuery } from '@reduxjs/toolkit/query'
import { ConfigEnv } from '@config/configEnv'
import i18n from 'i18n'

export const baseQueryConfig = fetchBaseQuery({
  baseUrl: `${ConfigEnv.API_ENDPOINT}`,
  prepareHeaders: (headers) => {
    headers.set('Accept-Language', i18n.language)
    return headers
  },
})
