import { Grid, Stack, Typography } from '@mui/material'

import CoursesList from '@features/home/homeCourses/coursesList/coursesListSkeleton/CoursesList'
import { StackWithBackground } from '@components/stackWithBackground/stackWithBackground.style'
import Header from '@components/header/Header'
import SearchSection from '../../features/courses/searchSection/SearchSection'
import FilterCategories from '../../features/courses/filterSection/filterCategories/FilterCategories'
import FilterPrice from '../../features/courses/filterSection/filterPrice/FilterPrice'
import FilterTeachingType from '../../features/courses/filterSection/filterTeachingType/FilterTeachingType'
import CustomPagination from '@components/customPagination/CustomPagination'
import usePagination from 'src/hooks/usePagination'
import {
  useGetCoursesForGuestQuery,
  useGetCoursesQuery,
} from '@redux/apis/courses/coursesApi'
import FilterHeader from '../../features/courses/filterSection/filterHeader/FilterHeader'
import useDebounce from 'src/hooks/useDebounce'
import { GLOBAL_VARIABLES } from '@config/constants/globalVariables'
import { useSelector } from 'react-redux'
import { useEffect } from 'react'
import { RootState } from '@redux/store'
import { useTranslation } from 'react-i18next'
import { getUserFromLocalStorage } from '@utils/localStorage/storage'

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
  const user = !!getUserFromLocalStorage()

  const { data, isFetching } = user
    ? useGetCoursesQuery({
        ...queryParams,
        keyword: debouncedSearchQuery,
      })
    : useGetCoursesForGuestQuery({
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
        hasFilter
        total={data?.meta.total as number}
        handleOrderChange={handleSortChange}
      />
      <Stack alignItems={'flex-end'} mr={2}>
        <Typography
          color="primary"
          fontWeight="medium"
          onClick={handleResetFilters}
          sx={{ cursor: 'pointer' }}>
          {t('pagination.reset_filters')}
        </Typography>
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
          <Stack p={2}>
            <SearchSection
              handleSearchChange={handleSearchChange}
              searchValue={queryParams.keyword}
            />
          </Stack>

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
