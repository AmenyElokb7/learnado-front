import { GLOBAL_VARIABLES } from '@config/constants/globalVariables'

export function QueryParamInjector(
  url: string,
  page: number,
  rowsPerPage: number,
  search: string,
  filter: string,
) {
  return `${url}?page=${page}&rowsPerPage=${rowsPerPage}${search}${filter}`
}

export function searchQueryInjector(search: string, param2: string) {
  return search ? `${param2}=${search}` : GLOBAL_VARIABLES.EMPTY_STRING
}
