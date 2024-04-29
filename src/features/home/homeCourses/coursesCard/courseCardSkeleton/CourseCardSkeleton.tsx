import { Avatar, Skeleton, Stack } from '@mui/material'
import { CourseCardContainer } from '../courseCard.style'

function CoursesCardSkeleton() {
  return (
    <CourseCardContainer sx={{ padding: '16px' }} width={'45vh'}>
      <Skeleton
        sx={{ height: 190, borderRadius: '25px' }}
        animation="wave"
        variant="rectangular"
      />
      <Stack direction="row" spacing={2} padding={2}>
        <Skeleton variant="circular">
          <Avatar sx={{ width: '30px', height: '30px' }} />
        </Skeleton>
        <Skeleton variant="text" width={150} />
      </Stack>
      <Skeleton variant="text" width={150} />
      <Stack direction="row" spacing={20}>
        <Skeleton variant="text" width={100} />
        <Skeleton variant="text" width={100} />
      </Stack>
      <Stack p={2} sx={{ alignItems: 'center' }}>
        <Skeleton
          variant="rectangular"
          height={30}
          width={200}
          sx={{ borderRadius: '16px' }}
        />
      </Stack>
    </CourseCardContainer>
  )
}

export default CoursesCardSkeleton
