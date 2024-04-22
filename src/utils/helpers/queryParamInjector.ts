import { QueryParams } from 'types/interfaces/QueryParams'
import { toSnakeCase } from './string.helpers'

export const injectPaginationParamsToUrl = (
  baseUrl: string,
  paginationParams: QueryParams,
): string => {
  // Get all the keys from the paginationParams object
  const entries = Object.entries(paginationParams)
  // Iterate over the entries
  const params = entries
    //Filter out the keys with undefined values
    .filter(([, value]) => value !== undefined)
    //Map the key value pairs to a string
    .map(([key, value]) => {
      // Check if the value is an array
      if (Array.isArray(value)) {
        return value
          .map((item) => `${toSnakeCase(item.name)}=${item.id}`)
          .join('&')
      }
      // Check if the value is a boolean
      if (typeof value === 'boolean') {
        return `${toSnakeCase(key)}=${value ? 1 : 0}`
      }
      // Default Return
      return `${toSnakeCase(key)}=${value}`
    })
    //Join the strings with an ampersand
    .join('&')

  return `${baseUrl}?${params}`
}
