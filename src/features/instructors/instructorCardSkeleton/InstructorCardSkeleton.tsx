import { Skeleton, Stack } from '@mui/material'
import { StyledRectangularCard } from '../InstructorCard/instructorCard.style'

function InstructorCardSkeleton() {
  return (
    <StyledRectangularCard direction="row" alignItems={'center'} spacing={2}>
      <Skeleton height={200} width={200} sx={{ borderRadius: '16px' }} />
      <Stack direction="column" spacing={2}>
        <Skeleton variant="text" sx={{ fontSize: '1rem' }} width={150} />
        <Skeleton variant="text" sx={{ fontSize: '1rem' }} width={150} />
        <Skeleton variant="text" sx={{ fontSize: '1rem' }} width={250} />
      </Stack>
    </StyledRectangularCard>
  )
}

export default InstructorCardSkeleton
