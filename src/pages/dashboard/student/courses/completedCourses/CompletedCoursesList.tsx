import BodyCard from '@components/cards/bodyCard/BodyCard'
import CustomPagination from '@components/customPagination/CustomPagination'
import { GLOBAL_VARIABLES } from '@config/constants/globalVariables'
import SearchSection from '@features/courses/searchSection/SearchSection'
import AllCoursesList from '@pages/dashboard/designer/courses/allCoursesList/AllCoursesList'
import { useGetCompletedCoursesQuery } from '@redux/apis/courses/coursesApi'
import { RootState } from '@redux/store'
import { useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { useSelector } from 'react-redux'
import useDebounce from 'src/hooks/useDebounce'
import usePagination from 'src/hooks/usePagination'

function CompletedCoursesList() {
  const { t } = useTranslation()

  const {
    queryParams,
    handlePageChange,
    handleRowsPerPageChange,
    handleSearchChange,
  } = usePagination()

  const debouncedSearchQuery = useDebounce(
    queryParams.keyword,
    GLOBAL_VARIABLES.DEBOUNCE_TIME.MEDIUM,
  )

  const { isLoading, data } = useGetCompletedCoursesQuery({
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
    <BodyCard title={t('course.all_courses')}>
      <SearchSection
        handleSearchChange={handleSearchChange}
        searchValue={queryParams.keyword}
      />
      <AllCoursesList isLoading={isLoading} courses={data?.data} />
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

export default CompletedCoursesList
