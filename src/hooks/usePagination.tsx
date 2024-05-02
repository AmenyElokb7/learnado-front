import { useState } from 'react'
import { useAppSelector } from '@redux/hooks'
import { GLOBAL_VARIABLES } from '@config/constants/globalVariables'
import { FiltersOption, QueryParams } from 'types/interfaces/QueryParams'

function usePagination() {
  const searchQuery = useAppSelector((state) => state.appSlice.searchQuery)

  const INITIAL_QUERY_PARAMS: QueryParams = {
    page: GLOBAL_VARIABLES.PAGINATION.FIRST_PAGE,
    perPage: GLOBAL_VARIABLES.PAGINATION.ROWS_PER_PAGE,
    keyword: searchQuery ?? GLOBAL_VARIABLES.EMPTY_STRING,
    pagination: true,
  }
  const [queryParams, setQueryParams] =
    useState<QueryParams>(INITIAL_QUERY_PARAMS)
  const handlePageChange = (newPage: number) => {
    setQueryParams({ ...queryParams, page: newPage })
    window.scrollTo(300, 300)
  }

  const handleRowsPerPageChange = (newRowsPerPage: number) => {
    setQueryParams({
      ...queryParams,
      page: GLOBAL_VARIABLES.PAGINATION.FIRST_PAGE,
      perPage: newRowsPerPage,
    })
  }

  const handleSearchChange = (keyword: string) => {
    setQueryParams({ ...queryParams, keyword })
  }

  const handleFiltersChange = (filter: FiltersOption) => {
    // Don't concatine the filter if it's exist based on the name
    // instead replace it with the new one
    if (queryParams.filters?.some((item) => item.name === filter.name)) {
      setQueryParams({
        ...queryParams,
        page: GLOBAL_VARIABLES.PAGINATION.FIRST_PAGE,
        keyword: queryParams.keyword ?? GLOBAL_VARIABLES.EMPTY_STRING,
        filters: queryParams.filters?.map((item) =>
          item.name === filter.name ? filter : item,
        ),
      })
      return
    }
    // Add the filter to the queryParams
    setQueryParams({
      ...queryParams,
      page: GLOBAL_VARIABLES.PAGINATION.FIRST_PAGE,
      filters: [...(queryParams.filters ?? []), filter],
    })
  }

  const handleSortChange = (direction: string, orderBy: string) => {
    setQueryParams({
      ...queryParams,
      page: GLOBAL_VARIABLES.PAGINATION.FIRST_PAGE,
      direction,
      orderBy,
    })
  }

  const handleResetFilters = () => {
    setQueryParams({
      ...INITIAL_QUERY_PARAMS,
      keyword: GLOBAL_VARIABLES.EMPTY_STRING,
    })
  }

  return {
    queryParams,
    handlePageChange,
    handleRowsPerPageChange,
    handleSearchChange,
    handleFiltersChange,
    handleSortChange,
    handleResetFilters,
  }
}
export default usePagination
