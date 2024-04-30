import BodyCard from '@components/cards/bodyCard/BodyCard'
import CustomPagination from '@components/customPagination/CustomPagination'
import { GLOBAL_VARIABLES } from '@config/constants/globalVariables'
import SearchSection from '@features/courses/searchSection/SearchSection'
import AllCoursesList from '@pages/dashboard/designer/courses/allCoursesList/AllCoursesList'
import { useGetInstructorCoursesQuery } from '@redux/apis/courses/coursesApi'
import { RootState } from '@redux/store'
import { useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { useSelector } from 'react-redux'
import useDebounce from 'src/hooks/useDebounce'
import usePagination from 'src/hooks/usePagination'

function InstructorCoursesPage() {
  const { t } = useTranslation()

  const {
    queryParams,
    handlePageChange,
    handleRowsPerPageChange,
    handleSearchChange,
  } = usePagination()
  const searchQuery = useSelector(
    (state: RootState) => state.appSlice.searchQuery,
  )
  const debouncedSearchQuery = useDebounce(
    queryParams.keyword,
    GLOBAL_VARIABLES.DEBOUNCE_TIME.MEDIUM,
  )

  useEffect(() => {
    if (searchQuery !== queryParams.keyword) {
      handleSearchChange(searchQuery)
    }
  }, [searchQuery])
  const { isLoading, data } = useGetInstructorCoursesQuery({
    ...queryParams,
    keyword: debouncedSearchQuery,
  })

  return (
    <BodyCard title={t('course.all_courses')}>
      <SearchSection
        handleSearchChange={handleSearchChange}
        searchValue={queryParams.keyword}
      />
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
