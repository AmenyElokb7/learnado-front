import { fetchBaseQuery } from '@reduxjs/toolkit/query'
import { ConfigEnv } from '@config/configEnv'

export const baseQueryConfig = fetchBaseQuery({
  baseUrl: `${ConfigEnv.API_ENDPOINT}`,
})
