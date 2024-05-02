import { useNavigate } from 'react-router-dom'

import Bloc from '@components/bloc/Bloc'
import { PATHS } from '@config/constants/paths'
import CoursesList from './coursesList/coursesListSkeleton/CoursesList'
import { BlocBackground } from './coursesCard/courseCard.style'
import usePagination from 'src/hooks/usePagination'
import {
  useGetCoursesForGuestQuery,
  useGetCoursesQuery,
} from '@redux/apis/courses/coursesApi'
import { GLOBAL_VARIABLES } from '@config/constants/globalVariables'
import { getUserFromLocalStorage } from '@utils/localStorage/storage'

function HomeCourses() {
  const navigate = useNavigate()
  const navigateToCoursesPage = () => navigate(PATHS.COURSES.ROOT)

  const { queryParams } = usePagination()

  const user = !!getUserFromLocalStorage()

  const { data, isLoading } = user
    ? useGetCoursesQuery({
        ...queryParams,
        perPage: GLOBAL_VARIABLES.PAGINATION.CHUNK_ROWS_PER_PAGE,
      })
    : useGetCoursesForGuestQuery({
        ...queryParams,
        perPage: GLOBAL_VARIABLES.PAGINATION.CHUNK_ROWS_PER_PAGE,
      })

  return (
    <BlocBackground>
      <Bloc
        hasButton={true}
        title="home.course_section_title"
        description="home.course_section_description"
        onClick={navigateToCoursesPage}>
        <CoursesList isLoading={isLoading} courses={data?.data} />
      </Bloc>
    </BlocBackground>
  )
}

export default HomeCourses
