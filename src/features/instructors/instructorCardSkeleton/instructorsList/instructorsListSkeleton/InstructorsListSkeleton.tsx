import { Stack } from '@mui/material'
import InstructorCardSkeleton from '../../InstructorCardSkeleton'

function InstructorsListSkeleton() {
  return (
    <Stack direction="column" spacing={2}>
      {[...Array(4)].map((_, index) => (
        <InstructorCardSkeleton key={index} />
      ))}
    </Stack>
  )
}

export default InstructorsListSkeleton
