import { GLOBAL_VARIABLES } from '@config/constants/globalVariables'
import { useAppSelector } from '@redux/hooks'
import { useState } from 'react'

import { QueryParams } from 'types/interfaces/QueryParams'

function usePagination() {
  const searchQuery = useAppSelector((state) => state.appSlice.searchQuery)

  const [queryParams, setQueryParams] = useState<QueryParams>({
    page: GLOBAL_VARIABLES.PAGINATION.FIRST_PAGE,
    perPage: GLOBAL_VARIABLES.PAGINATION.ROWS_PER_PAGE,
    keyword: searchQuery ?? GLOBAL_VARIABLES.EMPTY_STRING,
  })

  const handlePageChange = (newPage: number) => {
    setQueryParams({ ...queryParams, page: newPage })
  }

  const handleRowsPerPageChange = (newRowsPerPage: number) => {
    setQueryParams({ ...queryParams, page: 1, perPage: newRowsPerPage })
  }

  const handleSearchChange = (keyword: string) => {
    setQueryParams({ ...queryParams, keyword })
  }

  const handleFilterChange = (filterName: string, value: string) => {
    setQueryParams({ ...queryParams, [filterName]: value })
  }

  return {
    queryParams,
    handlePageChange,
    handleRowsPerPageChange,
    handleSearchChange,
    handleFilterChange,
  }
}
export default usePagination
