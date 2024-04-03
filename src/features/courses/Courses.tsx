import { Button, Grid, Stack } from '@mui/material'

import CoursesList from '@features/home/homeCourses/coursesList/coursesListSkeleton/CoursesList'
import { StackWithBackground } from '@components/stackWithBackground/stackWithBackground.style'
import Header from '@components/header/Header'
import SearchSection from './searchSection/SearchSection'
import FilterCategories from './filterSection/filterCategories/FilterCategories'
import FilterPrice from './filterSection/filterPrice/FilterPrice'
import FilterTeachingType from './filterSection/filterTeachingType/FilterTeachingType'
import CustomPagination from '@components/customPagination/CustomPagination'
import usePagination from 'src/hooks/usePagination'
import { useGetCoursesQuery } from '@redux/apis/courses/coursesApi'
import FilterHeader from './filterSection/filterHeader/FilterHeader'
import useDebounce from 'src/hooks/useDebounce'
import { GLOBAL_VARIABLES } from '@config/constants/globalVariables'
import { useSelector } from 'react-redux'
import { useEffect } from 'react'
import { RootState } from '@redux/store'
import { useTranslation } from 'react-i18next'

const Courses = () => {
  const {
    queryParams,
    handlePageChange,
    handleSearchChange,
    handleFiltersChange,
    handleSortChange,
    handleResetFilters,
  } = usePagination()

  const { t } = useTranslation()

  const debouncedSearchQuery = useDebounce(
    queryParams.keyword,
    GLOBAL_VARIABLES.DEBOUNCE_TIME.MEDIUM,
  )
  const { isFetching, data } = useGetCoursesQuery({
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
    <StackWithBackground>
      <Header />
      <FilterHeader
        hasFilter={GLOBAL_VARIABLES.TRUE_STRING}
        total={data?.meta.total as number}
        handleOrderChange={handleSortChange}
      />
      <Stack alignItems="flex-end" justifyContent="flex-end" padding={1}>
        <Button onClick={handleResetFilters}>
          {t('pagination.reset_filters')}
        </Button>
      </Stack>

      <Grid container mt={4}>
        <Grid item lg={9}>
          <CoursesList isLoading={isFetching} courses={data?.data} />
          <Stack direction={'row'} justifyContent={'center'} mt={4}>
            <CustomPagination
              page={queryParams.page}
              count={data?.meta.count}
              isLoading={isFetching}
              handlePageChange={handlePageChange}
            />
          </Stack>
        </Grid>
        <Grid item lg={3}>
          <SearchSection
            handleSearchChange={handleSearchChange}
            searchValue={queryParams.keyword}
          />
          <FilterCategories
            filtersQueryParams={queryParams}
            handleFiltersChange={handleFiltersChange}
          />
          <FilterPrice
            filtersQueryParams={queryParams}
            handleFiltersChange={handleFiltersChange}
          />
          <FilterTeachingType
            filtersQueryParams={queryParams}
            handleFiltersChange={handleFiltersChange}
          />
        </Grid>
      </Grid>
    </StackWithBackground>
  )
}

export default Courses
