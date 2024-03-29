import { useNavigate } from 'react-router-dom'

import Bloc from '@components/bloc/Bloc'
import { PATHS } from '@config/constants/paths'
import CoursesList from './coursesList/coursesListSkeleton/CoursesList'
import { BlocBackground } from './coursesCard/courseCard.style'

function HomeCourses() {
  const navigate = useNavigate()
  const navigateToCoursesPage = () => navigate(PATHS.COURSES.ROOT)

  return (
    <BlocBackground>
      <Bloc
        title="home.course_section_title"
        description="home.course_section_description"
        onClick={navigateToCoursesPage}>
        <CoursesList />
      </Bloc>
    </BlocBackground>
  )
}

export default HomeCourses
