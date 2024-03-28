import { GLOBAL_VARIABLES } from '@config/constants/globalVariables'
import { useState } from 'react'

import { QueryParams } from 'types/interfaces/QueryParams'

function usePagination() {
  const [queryParams, setQueryParams] = useState<QueryParams>({
    page: GLOBAL_VARIABLES.PAGINATION.FIRST_PAGE,
    perPage: GLOBAL_VARIABLES.PAGINATION.ROWS_PER_PAGE,
    keyword: GLOBAL_VARIABLES.EMPTY_STRING,
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
  return {
    queryParams,
    handlePageChange,
    handleRowsPerPageChange,
    handleSearchChange,
  }
}
export default usePagination
