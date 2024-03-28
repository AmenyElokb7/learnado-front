import { Skeleton } from '@mui/material'
import { StyledCard } from '../CategoryCard.style'
import { GLOBAL_VARIABLES } from '@config/constants/globalVariables'

function CategoryCardSkeleton() {
  return (
    <StyledCard isloading={GLOBAL_VARIABLES.TRUE_STRING}>
      <Skeleton height={150} width={120} sx={{ borderRadius: '50%' }} />
      <Skeleton variant="text" sx={{ fontSize: '1rem' }} width={150} />
      <Skeleton variant="text" sx={{ fontSize: '1rem' }} width={150} />
    </StyledCard>
  )
}

export default CategoryCardSkeleton
