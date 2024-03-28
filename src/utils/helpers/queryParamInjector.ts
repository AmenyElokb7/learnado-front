import { camelToSnake } from './string.transform'
import { QueryParams } from 'types/interfaces/QueryParams'

export function QueryParamInjector(
  url: string,
  paginationParams: QueryParams,
): string {
  const queryParams = Object.entries(paginationParams).map(([key, value]) => {
    const snakeKey = camelToSnake(key)
    return `${snakeKey}=${encodeURIComponent(value)}`
  })
  return `${url}?${queryParams.join('&')}`
}
