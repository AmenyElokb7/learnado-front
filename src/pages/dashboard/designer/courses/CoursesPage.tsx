import BodyCard from '@components/cards/bodyCard/BodyCard'
import { PATHS } from '@config/constants/paths'
import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router-dom'
import AllCoursesList from './allCoursesList/AllCoursesList'
import { useGetDesignerCoursesQuery } from '@redux/apis/courses/coursesApi'
import usePagination from 'src/hooks/usePagination'
import CustomPagination from '@components/customPagination/CustomPagination'
import useDebounce from 'src/hooks/useDebounce'
import { GLOBAL_VARIABLES } from '@config/constants/globalVariables'
import { useSelector } from 'react-redux'
import { RootState } from '@redux/store'
import { useEffect } from 'react'
import SearchSection from '@features/courses/searchSection/SearchSection'

function CoursesPage() {
  const {
    queryParams,
    handlePageChange,
    handleRowsPerPageChange,
    handleSearchChange,
  } = usePagination()

  const { t } = useTranslation()
  const navigate = useNavigate()

  const debouncedSearchQuery = useDebounce(
    queryParams.keyword,
    GLOBAL_VARIABLES.DEBOUNCE_TIME.MEDIUM,
  )
  const { isLoading, data } = useGetDesignerCoursesQuery({
    ...queryParams,
    keyword: debouncedSearchQuery,
  })

  const searchQuery = useSelector(
    (state: RootState) => state.appSlice.searchQuery,
  )

  useEffect(() => {
    if (searchQuery !== queryParams.keyword) {
      handleSearchChange(searchQuery)
    }
  }, [searchQuery])

  return (
    <BodyCard
      title={t('course.all_courses')}
      buttonText={t('course.add_course')}
      onClick={() => navigate(PATHS.DASHBOARD.DESIGNER.MY_COURSES.ADD_COURSE)}>
      <SearchSection
        handleSearchChange={handleSearchChange}
        searchValue={queryParams.keyword}
      />
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
