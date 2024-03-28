import { Stack } from '@mui/material'
import CategoryCardSkeleton from '../../categoryCard/categoryCardSkeleton/CategoryCardSkeleton'

function CategoriesListSkeleton() {
  return (
    <Stack direction="row" spacing={2}>
      {[...Array(4)].map((_, index) => (
        <CategoryCardSkeleton key={index} />
      ))}
    </Stack>
  )
}

export default CategoriesListSkeleton
