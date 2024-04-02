import { QueryParams } from 'types/interfaces/QueryParams'
import { toSnakeCase } from './string.helpers'

export const injectPaginationParamsToUrl = (
  baseUrl: string,
  paginationParams: QueryParams,
): string => {
  // Get all the keys from the paginationParams object
  const entries = Object.entries(paginationParams)
  console.log('🚀 ~ entries:', entries)
  // Iterate over the entries
  const params = entries
    //Filter out the keys with undefined values
    .filter(([, value]) => value !== undefined)
    //Map the key value pairs to a string
    .map(([key, value]) => {
      if (Array.isArray(value)) {
        return value.map((item) => `${toSnakeCase(item.name)}=${item.id}`).join('&')
      }
      return `${toSnakeCase(key)}=${value}`
    })
    //Join the strings with an ampersand
    .join('&')

  return `${baseUrl}?${params}`
}
