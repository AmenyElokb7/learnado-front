import { GLOBAL_VARIABLES } from '@config/constants/globalVariables'
import { useAppSelector } from '@redux/hooks'
import { useState } from 'react'

import { FiltersOption, QueryParams } from 'types/interfaces/QueryParams'

function usePagination() {
  const searchQuery = useAppSelector((state) => state.appSlice.searchQuery)

  const [queryParams, setQueryParams] = useState<QueryParams>({
    page: GLOBAL_VARIABLES.PAGINATION.FIRST_PAGE,
    perPage: GLOBAL_VARIABLES.PAGINATION.ROWS_PER_PAGE,
    keyword: searchQuery ?? GLOBAL_VARIABLES.EMPTY_STRING,
  })

  const handlePageChange = (newPage: number) => {
    setQueryParams({ ...queryParams, page: newPage })
    window.scrollTo(300, 300)
  }

  const handleRowsPerPageChange = (newRowsPerPage: number) => {
    setQueryParams({ ...queryParams, page: 1, perPage: newRowsPerPage })
  }

  const handleSearchChange = (keyword: string) => {
    setQueryParams({ ...queryParams, keyword })
  }

  const handleFiltersChange = (filter: FiltersOption) => {
    // Check if the filter already exists in the queryParams
    if (queryParams.filters?.some((item) => item.id === filter.id)) {
      // Remove the filter from the queryParams
      setQueryParams({
        ...queryParams,
        filters: queryParams.filters?.filter((item) => item.id !== filter.id),
      })
      return
    }
    setQueryParams({
      ...queryParams,
      filters: [...(queryParams.filters ?? []), filter],
    })
  }

  const handleSortChange = (direction: string, orderBy: string) => {
    setQueryParams({ ...queryParams, direction, orderBy })
  }

  return {
    queryParams,
    handlePageChange,
    handleRowsPerPageChange,
    handleSearchChange,
    handleFiltersChange,
    handleSortChange,
  }
}
export default usePagination
