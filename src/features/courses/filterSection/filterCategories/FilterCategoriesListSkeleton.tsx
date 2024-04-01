import { Skeleton, Stack } from '@mui/material'

function FilterCategoriesListSkeleton() {
  return (
    <Stack direction="row" spacing={2}>
      <Skeleton variant="rectangular" width={20} />
      <Skeleton variant="text" width={150} />
    </Stack>
  )
}

export default FilterCategoriesListSkeleton
