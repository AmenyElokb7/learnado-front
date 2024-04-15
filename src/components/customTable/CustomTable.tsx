import { Stack, Table, TableContainer } from '@mui/material'
import { CustomTableProps } from './customTable.type'
import CustomTableHeaders from './customTableHeaders/CustomTableHeaders'
import CustomTableBody from './customTableBody/CustomTableBody'
import { CustomTableRoot } from './CustomTable.style'
import CustomTableSkeleton from './customTableSkeleton/CustomTableSkeleton'
import { GLOBAL_VARIABLES } from '@config/constants/globalVariables'

const CustomTable = ({
  columns,
  children,
  isFetching,
  isLoading,
}: CustomTableProps) => {
  return (
    <CustomTableRoot>
      <Stack spacing={2} padding={2}>
        <TableContainer>
          <Table stickyHeader aria-label="sticky table">
            <CustomTableHeaders columns={columns} />
            <CustomTableBody>
              {isLoading || isFetching ? (
                <CustomTableSkeleton
                  columnCount={columns.length}
                  rowCount={GLOBAL_VARIABLES.PAGINATION.ROWS_PER_PAGE}
                />
              ) : (
                children
              )}
            </CustomTableBody>
          </Table>
        </TableContainer>
      </Stack>
    </CustomTableRoot>
  )
}
export default CustomTable
