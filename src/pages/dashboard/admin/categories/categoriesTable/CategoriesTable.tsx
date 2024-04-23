import CustomPagination from '@components/customPagination/CustomPagination'
import CustomTable from '@components/customTable/CustomTable'
import { GLOBAL_VARIABLES } from '@config/constants/globalVariables'
import { Stack } from '@mui/material'
import { useGetCategoriesQuery } from '@redux/apis/categories/categoriesApi'
import useDebounce from 'src/hooks/useDebounce'
import usePagination from 'src/hooks/usePagination'
import { CategoriesTableHeaders } from './CategorieTable.contant'
import CategoriesRow from './categoriesRow/CategoriesRow'
import { CategoriesTableProps } from './CategoriesTable.type'

function CategoriesTable({ onEdit }: CategoriesTableProps) {
  const {
    queryParams,
    handlePageChange,
    handleRowsPerPageChange,
    handleSearchChange,
  } = usePagination()

  const debouncedSearchQuery = useDebounce(
    queryParams.keyword,
    GLOBAL_VARIABLES.DEBOUNCE_TIME.MEDIUM,
  )

  const { isFetching, data, isLoading } = useGetCategoriesQuery({
    ...queryParams,
    keyword: debouncedSearchQuery,
  })

  return (
    <Stack direction={'column'} spacing={2}>
      <CustomTable
        columns={CategoriesTableHeaders}
        isLoading={isLoading}
        isFetching={isFetching}
        queryParams={queryParams}
        handleSearchChange={handleSearchChange}>
        {data?.data?.map((category) => (
          <CategoriesRow
            key={category.id}
            category={category}
            onEdit={onEdit}
          />
        ))}
      </CustomTable>
      <CustomPagination
        page={queryParams.page}
        count={data?.meta.count || 0}
        rowsPerPage={queryParams.perPage}
        isLoading={isLoading}
        handlePageChange={handlePageChange}
        handleRowsPerPageChange={handleRowsPerPageChange}
      />
    </Stack>
  )
}

export default CategoriesTable
