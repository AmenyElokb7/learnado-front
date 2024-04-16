import CustomPagination from '@components/customPagination/CustomPagination'
import Header from '@components/header/Header'
import { StackWithBackground } from '@components/stackWithBackground/stackWithBackground.style'
import { GLOBAL_VARIABLES } from '@config/constants/globalVariables'
import FilterHeader from '@features/courses/filterSection/filterHeader/FilterHeader'
import SearchSection from '@features/courses/searchSection/SearchSection'
import InstructorsList from '@features/instructors/instructorCardSkeleton/instructorsList/InstructorsList'
import { Stack } from '@mui/material'
import { useGetFacilitatorsQuery } from '@redux/apis/user/usersApi'
import { useAppSelector } from '@redux/hooks'
import { useEffect } from 'react'
import useDebounce from 'src/hooks/useDebounce'
import usePagination from 'src/hooks/usePagination'

const InstructorsPage = () => {
  const { queryParams, handlePageChange, handleSearchChange } = usePagination()

  const debouncedSearchQuery = useDebounce(
    queryParams.keyword,
    GLOBAL_VARIABLES.DEBOUNCE_TIME.MEDIUM,
  )
  const { data, isFetching } = useGetFacilitatorsQuery({
    ...queryParams,
    keyword: debouncedSearchQuery,
  })

  const searchQuery = useAppSelector((state) => state.appSlice.searchQuery)

  useEffect(() => {
    if (searchQuery !== queryParams.keyword) {
      handleSearchChange(searchQuery)
    }
  }, [searchQuery])

  return (
    <StackWithBackground>
      <Header />
      <FilterHeader total={Number(data?.meta.total)} />
      <Stack alignItems={'flex-end'} mr={15}>
        <SearchSection
          handleSearchChange={handleSearchChange}
          searchValue={queryParams.keyword}
        />
      </Stack>
      <Stack alignItems={'center'}>
        <InstructorsList instructors={data?.data} isLoading={isFetching} />
        <CustomPagination
          page={queryParams.page}
          count={data?.meta.count}
          isLoading={isFetching}
          handlePageChange={handlePageChange}
        />
      </Stack>
    </StackWithBackground>
  )
}

export default InstructorsPage
