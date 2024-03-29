import { Stack } from '@mui/material'
import CoursesCardSkeleton from '../../coursesCard/courseCardSkeleton/CourseCardSkeleton'

function CoursesListSkeleton() {
  return (
    <Stack direction="row" spacing={4}>
      {[...Array(3)].map((_, index) => (
        <CoursesCardSkeleton key={index} />
      ))}
    </Stack>
  )
}

export default CoursesListSkeleton
