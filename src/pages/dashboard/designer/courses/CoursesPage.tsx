import BodyCard from '@components/cards/bodyCard/BodyCard'
import { PATHS } from '@config/constants/paths'
import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router-dom'
import AllCoursesList from './allCoursesList/AllCoursesList'
import { useGetDesignerCoursesQuery } from '@redux/apis/courses/coursesApi'
import usePagination from 'src/hooks/usePagination'
import CustomPagination from '@components/customPagination/CustomPagination'

function CoursesPage() {
  const { queryParams, handlePageChange, handleRowsPerPageChange } =
    usePagination()
  const { t } = useTranslation()
  const navigate = useNavigate()

  const { isLoading, data } = useGetDesignerCoursesQuery(queryParams)

  return (
    <BodyCard
      title={t('course.all_courses')}
      buttonText={t('course.add_course')}
      onClick={() => navigate(PATHS.DASHBOARD.DESIGNER.MY_COURSES.ADD_COURSE)}>
      <AllCoursesList isLoading={isLoading} courses={data?.data} isDesigner />
      <CustomPagination
        page={queryParams.page}
        count={data?.meta.count || 0}
        rowsPerPage={queryParams.perPage}
        isLoading={isLoading}
        handlePageChange={handlePageChange}
        handleRowsPerPageChange={handleRowsPerPageChange}
      />
    </BodyCard>
  )
}

export default CoursesPage
