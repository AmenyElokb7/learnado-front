import { Grid, Stack } from '@mui/material'

import CoursesList from '@features/home/homeCourses/coursesList/coursesListSkeleton/CoursesList'
import { StackWithBackground } from '@components/stackWithBackground/stackWithBackground.style'
import Header from '@components/header/Header'
import SearchSection from './searchSection/SearchSection'
import FilterCategories from './filterSection/filterCategories/FilterCategories'
import FilterPrice from './filterSection/filterPrice/FilterPrice'
import FilterTeachingType from './filterSection/filterTeachingType/FilterTeachingType'
import CustomPagination from '@components/customPagination/CustomTablePagination'
import usePagination from 'src/hooks/usePagination'
import { useGetCoursesQuery } from '@redux/apis/courses/coursesApi'
import FilterHeader from './filterSection/filterHeader/FilterHeader'

const Courses = () => {
  const { queryParams, handlePageChange } = usePagination()
  const { isFetching, data } = useGetCoursesQuery(
    { ...queryParams },
    { refetchOnMountOrArgChange: true },
  )

  return (
    <StackWithBackground>
      <Header />
      <FilterHeader />

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
          <SearchSection />
          <FilterCategories />
          <FilterPrice />
          <FilterTeachingType />
        </Grid>
      </Grid>
    </StackWithBackground>
  )
}

export default Courses
