import { Grid } from '@mui/material'
import { useTranslation } from 'react-i18next'

import { useGetCoursesQuery } from '@redux/apis/courses/coursesApi'
import usePagination from 'src/hooks/usePagination'

import CoursesListSkeleton from './CoursesListSkeleton'
import { Course } from 'types/models/Course'
import NoDataFound from '@components/noDataFound/NoDataFound'
import CourseCard from '../../coursesCard/CourseCard'

function CoursesList() {
  const { queryParams } = usePagination()
  const { t } = useTranslation()

  const { data: coursesResponse, isLoading } = useGetCoursesQuery(queryParams)

  const courses = coursesResponse?.data as Course[]

  if (courses?.length === 0)
    return <NoDataFound message={t('home.no_course_found')} />

  if (isLoading) return <CoursesListSkeleton />

  return (
    <Grid
      item
      container
      spacing={2}
      sx={{ alignContent: 'center', justifyContent: 'center' }}>
      {Boolean(courses) &&
        courses.map((course) => (
          <CourseCard
            key={course.id}
            id={course.id}
            image={course.media[0]?.fileName}
            instructorName={`${course.facilitator.firstName} ${course.facilitator.lastName}`}
            instructorAvatar={
              course?.facilitator?.media?.[0]?.fileName as string
            }
            courseTitle={course.title}
            coursePrice={course.price.toString()}
            lessonsCount={course.lessonsCount}
            duration={course.duration}
            isPaid={course.isPaid}
          />
        ))}
    </Grid>
  )
}

export default CoursesList
