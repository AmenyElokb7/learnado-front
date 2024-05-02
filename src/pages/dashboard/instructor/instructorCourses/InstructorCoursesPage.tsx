import BodyCard from '@components/cards/bodyCard/BodyCard'
import CustomPagination from '@components/customPagination/CustomPagination'
import AllCoursesList from '@pages/dashboard/designer/courses/allCoursesList/AllCoursesList'
import { useGetInstructorCoursesQuery } from '@redux/apis/courses/coursesApi'
import { useTranslation } from 'react-i18next'
import usePagination from 'src/hooks/usePagination'

function InstructorCoursesPage() {
  const { t } = useTranslation()

  const { queryParams, handlePageChange, handleRowsPerPageChange } =
    usePagination()

  const { isLoading, data } = useGetInstructorCoursesQuery(queryParams)

  return (
    <BodyCard title={t('course.all_courses')}>
      <AllCoursesList isLoading={isLoading} courses={data?.data} isInstructor />
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

export default InstructorCoursesPage
