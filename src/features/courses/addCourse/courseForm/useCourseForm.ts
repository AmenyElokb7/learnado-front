import { GLOBAL_VARIABLES } from '@config/constants/globalVariables'
import { useGetCategoriesQuery } from '@redux/apis/categories/categoriesApi'
import { useGetLanguagesQuery } from '@redux/apis/languages/languagesApi'
import {
  useGetActiveUsersQuery,
  useGetFacilitatorsQuery,
} from '@redux/apis/user/usersApi'
import { useEffect } from 'react'
import { UseFormReturn } from 'react-hook-form'
import usePagination from 'src/hooks/usePagination'

interface UseCourseForm {
  formMethods: UseFormReturn
}

export default function useCourseForm({ formMethods }: UseCourseForm) {
  const { watch, setValue } = formMethods
  // Get the watch function from the formMethods
  const isPaid = watch('isPaid')
  const isPublic = watch('isPublic')
  const teachingType = watch('teachingType')

  // Initialize the usePagination hook
  const { queryParams } = usePagination()

  // Get the data from the useQuery hook
  const { data: categoriesData, isLoading: isLoadingCategories } =
    useGetCategoriesQuery({
      ...queryParams,
      pagination: false,
    })
  const { data: facilitatorsData, isLoading: isLoadingFacilitators } =
    useGetFacilitatorsQuery({
      ...queryParams,
      pagination: false,
    })
  const { data: languagesData, isLoading: isLoadingLanguages } =
    useGetLanguagesQuery({
      ...queryParams,
      pagination: false,
    })
  const { data: activeUsersData, isLoading: isLoadingActiveUsers } =
    useGetActiveUsersQuery({
      ...queryParams,
      pagination: false,
    })

  // Map the data to the options
  const categoryOptions = categoriesData?.data.map((cat) => ({
    label: cat.title,
    value: cat.id,
  }))
  const facilitatorOptions = facilitatorsData?.data.map((fac) => ({
    label: fac.firstName + ' ' + fac.lastName,
    value: fac.id,
  }))
  const languageOptions = languagesData?.data.map((lang) => ({
    label: lang.language,
    value: lang.id,
  }))
  const activeUsersOptions = activeUsersData?.data.map((user) => ({
    label: user.firstName + ' ' + user.lastName,
    value: user.id,
  }))

  // Handle change the latitude and longitude
  const handleLatitudeChange = (lat: number) => {
    setValue('latitude', lat)
  }

  const handleLongitudeChange = (lng: number) => {
    setValue('longitude', lng)
  }

  // Set the default latitude and longitude
  useEffect(() => {
    setValue('latitude', GLOBAL_VARIABLES.DEFAULT_LOCALIZATION.LAT)
    setValue('longitude', GLOBAL_VARIABLES.DEFAULT_LOCALIZATION.LNG)
  }, [])

  return {
    isLoadingAdditinalData:
      isLoadingActiveUsers ||
      isLoadingCategories ||
      isLoadingFacilitators ||
      isLoadingLanguages,
    isPaid,
    isPublic,
    teachingType,
    categoryOptions,
    facilitatorOptions,
    languageOptions,
    activeUsersOptions,
    handleLatitudeChange,
    handleLongitudeChange,
  }
}
